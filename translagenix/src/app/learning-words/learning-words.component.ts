import { Component, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { LearningWordsService } from '../learning-words.service';
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
	wordRandom: Observable<any[]> = new Observable<any[]>();

	constructor(private ngZone: NgZone, private nav: NavbarService, private word:LearningWordsService
		) {

		this.voices = [];
		this.rates = [.25, .5, .75, 1, 1.25, 1.5, 1.75, 2];
		this.selectedVoice = null;
		this.selectedRate = 1;

		this.randomWord = "";
		this.sayCommand = "";

		this.recommendedVoices = Object.create(null);
	}

	public getRandomWords() {
		this.word.getRandomWord();
		this.wordRandom = this.word.subject;
		this.wordRandom.forEach(element => {
		
			this.randomWord = Array.from(Object.values(element))[1];
		});

	}

	public async learnedWord()
	{
		await this.getRandomWords();
	
	}


	public ngOnInit(): void {
		this.nav.show();
		this.voices = speechSynthesis.getVoices();
		this.selectedVoice = (this.voices[0] || null);
		this.getRandomWords();
		
		if (!this.voices.length) {

			speechSynthesis.addEventListener(
				"voiceschanged",
				() => {

					this.voices = speechSynthesis.getVoices();
					this.selectedVoice = this.selectedVoice ?? this.voices[0];

				}
			);

		}

	}

	public speak(): void {

		if (!this.selectedVoice || !this.text) {

			return;

		}


		this.stop();
		this.synthesizeSpeechFromText(this.selectedVoice, this.selectedRate, this.text);

	}

	public stop(): void {

		if (speechSynthesis.speaking) {

			speechSynthesis.cancel();

		}


	}

	public updateSayCommand(): void {

		if (!this.selectedVoice || !this.text) {

			return;

		}

		var sanitizedRate = Math.floor(200 * this.selectedRate);
		var sanitizedText = this.text
			.replace(/[\r\n]/g, " ")
			.replace(/(["'\\\\/])/g, "\\$1")
			;

		this.sayCommand = `say --voice ${this.selectedVoice.name} --rate ${sanitizedRate} --output-file=demo.aiff "${sanitizedText}"`;


	}

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
	public translatedText: String = "Translated Text";
	recognizedLanguage: String = "en-US";

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
		var location = "eastus";

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