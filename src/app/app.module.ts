import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminComponent } from './admin/admin.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { OrderService } from './order.service';
import { AuthService } from './auth.service';
import { BaseRequestOptions, HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
//import { fakeBackendFactory, fakeBackendProvider } from './helpers/fake-backend';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './services/auth-guard.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    AdminComponent,
    NoAccessComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot([
      {path : '',component:HomeComponent},
      {path : 'admin',component:AdminComponent,canActivate:[AuthGuard,/*AdminAuthGuard*/]},
      {path : 'login',component:LoginComponent},
      {path : 'no-access',component:NoAccessComponent}
      //{path : '**',component:NotFoundComponent}
    ])
  ],
  providers: [
    OrderService,    
    AuthService,
    AuthGuard,
    AdminAuthGuard,

    // For creating a mock back-end. You don't need these in real app.
    //fakeBackendProvider,
    MockBackend,
    BaseRequestOptions


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
