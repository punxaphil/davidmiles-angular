import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { IMedia } from '../models/media';

@Component({
    selector: 'app-press',
    templateUrl: './press.component.html',
    styleUrls: ['./press.component.scss']
})
export class PressComponent implements OnInit {
    announcements: Array<IMedia>;
    
    constructor(private dataSerivce: DataService) {}

    ngOnInit() {
        this.dataSerivce.getPressAnnouncements(announcements => {
          this.announcements = announcements;
          this.announcements.forEach(x => {
                console.log(x.name);
            });
        });
    }

}
