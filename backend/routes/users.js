const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../models/User');
const {getAllDrinks} = require('../models/Drink');

router.get('/test', (req, res) => res.json({msg: 'Users works'}));

router.post('/register', (req, res) => {
  User.findOne({email: req.body.email.toLowerCase()}).then((user) => {
    if (user) {
      return res.status(400).json({msg: 'Email already exists'});
    }

    const newUser = new User({
      email: req.body.email.trim().toLowerCase(),
      password: req.body.password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then((user) => {
            const payload = {
              id: user.id,
              email: user.email,
            };
            console.log('payload', payload);

            jwt.sign(
              payload,
              process.env.secretOrKey,
              {expiresIn: 3600},
              (err, token) => {
                res.status(200).json({
                  jwtToken: 'Bearer ' + token,
                  user: payload,
                });
              },
            );
          })
          .catch((err) => console.log(err));
      });
    });
  });
});

router.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({email})
    .then(async (user) => {
      if (!user) {
        return res.status(404).json({errors: 'Email not found'});
      }

      const userDrinks = await getAllDrinks(user);

      bcrypt.compare(password, user.password).then(() => {
        const payload = {
          id: user.id,
          email: user.email,
          userDrinks: userDrinks,
        };
        console.log('user: ', user);

        jwt.sign(
          payload,
          process.env.secretOrKey,
          {expiresIn: 3600},
          (err, token) => {
            res.json({
              success: true,
              jwtToken: 'Bearer ' + token,
              user: payload,
            });
          },
        );
      });
    })
    .catch((err) => {
      res.status(404).json({errors: 'Network error' + err});
    });
});

router.get(
  '/current',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    res.json({
      id: req.user.id,
      email: req.user.email,
      userDrinks: req.user.userDrinks,
    });
  },
);

module.exports = router;
