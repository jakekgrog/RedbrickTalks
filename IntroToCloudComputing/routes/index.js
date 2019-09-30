var express = require('express');
var http = require('http');
var router = express.Router();
var AWS = require('aws-sdk')
var ddb = new AWS.DynamoDB.DocumentClient();

/* GET home page. */
router.get('/', (req, res) => {
  // ON EVENT => FETCH DATA from /data
  res.render('index', { title: 'Express' });
});

/* GET data from DynamoDB */
router.get('/data', async (req, res) => {
    const params = {
      TableName: 'TodoList'
    }
    const response = await ddb.scan(params).promise();

    return res.status(200).json(
      {
        data: response
      }
    );
});

/* POST to DynamoDB. */
router.post('/add', async (req, res) => {
    const data = req.body.task;
    const params = {
      TableName: 'TodoList',
      Item: {
        "TaskName": req.body.taskName
      }
    }
    await ddb.put(params).promise();

    // EMIT FETCH EVENT TO UPDATE PAGE
    
    return res.status(200);
})

module.exports = router;
