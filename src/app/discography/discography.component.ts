import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { IAlbum } from '../models';

@Component({
  selector: 'app-discography',
  templateUrl: './discography.component.html',
  styleUrls: ['./discography.component.scss']
})
export class DiscographyComponent implements OnInit {

  albums: Array<IAlbum> = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getAlbums(albums => {
      this.albums = albums;
      this.albums.forEach(album => {
        album.spotifyUrl = 'http://open.spotify.com/album/' + album.spotifyId;
        album.iTunesUrl = 'https://itunes.apple.com/us/album/' + album.iTunesId;
        album.shopUrl = album.shopId ? 'http://davidmiles.tictail.com/product/' + album.shopId : '';
        album.width = '250px';
        album.height = '250px';
        album.hasImage = !!album.image;
      });
    });
  }
}
