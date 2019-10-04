var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-1'})
var ddb = new AWS.DynamoDB.DocumentClient();

router.get('/get', async (req, res) => {
  const params = {
    TableName: 'TaskTable',
  }

  var result = await ddb.scan(params).promise();
  res.send(result.Items);

});

router.post('/put', async (req, res) => {
  console.log(req.body);

  const task = req.body;

  const params = {
    TableName: 'TaskTable',
    Item: task
  }

  var result = await ddb.put(params).promise();
  console.log(result)
  res.status(201).json;
});

router.post('/delete', async (req, res) => {
  console.log(req.body);

  const taskId = req.body.taskId;

  const params = {
    TableName: 'TaskTable',
    Key: {
      'taskId': taskId
    }
  }

  var result = await ddb.delete(params).promise();

  console.log(result);
  res.status(200);
});

module.exports = router;
