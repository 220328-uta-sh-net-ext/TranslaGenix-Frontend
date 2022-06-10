import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { SpeechToTextComponent } from './speech-to-text/speech-to-text.component';
import { LoginComponent } from './login/login.component';
import { FileocrComponent } from './fileocr/fileocr.component';


import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { ProfileComponent } from './profile/profile.component';

import { AuthInterceptor } from './auth.interceptor';

const oktaAuth = new OktaAuth({
  issuer: 'https://dev-23865213.okta.com/oauth2/default',
  clientId: '0oa5cjdiotopFAzSS5d7',
  // redirectUri: window.location.origin + '/login/callback'
  //create new app on octa side once we deployed(or in production)
  redirectUri: 'https://translagenix-frontend.azurewebsites.net'
});

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SpeechToTextComponent,
    LoginComponent,
    FileocrComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    OktaAuthModule
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: { oktaAuth } },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
