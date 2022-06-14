import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

@Injectable({
  providedIn: 'root'
})
export class ThemeService { 
  
  private _darkTheme = new Subject<boolean>();
  isDarkTheme = this._darkTheme.asObservable();
  setDarkTheme(isDarkTheme: boolean): void {
    this._darkTheme.next(isDarkTheme);
  }
  constructor() { }
}