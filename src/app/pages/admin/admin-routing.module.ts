import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostPermissionGuard } from 'src/app/guards/post-permission.guard';
import { UserPermissionGuard } from 'src/app/guards/user-permission.guard';
import { AdminComponent } from './admin.component';
const routes: Routes = [
  // Allow acces to /posts if user has 'catalog.read' permissions
  { path: '',   component: AdminComponent},
  {
    path: 'posts',
    loadChildren: () =>
      import('./posts/posts.module').then((m) => m.PostsModule),canActivate: [PostPermissionGuard]
  },
  // Allow acces to /users if user has 'user.read' permissions
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),canActivate: [UserPermissionGuard]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}

