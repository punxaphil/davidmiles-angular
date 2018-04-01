import {Component, ViewChild, OnInit} from '@angular/core';
import {DEMO_GALLERY_CONF_INLINE, DEMO_GALLERY_IMAGE} from './config';
import { GALLERY_CONF, GALLERY_IMAGE, NgxImageGalleryComponent } from 'ngx-image-gallery';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'artist-images.component.html',
  styleUrls: ['artist-images.component.css']
})
export class ArtistImagesComponent implements OnInit {

  public showConf = false;

  @ViewChild('ngxImageGallery') ngxImageGallery: NgxImageGalleryComponent;

  title = 'Bilder';

  // gallery configuration
  conf: GALLERY_CONF = DEMO_GALLERY_CONF_INLINE;

  // gallery images
  images: GALLERY_IMAGE[] = [];//DEMO_GALLERY_IMAGE;

    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.dataService.getPressImages(images => {
            let tempImages = images;
            tempImages.forEach(x => {
                if (!x.path.match("/thumb")) {
                    var filename = x.download_url.substr(x.download_url.lastIndexOf('/') + 1);
                    let image: GALLERY_IMAGE =
                    {
                        url: x.download_url,
                        altText: x.name,
                        thumbnailUrl: x.download_url.substr(0, x.download_url.lastIndexOf('/')) + "/thumb/" + filename
                    };
                    this.images.push(image);

                }

            });
            this.openGallery(0);
        });
    }

    // METHODS
  // open gallery
  openGallery(index: number = 0) {
    // console.log(this.ngxImageGallery);
     this.ngxImageGallery.open(index);
  }

  // close gallery
  closeGallery() {
     this.ngxImageGallery.close();
  }

  // set new active(visible) image in gallery
  newImage(index: number = 0) {
     this.ngxImageGallery.setActiveImage(index);
  }

  // next image in gallery
  nextImage() {
    this.ngxImageGallery.next();
  }

  // prev image in gallery
  prevImage() {
    this.ngxImageGallery.prev();
  }

  /**************************************************/

  // EVENTS
  // callback on gallery opened
  galleryOpened(index) {
    console.info('Gallery opened at index ', index);
  }

  // callback on gallery closed
  galleryClosed() {
    console.info('Gallery closed.');
  }

  // callback on gallery image clicked
  galleryImageClicked(index) {
    console.info('Gallery image clicked with index ', index);
    this.ngxImageGallery.open(index);
  }

  // callback on gallery image changed
  galleryImageChanged(index) {
    console.info('Gallery image changed to index ', index);
  }

  // callback on user clicked delete button
  deleteImage(index) {
    console.info('Delete image at index ', index);
  }

}
