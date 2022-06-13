import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject} from 'rxjs';
import { ThemeService } from './dark-theme.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app-theme.scss'],
})
export class AppComponent implements OnInit {
  title = 'translagenix';

  isDarkTheme: Observable<boolean> | undefined;

  constructor(private themeService: ThemeService) {
    
  }
   //toggle() { this.isDarkTheme = !this.isDarkTheme; }

  ngOnInit() {
    this.isDarkTheme != this.themeService.isDarkTheme;
  } 
  
  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
    console.log("triggered");
  }
}
