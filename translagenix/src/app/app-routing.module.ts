import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SpeechToTextComponent } from './speech-to-text/speech-to-text.component';
import { OktaAuthGuard,  OktaCallbackComponent } from '@okta/okta-angular';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';

const routes:Routes = [
   {path: '', redirectTo : '/login', pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'SpeechToText', component: SpeechToTextComponent}, 
  {
    path: 'protected',
    loadChildren: () => import('./protected.module').then(m => m.ProtectedModule),
    canActivate: [OktaAuthGuard]
},
{ path: 'profile', component: ProfileComponent, canActivate: [OktaAuthGuard] },
{ path: 'login/callback', component: OktaCallbackComponent }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
