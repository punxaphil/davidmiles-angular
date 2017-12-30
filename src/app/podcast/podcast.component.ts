import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service'
import { IPodcast } from '../models';

@Component({
  selector: 'app-podcast',
  templateUrl: './podcast.component.html',
  styleUrls: ['./podcast.component.css']
})
export class PodcastComponent implements OnInit {

  podcasts: Array<IPodcast> = [];

  constructor(private dataService: DataService) {
    this.dataService.getPodCast().subscribe(data => {
      this.podcasts = data;
      this.podcasts.forEach(podcast => podcast.url = 'http://sjowallmiles.podomatic.com/entry/' + podcast.podomaticId);
    });
  }

  ngOnInit() {
  }
}
