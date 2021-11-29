import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserGuard } from '../shared/guards/user.guard';



@NgModule({
  declarations: [
    AdminLayoutComponent,
    CreateUserComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: AdminLayoutComponent, children: [
          { path: '', redirectTo: '/admin/create-user', pathMatch: 'full'},
          { path: 'create-user', component: CreateUserComponent, canActivate: [UserGuard] },
          { path: 'edit-user/:id', component: EditUserComponent, canActivate: [UserGuard] }
        ]
      }
    ]),
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    TranslateModule,
    ToastrModule
  ],
  exports: [RouterModule, TranslateModule, ToastrModule]
})
export class AdminModule {
}
