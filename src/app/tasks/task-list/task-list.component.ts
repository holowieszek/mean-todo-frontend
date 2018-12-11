import { Component, OnInit, Input } from '@angular/core';
import { TasksService } from '../tasks.service';
import { Task } from '../task.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  @Input() search: string | number = '';

  private tasksSubscription: Subscription;

  constructor(public tasksService: TasksService) { }

  ngOnInit() {
    this.tasksService.getTasks();
    this.tasksSubscription = this.tasksService.getTasksUpdateListener().subscribe((taskData: { tasks: Task[] }) => {
      this.tasks = taskData.tasks;
    });
  }

  clearSearchBox() {
    this.search = null;
  }

  onDelete(taskId: string) {
    this.tasksService.deletePost(taskId).subscribe(() => {
      this.tasksService.getTasks();
    });
  }
}
