import { Component, NgZone } from '@angular/core';
import { NavbarService } from '../navbar.service';

declare const annyang: any;
declare var require: any

interface RecommendedVoices {
	[key: string]: boolean;
}

@Component({
	selector: 'app-learning-words',
	templateUrl: './learning-words.component.html',
	styleUrls: ['./learning-words.component.css']
})
export class LearningWordsComponent {
	public sayCommand: string;
	public recommendedVoices: RecommendedVoices;
	public rates: number[];
	public selectedRate: number;
	public selectedVoice: SpeechSynthesisVoice | null;
	public text: string = "Translated Text";
	public voices: SpeechSynthesisVoice[];
	public randomWord: string;
	// I initialize the app component.
	constructor(private ngZone: NgZone, private nav: NavbarService) {

		this.voices = [];
		this.rates = [.25, .5, .75, 1, 1.25, 1.5, 1.75, 2];
		this.selectedVoice = null;
		this.selectedRate = 1;

		// Bruce Leroy from The Last Dragon for the win!
		// this.text value will need to be translated from random word
		this.randomWord ="Hello How are you?";
		this.sayCommand = "";

		this.recommendedVoices = Object.create(null);

		/*  commented out.  none of these voices work for our component

		this.recommendedVoices[ "Alex" ] = true;
		this.recommendedVoices[ "Alva" ] = true;
		this.recommendedVoices[ "Damayanti" ] = true;
		this.recommendedVoices[ "Daniel" ] = true;
		this.recommendedVoices[ "Fiona" ] = true;
		this.recommendedVoices[ "Fred" ] = true;
		this.recommendedVoices[ "Karen" ] = true;
		this.recommendedVoices[ "Mei-Jia" ] = true;
		this.recommendedVoices[ "Melina" ] = true;
		this.recommendedVoices[ "Moira" ] = true;
		this.recommendedVoices[ "Rishi" ] = true;
		this.recommendedVoices[ "Samantha" ] = true;
		this.recommendedVoices[ "Tessa" ] = true;
		this.recommendedVoices[ "Veena" ] = true;
		this.recommendedVoices[ "Victoria" ] = true;
		this.recommendedVoices[ "Yuri" ] = true;
		*/
	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I demo the currently-selected voice.

	/*  commented out unnecessary default statement
  
	  public demoSelectedVoice() : void {
  
		  if ( ! this.selectedVoice ) {
  
			  console.warn( "Expected a voice, but none was selected." );
			  return;
  
		  }
  
		  var demoText = "Best wishes and warmest regards.";
  
		  this.stop();
		  this.synthesizeSpeechFromText( this.selectedVoice, this.selectedRate, demoText );
  
	  }
  */

	// I get called once after the inputs have been bound for the first time.
	public ngOnInit(): void {
		this.nav.show();
		this.voices = speechSynthesis.getVoices();
		this.selectedVoice = (this.voices[0] || null);
		this.updateSayCommand();

		// The voices aren't immediately available (or so it seems). As such, if no
		// voices came back, let's assume they haven't loaded yet and we need to wait for
		// the "voiceschanged" event to fire before we can access them.
		if (!this.voices.length) {

			speechSynthesis.addEventListener(
				"voiceschanged",
				() => {

					this.voices = speechSynthesis.getVoices();
					this.selectedVoice = this.selectedVoice??this.voices[0];
					//this.updateSayCommand();

				}
			);

		}

	}


	// I synthesize speech from the current text for the currently-selected voice.
	public speak(): void {

		if (!this.selectedVoice || !this.text) {

			return;

		}
		

		this.stop();
		this.synthesizeSpeechFromText(this.selectedVoice, this.selectedRate, this.text);
		
	}


	// I stop any current speech synthesis.
	public stop(): void {

		if (speechSynthesis.speaking) {

			speechSynthesis.cancel();

		}
	//	this.selectedVoice =speechSynthesis.

	}


	// I update the "say" command that can be used to generate the a sound file from the
	// current speech synthesis configuration.
	public updateSayCommand(): void {

		if (!this.selectedVoice || !this.text) {

			return;

		}

		// With the say command, the rate is the number of words-per-minute. As such, we
		// have to finagle the SpeechSynthesis rate into something roughly equivalent for
		// the terminal-based invocation.
		var sanitizedRate = Math.floor(200 * this.selectedRate);
		var sanitizedText = this.text
			.replace(/[\r\n]/g, " ")
			.replace(/(["'\\\\/])/g, "\\$1")
			;

		this.sayCommand = `say --voice ${this.selectedVoice.name} --rate ${sanitizedRate} --output-file=demo.aiff "${sanitizedText}"`;
		

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I perform the low-level speech synthesis for the given voice, rate, and text.
	private synthesizeSpeechFromText(	
		voice: SpeechSynthesisVoice,
		rate: number,
		text: string
	): void {
	
		var utterance = new SpeechSynthesisUtterance(text);
		utterance.voice = this.selectedVoice;
		utterance.rate = rate;

		speechSynthesis.speak(utterance);

		
	}
	[x: string]: any;

	voiceActiveSectionDisabled: boolean = true;
	voiceActiveSectionError: boolean = false;
	voiceActiveSectionSuccess: boolean = false;
	voiceActiveSectionListening: boolean = false;
	voiceText: any;
	public translatedText: String = "Translated Text"
	recognizedLanguage: String = "en-US";
	//translatedLanguage: String = this.recognizedLanguage;

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
	//	this.voiceText = this.randomWord;
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
				'from': 'en-US',
				'to': this.recognizedLanguage,
				'includeSentenceLength': true
			},
			data: [{
				'text': this.randomWord
			}],
			responseType: 'json'
		}).then((response: any) => {
			const text = JSON.parse(JSON.stringify(response.data, null,));
			this.text = text[0].translations[0].text
		})
		
	}
}