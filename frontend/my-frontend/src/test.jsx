const express = require('express');

const mysql = require('mysql2');

const cors = require('cors');

const uid1 = 4;




const app = express();




app.use(cors());

app.use(express.json());




// Replace the database connection configuration with your actual database credentials

const dbConnection = mysql.createConnection({

    host: "127.0.0.1",
    user: "root",
    password: "root@ibsfintech",
    database: "masterdata",

});




// Test the database connection

dbConnection.connect((err) => {

  if (err) {

    console.error('Error connecting to the database:', err);

    return;

  }

  console.log('Connected to the database');

});




// Route to fetch data from the table

app.get('/api/mutualfunds', (req, res) => {

  const uid = uid1//req.params.uid;

  const query = 'SELECT * FROM mutualfunds WHERE UID = ? ORDER BY AMC';




  dbConnection.query(query, [uid], (err, results) => {

    if (err) {

      console.error('Error fetching data from the table:', err);

      res.status(500).json({ error: 'Failed to fetch data from the table' });

      return;

    }

    res.json(results);

  });

});




// Route to fetch data from the table for a specific UID

app.get('/api/stocks', (req, res) => {

  const uid = uid1//req.params.uid;

  const query = 'SELECT * FROM stocks WHERE UID = ? ORDER BY stock_name';




  dbConnection.query(query, [uid], (err, results) => {

    if (err) {

      console.error('Error fetching data from the table:', err);

      res.status(500).json({ error: 'Failed to fetch data from the table' });

      return;

    }

    res.json(results);

  });

});




const port = 5000; // Replace 5000 with the desired port number

app.listen(port, () => {

  console.log(`Server is running on port ${port}`);

});


