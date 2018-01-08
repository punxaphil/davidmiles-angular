import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ILyric } from '../models';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  animations: [
    trigger('animateText', [
      state('true', style({ opacity: 1, height: '*', overflow: 'hidden' })),
      state('false', style({ opacity: 0, height: '0px', overflow: 'hidden' })),
      transition('1 => 0', animate('300ms')),
      transition('0 => 1', animate('300ms'))
    ])
  ]
})
export class TextComponent implements OnInit {
  lyrics: Array<ILyric> = [];
  lyric: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getLyrics(lyrics => {
      this.lyrics = lyrics;
      this.lyrics.forEach(lyric => {
        lyric.showText = false;
      });
    });
  }

  showText(item) {
    this.lyrics.forEach(lyric => {
      if (lyric.title !== item.title) {
        lyric.showText = false;
      }
    });
    if (item.showText) {
      item.showText = (!item.showText);
    } else {
      this.dataService.getLyric(item.textFile,
        response => {
          item.text = response;
          item.showText = true;
        },
        error => {
          item.text = "Tyvärr kunden texten inte visas för tillfälligt. Återkom lite senare.";
          item.showText = true;
        });
    }
  }
}
