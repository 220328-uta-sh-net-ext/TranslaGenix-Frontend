import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileocrComponent } from './fileocr/fileocr.component';
import { HomeComponent } from './home/home.component';
import { LeaderBoardComponent } from './leader-board/leader-board.component';
import { SpeechToTextComponent } from './speech-to-text/speech-to-text.component';
import { LearningWordsComponent } from './learning-words/learning-words.component';


const routes = [
  {path: '', redirectTo : '/home', pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path: 'SpeechToText', component: SpeechToTextComponent},
  {path: 'LearningWords', component: LearningWordsComponent }
  {path: 'FileOCR', component: FileocrComponent},
  {path: 'LeaderBoard', component: LeaderBoardComponent},

]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
