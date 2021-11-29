import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from "./components/main-layout/main-layout.component";
import { LoginComponent } from "./components/login/login.component";
import { UserListComponent } from "./components/user-list/user-list.component";
import { UserDetailsComponent } from "./components/user-details/user-details.component";

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'user-list', component: UserListComponent},
      {path: 'user-details', component: UserDetailsComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LazyRoutingModule { }
