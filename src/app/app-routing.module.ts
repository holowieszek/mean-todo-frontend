import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskCreateComponent } from './tasks/task-create/task-create.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard] },
  { path: 'create', component: TaskCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:taskId', component: TaskCreateComponent, canActivate: [AuthGuard] },
  { path: '', loadChildren: './auth/auth.module#AuthModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
