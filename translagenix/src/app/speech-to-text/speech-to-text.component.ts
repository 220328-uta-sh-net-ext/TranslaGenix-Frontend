import { Component, NgZone } from '@angular/core';
import { NavbarService } from '../navbar.service';

declare const annyang: any;
declare var require: any


@Component({
  selector: 'app-speech-to-text',
  templateUrl: './speech-to-text.component.html',
  styleUrls: ['./speech-to-text.component.css']
})
export class SpeechToTextComponent {

  [x: string]: any;

  voiceActiveSectionDisabled: boolean = true;
  voiceActiveSectionError: boolean = false;
  voiceActiveSectionSuccess: boolean = false;
  voiceActiveSectionListening: boolean = false;
  voiceText: any;
  translatedText:String = "Translated Text"
  recognizedLanguage: String = "en-US";
  translatedLanguage: String = "en-US";

  constructor(private ngZone: NgZone, private nav: NavbarService) { }

  ngOnInit(): void {
    this.nav.show();
  }

  initializeVoiceRecognitionCallback(): void {
    annyang.addCallback('error', (err: any) => {
      if (err.error === 'network') {
        this.voiceText = "Internet is require";
        annyang.abort();
        this.ngZone.run(() => this.voiceActiveSectionSuccess = true);
      } else if (this.voiceText === undefined) {
        this.ngZone.run(() => this.voiceActiveSectionError = true);
        annyang.abort();
      }
    });

    annyang.addCallback('soundstart', (res: any) => {
      this.ngZone.run(() => this.voiceActiveSectionListening = true);
    });

    annyang.addCallback('end', () => {
      if (this.voiceText === undefined) {
        this.ngZone.run(() => this.voiceActiveSectionError = true);
        annyang.abort();
      }
    });

    annyang.addCallback('result', (userSaid: any) => {
      this.ngZone.run(() => this.voiceActiveSectionError = false);

      let queryText: any = userSaid[0];

      annyang.abort();

      this.voiceText = queryText;

      this.ngZone.run(() => this.voiceActiveSectionListening = false);
      this.ngZone.run(() => this.voiceActiveSectionSuccess = true);
    });
  }

  startVoiceRecognition(): void {
    this.voiceActiveSectionDisabled = false;
    this.voiceActiveSectionError = false;
    this.voiceActiveSectionSuccess = false;
    this.voiceText = undefined;
    this.translatedText = "Translated Text";
    annyang.setLanguage(this.recognizedLanguage);

    if (annyang) {
      let commands = {
        'demo-annyang': () => { }
      };

      annyang.addCommands(commands);
      this.initializeVoiceRecognitionCallback();

      annyang.start({ autoRestart: false });
    }
  }

  closeVoiceRecognition(): void {
    this.voiceActiveSectionDisabled = true;
    this.voiceActiveSectionError = false;
    this.voiceActiveSectionSuccess = false;
    this.voiceActiveSectionListening = false;
    this.voiceText = undefined;
    this.translatedText = "Translated Text";
    if (annyang) {
      annyang.abort();
    }
  }

  translation(): void {
    const axios = require('axios').default;
    const { v4: uuidv4 } = require('uuid');

    var key = "62a3f7d0558e430c868a53b732787e01";
    var endpoint = "https://api.cognitive.microsofttranslator.com";

    // Add your location, also known as region. The default is global.
    // This is required if using a Cognitive Services resource.
    var location = "eastus";
    this.translatedText = this.voiceText;
    axios({
      baseURL: endpoint,
      url: '/translate',
      method: 'post',
      headers: {
        'Ocp-Apim-Subscription-Key': key,
        'Ocp-Apim-Subscription-Region': location,
        'Content-type': 'application/json',
        'X-ClientTraceId': uuidv4().toString()
      },
      params: {
        'api-version': '3.0',
        'from': this.recognizedLanguage,
        'to': this.translatedLanguage,
        'includeSentenceLength': true
      },
      data: [{
        'text': this.voiceText
    }],
      responseType: 'json'
    }).then((response:any) => {
      const text = JSON.parse(JSON.stringify(response.data, null, ));
      this.translatedText = text[0].translations[0].text
    })
    
  }
}
