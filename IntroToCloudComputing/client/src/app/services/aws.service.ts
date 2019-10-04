import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { ApiEndpoints } from '../config/api-endpoints';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class AwsService {
  private baseUrl = ApiEndpoints.apiUrl;
  private apiDataGet = ApiEndpoints.apiDataGet;
  private apiDataPut = ApiEndpoints.apiDataPut;
  private apiDataDelete = ApiEndpoints.apiDataDelete;

  constructor(
    private httpClient: HttpClient
  ) { }


  getData(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.baseUrl + this.apiDataGet);
  }

  putData(task: string) {
    const taskData = {
      taskId: this.generateTaskId(),
      taskName: task
    };

    return this.httpClient.post<{task: any}>(this.baseUrl + this.apiDataPut, taskData);
  }

  deleteTask(taskId: string) {
    return this.httpClient.post<{response: any}>(this.baseUrl + this.apiDataDelete, {taskId});
  }

  private generateTaskId() {
    return Math.floor(Math.random() * 1000000).toString();
  }
}
