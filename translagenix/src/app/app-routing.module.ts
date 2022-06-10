import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SpeechToTextComponent } from './speech-to-text/speech-to-text.component';
import { OktaAuthGuard,  OktaCallbackComponent } from '@okta/okta-angular';
import { ProfileComponent } from './profile/profile.component';

const routes:Routes = [
   {path: '', redirectTo : '/home', pathMatch:'full'},
  {path: 'home', component: HomeComponent},
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
