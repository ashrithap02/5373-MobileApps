from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base


URL_DATABASE = 'mysql+pymysql://mobile_application:AVNS_G8sjjVr2yfJlIPKE1DX@db-mysql-nyc3-23921-do-user-15738386-0.c.db.ondigitalocean.com:25060/mobile_application'

engine = create_engine(URL_DATABASE)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base =  declarative_base()



