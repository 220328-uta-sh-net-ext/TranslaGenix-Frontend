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
    this.imageSrc = ""
		this.file = event.target.files[0];
    var reader = new FileReader();

        reader.onload = (event:any) => {
            this.imageSrc = event.target.result
        }
        reader.readAsDataURL(event.target.files[0]);
	}

  imageSrc: string = "";

  error: boolean = false;
  response: any;
  text:string = "";
  endLanguageCode:string = "";
  translatedText:string = "";
/*   regions: any;
  lines: any;
  words: any;
  list: any = []; */

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
  url:string =""
  onUrl():any{
    //if (this.file !== null)
    this.fileocrService.fromUrl(this.url)
    .subscribe((data) =>{
      console.log(data);
      this.response = data.regions[0].lines;
     // console.log(data.regions[0].lines)
    },
    (error) =>{
      console.log(error)
      // Makes error message appear through ngIf
      this.error = true;
    })
    return this.response;
  }
  translate():void{
    this.fileocrService.translation(this.text, this.endLanguageCode)
    .subscribe((data) =>{
      console.log(data[0].translations[0].text)
      this.translatedText = data[0].translations[0].text
    },
    (error) =>{
      console.log(error)
      // Makes error message appear through ngIf
      this.error = true;
    })
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