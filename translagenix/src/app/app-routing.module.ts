import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SpeechToTextComponent } from './speech-to-text/speech-to-text.component';
import { LearningWordsComponent } from './learning-words/learning-words.component';

const routes = [
  {path: '', redirectTo : '/home', pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path: 'SpeechToText', component: SpeechToTextComponent},
  {path: 'LearningWords', component: LearningWordsComponent }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
