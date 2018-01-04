import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ILyric } from '../models';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {

  lyrics: Array<ILyric> = [];

  constructor(private dataService: DataService) {
    this.dataService.getLyrics(lyrics => {
      this.lyrics = lyrics;
      //this.lyrics.forEach(album => {
      //  album.spotifyUrl = 'http://open.spotify.com/album/' + album.spotifyId;
      //  album.iTunesUrl = 'https://itunes.apple.com/us/album/' + album.iTunesId;
      //  album.shopUrl = album.shopId ? 'http://davidmiles.tictail.com/product/' + album.shopId : '';
      //  album.width = '250px';
      //  album.height = '250px';
      //  album.hasImage = album.image ? true : false;
      //});
    });
  }

  ngOnInit() {
  }

}
