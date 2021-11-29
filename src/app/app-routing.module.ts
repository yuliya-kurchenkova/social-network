import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from "./components/main-layout/main-layout.component";
import { LoginComponent } from "./components/login/login.component";
import { UserListComponent } from "./components/user-list/user-list.component";
import { UserDetailsComponent } from "./components/user-details/user-details.component";
import { AuthGuard } from "./shared/guards/auth.guard";
import { LoginGuard } from "./shared/guards/login.guard";

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
      {path: 'user-list', component: UserListComponent, canActivate: [AuthGuard]},
      {path: 'user-details', component: UserDetailsComponent, canActivate: [AuthGuard]}
    ]
  },
  {
    path: 'admin', loadChildren:  () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
