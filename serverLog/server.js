const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to serve static files (your HTML site)
app.use(express.static('public'));

app.use(cors());

// Log function
function logToFile(message) {
  const logPath = path.join(__dirname, 'logs.txt');
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;
  fs.appendFile(logPath, logEntry, err => {
    if (err) console.error('Error writing log:', err);
  });
}

app.get('/', (req, res) => res.send("Hello world!"))

// Endpoint to log access
app.post('/log', (req, res) => {
  console.log(req.body);
  const { message } = req.body;
  logToFile(message);
  res.status(200).send({ message: 'Logged' });
});

// Start server
app.listen(port, () => {
  console.log(`Log server listening at http://localhost:${port}`);
});
