const express = require('express');
const cors = require('cors');
const { query } = require('./src/config/dbConfig');
const mainRouter = require('./src/routes/index');

// Load environment variables
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// --- CORS Configuration ---
const whitelist = ['http://localhost:5173', 'http://localhost:3000'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));

// --- Middleware Setup ---
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Good practice for form data

// --- Database Connection Check ---
query('SELECT 1')
  .then(() => console.log('Connected to PostgreSQL database!'))
  .catch((err) => console.error('PostgreSQL connection error:', err));

// --- API Routes ---
app.use('/api', mainRouter);

// --- Server Startup ---
app.listen(port, () => {
  console.log(`Starting service on port ${port}`);
});