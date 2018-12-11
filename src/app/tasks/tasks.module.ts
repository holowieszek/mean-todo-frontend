import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AngularMaterialModule } from '../angular-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TaskPipe } from './task.pipe';

@NgModule({
  declarations: [TaskCreateComponent, TaskListComponent, TaskPipe],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule
  ]
})
export class TasksModule { }
