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
                //console.log(x.name);
            });
      });
      this.dataService.getPressAffisch(affisch => {

      });
    }
}
