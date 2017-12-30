import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service'
import { IAlbum } from '../models';

@Component({
  selector: 'app-discography',
  templateUrl: './discography.component.html',
  styleUrls: ['./discography.component.css']
})
export class DiscographyComponent implements OnInit {

  albums: Array<IAlbum> = [];

  constructor(private dataService: DataService) {
    this.dataService.getAlbums().subscribe(data => {
      this.albums = data;
      this.albums.forEach(d => d.url = 'http://sjowallmiles.podomatic.com/entry/' + d.podomaticId);
    });
  }

  ngOnInit() {
  }

}
