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
  //@ViewChild('thumbnails') thumbnails;
    
  constructor(private dataService: DataService) {}

    ngOnInit() {
      this.dataService.getPressAnnouncements(announcements => {
          this.announcements = announcements;
          this.announcements.forEach(x => {
                //console.log(x.name);
            });
        });

      this.dataService.getPressImages(images => {
          let tempImages = images;
          tempImages.forEach(x => {
            if (!x.path.match("/thumb")) {
                var filename = x.download_url.substr(x.download_url.lastIndexOf('/') + 1);
                x.thumbnail = x.download_url.substr(0, x.download_url.lastIndexOf('/')) + "/thumb/" + filename;
                this.images.push(x);
              }
           // $("thumbnails").lightGallery();
            //this.thumbnails.lightGallery();
          });
        });
    }

}
