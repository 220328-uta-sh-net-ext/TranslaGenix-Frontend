import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
//import { Service } from 'rxjs';
import { ThemeService } from './dark-theme.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'translagenix';

  isDarkTheme!: Observable<boolean>;

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }
}
