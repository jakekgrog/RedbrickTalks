import { Component, OnInit } from '@angular/core';

import { Task } from './models/task';
import { AwsService } from './services/aws.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  serverId: string;
  tasks: Task[];
  taskForm: NgForm;

  constructor(
    private awsService: AwsService
  ) { }

  ngOnInit(): void {
    this.getTasks();
  }

  onSubmit(form: NgForm) {
    const taskName = form.value.taskName;

    this.awsService
      .putData(taskName)
      .subscribe((response: any) => {
        console.log(response);
      });
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

  deleteTask(taskId) {
    this.awsService
      .deleteTask(taskId)
      .subscribe((response: any) => {
        console.log(response);
      });
    this.getTasks();
  }
}
