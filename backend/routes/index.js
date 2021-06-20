require('dotenv').config();
var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

router.get('/', function(req, res, next) {
  const API = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${req.query.symbol}&apikey=${process.env.API_KEY}`;

  fetch(API).then(res => res.json())
    .then(data => {
      console.log(data);
      res.send(data);
    }) .catch(err => {
      console.error(err);
      res.status(404).send();
    });
});

module.exports = router;