import { AuthService } from './services/auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { QuizmakerComponent } from './components/quizmaker/quizmaker.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ExamComponent } from './components/exam/exam.component';
import { QuizAttemptComponent } from './components/quiz-attempt/quiz-attempt.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AddPhotoComponent } from './components/add-photo/add-photo.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    LandingComponent,
    LoginComponent,
    QuizmakerComponent,
    ProfileComponent,
    DashboardComponent,
    PageNotFoundComponent,
    ExamComponent,
    QuizAttemptComponent,
    AddPhotoComponent,
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,

    
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule // storage
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
