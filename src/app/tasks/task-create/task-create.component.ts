import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { TasksService } from '../tasks.service';
import { Task } from '../task.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {
  form: FormGroup;
  task: Task;
  imagesTest: [];
  private mode = 'create';
  private taskId: string;

  constructor(public tasksService: TasksService, public route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      description: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      // ownerId: new FormControl(null, null)
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('taskId')) {
        this.mode = 'edit';
        this.taskId = paramMap.get('taskId');

        this.tasksService.getTask(this.taskId).subscribe(task => {
          // console.log(task);
          this.imagesTest = task.result.images;
          console.log(this.imagesTest);
          this.task = {
            id: task.result._id,
            title: task.result.title,
            description: task.result.description
          };

          this.form.setValue({
            title: this.task.title,
            description: this.task.description
            // ownerId: this.authService.getUserId()
          });
        });
      } else {
        this.mode = 'create';
        this.taskId = null;
      }
    });
  }

  get f() { return this.form.controls; }

  onSaveTask() {
    if (this.form.invalid) {
      return;
    }

    if (this.mode === 'create') {
      this.tasksService.saveTask(this.form.value);
    } else {
      this.tasksService.updateTask(this.taskId, this.form.value);
    }
  }
}
