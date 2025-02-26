const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: "payslip.lk",
  user: "SITHARA",
  password: "Thara@#2024",
  database: "FENTONS_ADDRESSBOOK",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// API to fetch data from table
app.get('/api/data', (req, res) => {
  const sqlQuery = 'SELECT * FROM Contact_Details';

  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Failed to fetch data' });
      return;
    }
    res.json(results);
  });
});

app.get('/api/user-details/:emp_mobile', (req, res) => {
  const { emp_mobile } = req.params; // Get emp_mobile number from route parameter

  if (!emp_mobile) {
    return res.status(400).json({ error: 'mobile number is required' });
  }

  const sqlQuery = 'SELECT emp_name, nic, address FROM Contact_Details WHERE emp_mobile = ?';

  db.query(sqlQuery, [emp_mobile], (err, results) => {
    if (err) {
      console.error('Error fetching user details:', err);
      return res.status(500).json({ error: 'Failed to fetch user details' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'No user found with this emp_mobile number' });
    }

    res.json(results[0]); // Send back the user details
  });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
