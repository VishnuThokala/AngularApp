import { QuizmakerComponent } from './components/quizmaker/quizmaker.component';
import { AuthService } from 'src/app/services/auth.service';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
import { LandingComponent } from './components/landing/landing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'app', component: AuthComponent },
  { path: 'home', canActivate: [AuthService], component: HomeComponent },
  { path: 'quizmaker', canActivate: [AuthService], component: QuizmakerComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  {path:'**',component:LandingComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
    
  
 }
