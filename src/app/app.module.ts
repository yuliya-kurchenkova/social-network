import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { MainLayoutComponent } from "./components/main-layout/main-layout.component";
import { environment } from "../environments/environment";
import { AdminModule } from "./admin/admin.module";
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from "./shared/services/auth.service";
import { UserItemComponent } from './components/user-list/user-item/user-item.component';
import { UserDetailsComponent } from "./components/user-details/user-details.component";
import { MatIconModule} from "@angular/material/icon";
import { DelUserModalComponent } from './components/user-list/del-user-modal/del-user-modal.component';
import { MatDialogModule } from "@angular/material/dialog";
import { SearchPipe } from "./shared/pipes/search.pipe";
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { HeaderComponent } from "./components/header/header.component";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { AngularFireDatabaseModule } from "@angular/fire/compat/database";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { ToastrModule } from "ngx-toastr";
import { LoadingInterceptor } from "./shared/interceptors/loadingInterceptor.service";
import { NamePipe } from "./shared/pipes/name.pipe";
import { ReverseIfDirective } from "./shared/directives/reverseIf.directive";


export const options: Partial<IConfig> | (() => Partial<IConfig>) | any = null;

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    UserListComponent,
    MainLayoutComponent,
    UserItemComponent,
    UserDetailsComponent,
    DelUserModalComponent,
    SearchPipe,
    HeaderComponent,
    NamePipe,
    ReverseIfDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AdminModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    NgxMaskModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot({
      timeOut: 4000,
      progressAnimation: 'increasing',
      preventDuplicates: true
    }),
  ],
  exports: [ToastrModule],
  providers: [AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
