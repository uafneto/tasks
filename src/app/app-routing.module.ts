import { TaskListPageComponent } from './tasks/pages/task-list-page/task-list-page.component';
import { TaskFormPageComponent } from './tasks/pages/task-form-page/task-form-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'new',
    component: TaskFormPageComponent,
  },
  {
    path: 'edit/:id',
    component: TaskFormPageComponent,
  },
  {
    path: '',
    component: TaskListPageComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
