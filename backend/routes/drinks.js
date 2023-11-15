const express = require('express');
const passport = require('passport');
const router = express.Router();

const User = require('../models/User');
const {createDrink} = require('../models/Drink');

router.post(
  '/add',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    console.log('req.user: ', req.user);
    // createDrink();
  },
);

module.exports = router;
