var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk')
var DDB = new AWS.DynamoDB.DocumentClient();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
