import { Component, OnInit } from '@angular/core';

import { Task } from './models/task';
import { AwsService } from './services/aws.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  serverId: string;
  tasks: Task[] = [
    {taskId: '1234', taskName: 'myTask'}
  ];

  constructor(
    private awsService: AwsService
  ) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.awsService
      .getData()
      .subscribe((tasks: Task[]) => {
        console.log(tasks);
        this.tasks = tasks;
      });
  }
}
