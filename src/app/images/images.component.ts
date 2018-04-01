import {Component, ViewChild, OnInit, Input} from '@angular/core';
import {DEMO_GALLERY_CONF_INLINE} from './config';
import {GALLERY_CONF, GALLERY_IMAGE, NgxImageGalleryComponent} from 'ngx-image-gallery';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-images-component',
  templateUrl: 'images.component.html',
  styleUrls: ['images.component.css']
})
export class ImagesComponent implements OnInit {
  @Input() imagesPath = '';
  @Input() showThumbnails: boolean;
  public showConf = false;

  @ViewChild('ngxImageGallery') ngxImageGallery: NgxImageGalleryComponent;

  title = 'Bilder';

  // gallery configuration
  conf: GALLERY_CONF = DEMO_GALLERY_CONF_INLINE;

  // gallery images
  images: GALLERY_IMAGE[] = [];
  imagesTitles;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getImageTitles("img/artist/artist-bilder.json", titles => {
      this.imagesTitles = titles;
      this.initGallery();
    }, errors => {
      console.log(errors);
      this.initGallery();
    });
  }

  initGallery() {
    this.dataService.getPressImages(this.imagesPath, images => {
      images.forEach(x => {
        if (!x.path.match('/thumb')) {
          const lastIndexOfSlash = x.download_url.lastIndexOf('/');
          const filename = x.download_url.substr(lastIndexOfSlash + 1);
          let title;
          this.imagesTitles.forEach(y => {
            if (y.url === x.path) {
              title = y.text;
            }
          });
          const image: GALLERY_IMAGE = {
            url: x.download_url,
            altText: x.name,
            title: title,
            thumbnailUrl: x.download_url.substr(0, lastIndexOfSlash) + '/thumb/' + filename
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
    const image = this.images[index];
    const element = document.createElement('a');
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
