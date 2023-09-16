const express = require('express');
const knex = require('knex');


// Middleware for creating a session id on server and a session cookie on client
const expressSession = require('express-session');

// Add http headers
const helmet = require('helmet');

// Passport library
const passport = require('passport');

const app = express();
const cors = require('cors');
require('dotenv').config();

// Fallback for .env
const PORT = process.env.PORT || 5051;

// Initialize HTTP Headers middleware
app.use(helmet());

// Using express json to receive request body in JSON for post call
app.use(express.json());

// Enable CORS (with additional config options required for cookies)
app.use(
    cors({
      origin: true,
      credentials: true
    })
  );

  // Include express-session middleware (with additional config options required for Passport session)
app.use(
    expressSession({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true
    })
  );


const usersRouter = require('./routes/users')
app.use('/api/v1/users', usersRouter)

app.listen(PORT, () => {
    console.log('Listening on', PORT);
});
