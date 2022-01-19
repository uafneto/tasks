import { Routes, RouterModule } from '@angular/router';
import { TaskListPageComponent } from '../task-list-page/task-list-page.component';

const routes: Routes = [{
  path:"", component: TaskListPageComponent
}];

export const RouteRoutes = RouterModule.forChild(routes);
