import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../services/data.service';
import { IMedia } from '../models/media';

@Component({
    selector: 'app-press',
    templateUrl: './press.component.html',
    styleUrls: ['./press.component.scss']
})
export class PressComponent implements OnInit {
    announcements: Array<IMedia>;
    images: Array<IMedia> = [];
    url = "press/img";
    posters: Array<IMedia> = [];

    constructor(private dataService: DataService) {}

    ngOnInit() {
      this.dataService.getPressAnnouncements(announcements => {
          this.announcements = announcements;
          this.announcements.forEach(x => {
            });
      });
      this.dataService.getPressPoster(posters => {
        let tempPosters = posters;
        tempPosters.forEach(x => {
          if (!x.path.match(".pdf")) {
            var filename = x.download_url.substr(0, x.download_url.lastIndexOf('.'));
            let poster: IMedia =
              {
                name: x.name,
                path: x.path,
                download_url: filename + '.pdf',
                thumbnail: x.download_url
              };
            console.log(poster);
            this.posters.push(poster);
          }
        });
      });
    }
}
