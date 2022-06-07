import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SpeechToTextComponent } from './speech-to-text/speech-to-text.component';
import { WordADayComponent } from './word-a-day/word-a-day.component';

const routes = [
  {path: '', redirectTo : '/home', pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path: 'SpeechToText', component: SpeechToTextComponent},
  {path: 'wordaday', component: WordADayComponent }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
