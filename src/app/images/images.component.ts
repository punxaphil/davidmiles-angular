import { Component, ViewChild, OnInit, Input} from '@angular/core';
import {DEMO_GALLERY_CONF_INLINE, DEMO_GALLERY_IMAGE} from './config';
import { GALLERY_CONF, GALLERY_IMAGE, NgxImageGalleryComponent } from 'ngx-image-gallery';
import { DataService } from '../services/data.service';

@Component({
  selector: 'images-component',
  templateUrl: 'images.component.html',
  styleUrls: ['images.component.css']
})
export class ImagesComponent implements OnInit {
  @Input() imagesPath = "";
  @Input() showThumbnails: boolean;
  public showConf = false;

  @ViewChild('ngxImageGallery') ngxImageGallery: NgxImageGalleryComponent;

  title = 'Bilder';

  // gallery configuration
  conf: GALLERY_CONF = DEMO_GALLERY_CONF_INLINE;

  // gallery images
  images: GALLERY_IMAGE[] = [];

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getPressImages(this.imagesPath, images => {
            let tempImages = images;
            tempImages.forEach(x => {
                if (!x.path.match("/thumb")) {
                    var filename = x.download_url.substr(x.download_url.lastIndexOf('/') + 1);
                    let image: GALLERY_IMAGE =
                    {
                        url: x.download_url,
                        altText: x.name,
                        thumbnailUrl: this.showThumbnails ? x.download_url.substr(0, x.download_url.lastIndexOf('/')) + "/thumb/" + filename : x.download_url
                    };
                    this.images.push(image);

                }

            });
            this.openGallery(0);
        });
    }

  openGallery(index: number = 0) {
     this.ngxImageGallery.open(index);
  }

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
  // callback on gallery opened
  galleryOpened(index) {
  }

  // callback on gallery closed
  galleryClosed() {
  }

  // callback on gallery image clicked
  galleryImageClicked(index) {
    let image = this.images[index];
    var element = document.createElement('a');
    element.setAttribute('href', image.url);
    element.setAttribute('target', '_blank');
    element.setAttribute('download', image.altText);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
  }

  // callback on gallery image changed
  galleryImageChanged(index) {
  }

  // callback on user clicked delete button
  deleteImage(index) {
  }
}