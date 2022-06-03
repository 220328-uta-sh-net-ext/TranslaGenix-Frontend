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

  error:boolean = false;
  response:any;

  onUpload():any{
    if (this.file !== null)
    this.fileocrService.upload(this.file)
    .subscribe((data) =>{
      console.log(data)
      this.response = data
    },
    (error) =>{
      console.log(error)
      // Makes error message appear through ngIf
      this.error = true;
    })
    return this.response;
  }
  
  constructor(private fileocrService:FileocrService) { }

  ngOnInit(): void {
  }
}