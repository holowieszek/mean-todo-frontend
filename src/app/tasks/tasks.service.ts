import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Task } from './task.model';
import { Router } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class TasksService {
  private tasks: Task[] = [];
  private tasksUpdated = new Subject<{ tasks: Task[] }>();
  private url = environment.baseUrl + '/';

  constructor(private http: HttpClient, private router: Router) {}

  getTasks() {
    this.http.get<{ tasks: any }>(this.url)
        .pipe(map(result => {
          return { tasks: result.tasks.map(task => {
            return {
              id: task._id,
              title: task.title,
              description: task.description,
            };
          })
        };
        }))
        .subscribe(transformedData => {
          this.tasks = transformedData.tasks;
          this.tasksUpdated.next({
            tasks: [...this.tasks]
          });
        });
  }

  getTasksUpdateListener() {
    return this.tasksUpdated.asObservable();
  }

  getTask(id: string) {
    return this.http.get<{ _id: string, title: string, description: string, result: any }>(this.url + id);
  }

  saveTask(form: any) {
    this.http.post<{ message: string, task: Task }>(this.url, form)
        .subscribe((response => {
          this.router.navigate(['/tasks']);
        }));
  }

  updateTask(taskId: string, form: NgForm) {
    this.http.put(this.url + taskId, form).subscribe(result => {
      this.router.navigate(['/tasks']);
    });
  }

  deletePost(taskId: string) {
    return this.http.delete<{ message: string }>(this.url + taskId);
  }
}
