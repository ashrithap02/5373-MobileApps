from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import uvicorn
from MysqlDb import engine, SessionLocal
from pydantic import BaseModel
import hashlib
from models import User, Base  # Ensure that Base is imported from your SQLAlchemy models module

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserBase(BaseModel):
    username: str
    first_name: str
    last_name: str
    gender: str
    email: str
    password: str

class UserResponseModel(BaseModel):
    username: str
    first_name: str
    last_name: str
    gender: str
    email: str

class UserLogin(BaseModel):
    username: str
    password: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.on_event("startup")
def startup_event():
    # This function will create all tables on application startup.
    Base.metadata.create_all(bind=engine)

@app.post("/register/", response_model=UserResponseModel, status_code=status.HTTP_201_CREATED)
async def create_user(user: UserBase, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    hashed_password = hashlib.sha256(user.password.encode('utf-8')).hexdigest()
    new_user = User(
        username=user.username,
        first_name=user.first_name,
        last_name=user.last_name,
        gender=user.gender,
        email=user.email,
        password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/login/")
async def login(user_creds: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == user_creds.username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if hashlib.sha256(user_creds.password.encode('utf-8')).hexdigest() != user.password:
        raise HTTPException(status_code=401, detail="Incorrect password")
    return {"message": "Welcome back!"}

if __name__ == "__main__":
    uvicorn.run(
        "api:app",
        host="0.0.0.0",  # This should be "0.0.0.0" if you want to be accessible from any IP
        port=8080,
        log_level="debug",
        reload=True
    )
