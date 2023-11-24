const express = require('express');
const passport = require('passport');
const router = express.Router();
const axios = require('axios');

router.get(
  '/',
  //   passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    try {
      const response = await axios.get(
        'https://e34zimyozb.execute-api.us-east-1.amazonaws.com/Prod/ad/',
      );
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
      res.status(400).send();
    }
  },
);

module.exports = router;
