const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // replace with your database username, often root
    password: '', // replace with your database password
    database: 'User_details'
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        return console.error('error connecting: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
});

// Example API to create a table
app.get('/create-table', (req, res) => {
    let sql = `
    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
    );`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Users table created.');
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
