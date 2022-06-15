import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LeaderboardService } from '../leaderboard.service';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.css']
})
export class LeaderBoardComponent implements OnInit {

  wordRandom: Observable<any[]> = new Observable<any[]>();
  
  constructor(private leaderboard:LeaderboardService) { }

  ngOnInit(): void {this.leaderboard.getRandomWord();
    this.wordRandom = this.leaderboard.subject;
  }

}
