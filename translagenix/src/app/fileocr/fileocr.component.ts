import { Component, OnInit } from '@angular/core';
import { FileocrService } from '../fileocr.service';

@Component({
  selector: 'app-fileocr',
  templateUrl: './fileocr.component.html',
  styleUrls: ['./fileocr.component.css']
})
export class FileocrComponent implements OnInit {

	file: File | null = null; 

  onChange(event:any) {
		this.file = event.target.files[0];
	}

  error: boolean = false;
  response: any;
  regions: any;
  lines: any;
  words: any;
  list: any = [];

  onUpload(): any {
    if (this.file !== null)
      this.fileocrService.upload(this.file).subscribe(
        (data) => {
          //console.log(data);
          this.response = data.regions[0].lines;
          // console.log(data.regions[0].lines)
        },
        (error) => {
          console.log(error);
          // Makes error message appear through ngIf
          this.error = true;
        }
      );
    return this.response;
  }

  printResponse(): any {
    this.allText = "";
    this.response.forEach((word: any) => {
      word.words.forEach((text: any) => {
        //console.log(word.words[0].text)
        this.allText += text.text + ' ';
      });
    });
    console.log(this.allText);
  }
  allText: string = '';
  
  constructor(private fileocrService:FileocrService) { }

  ngOnInit(): void {
  }
}