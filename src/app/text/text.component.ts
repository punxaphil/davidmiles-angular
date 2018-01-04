import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { ILyric } from '../models';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent {

  lyrics: Array<ILyric> = [];
  lyric: string;

  constructor(private dataService: DataService) {
    this.dataService.getLyrics(lyrics => {
      this.lyrics = lyrics;
    });
  }

  showText(item) {
    if (item.showText)
      item.showText = false;
    else {
      this.dataService.getLyric(item.textFile,
        text => {
          item.text = text;
          item.showText = true;
        });
    }
  }
}
