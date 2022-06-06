import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminGuardGuard } from './guards/admin-guard.guard';
import { InnerGuardGuard } from './guards/inner-guard.guard';
import { NotAllowedComponent } from './pages/not-allowed/not-allowed.component';

const routes: Routes = [
  { path: 'login',   component: LoginComponent, canActivate: [InnerGuardGuard],},
  {
    path: '',
    loadChildren: () =>
      import('./pages/admin/admin.module').then((m) => m.AdminModule),
      canActivate: [AdminGuardGuard]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
