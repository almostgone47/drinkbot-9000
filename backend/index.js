const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const cors = require('cors');
const app = express();

// routes
const users = require('./routes/users');
const drinks = require('./routes/drinks');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = process.env.MONGODB_CONNECT_STRING;

mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

const corsOptions = {
  origin: '*', // or '*' for all origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/drinks', drinks);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/client/build/index.html'));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
