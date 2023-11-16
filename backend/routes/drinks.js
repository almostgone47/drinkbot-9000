const express = require('express');
const passport = require('passport');
const router = express.Router();

const User = require('../models/User');
const {createDrink, deleteDrinkById} = require('../models/Drink');

router.post(
  '/',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    try {
      const newDrink = await createDrink(req.body.drinkData, req.user);
      res.json(newDrink);
    } catch (err) {
      res.status(400).send();
    }
  },
);

router.delete(
  '/:id',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    console.log('req.params: ', req.params.id);
    try {
      const newDrink = await deleteDrinkById(req.params.id);
      res.status(200).json(newDrink);
    } catch (err) {
      res.status(400).send();
    }
  },
);

module.exports = router;
