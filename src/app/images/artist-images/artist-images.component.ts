import { Component, OnInit } from '@angular/core';
import { ImagesComponent } from '../images.component';

@Component({
  selector: 'app-artist-images',
  templateUrl: './artist-images.component.html',
  styleUrls: ['./artist-images.component.scss']
})
export class ArtistImagesComponent implements OnInit {
  url = "img/artist";

  constructor() { }

  ngOnInit() {
  }

}
