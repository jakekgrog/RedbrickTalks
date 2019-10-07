import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, from } from 'rxjs';
import { ApiEndpoints } from '../config/api-endpoints';
import { Task } from '../models/task';
import * as AWS from 'aws-sdk';

AWS.config.update({
  region: 'eu-west-1',
  accessKeyId: 'ACCESSKEY',
  secretAccessKey: 'SECRETKEY'
});

const ddb = new AWS.DynamoDB.DocumentClient();

@Injectable({
  providedIn: 'root'
})
export class AwsService {

  constructor(
    private httpClient: HttpClient
  ) { }


  getData(): Observable<any> {

    const params = {
      TableName: 'TaskTable',
    };

    return from(ddb.scan(params).promise());

  }

  async putData(taskName: string) {
    const task = {
      taskId: this.generateTaskId(),
      taskName,
    };

    const params = {
      TableName: 'TaskTable',
      Item: task
    };

    await ddb.put(params).promise();

  }

  async deleteTask(taskId: string) {

    const params = {
      TableName: 'TaskTable',
      Key: {
        taskId
      }
    };

    await ddb.delete(params).promise();
    return;
  }

  private generateTaskId() {
    return Math.floor(Math.random() * 1000000).toString();
  }
}
