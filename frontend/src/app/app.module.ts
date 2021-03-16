import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { AuthGuard } from './auth/auth.guard';
import { CommentService } from './services/comment.service';
import { PostService } from './services/post.service';
import { ApproveComponent } from './approve/approve.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PostComponent,
    RegisterComponent,
    NavbarComponent,
    ApproveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [UserService, AuthGuard, CommentService, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
