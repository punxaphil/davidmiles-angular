import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service'
import { EmbedVideoService } from 'ngx-embed-video';
import { IVideo } from '../models';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  videosIds: Array<string>;
  videos: Array<IVideo>;
  test: string;
  constructor(private dataService: DataService, private embedService: EmbedVideoService) {
    this.dataService.getVideos(videos => {
      this.videosIds = videos;
      this.videos = new Array<IVideo>();
      this.videosIds.forEach(videoId => {
        let v: IVideo = {};
        v.youtubeHtml = this.embedService.embed_youtube(videoId,  { query: {autoplay:1 }, attr: { width: 320, height: 180 } });
        this.dataService.getYouTubeVideoTitle(videoId,
          title => {
            v.title = title;
          });
        this.embedService.embed_image('https://www.youtube.com/watch?v=' + videoId, { image: 'mqdefault' })
        .then(response => {
            v.image = response.link;
          }, error => {
            console.error(error);
          });
        this.videos.push(v);
      });
    });
  }

  ngOnInit() {
  }

  showVideo(event, video: IVideo) {
    video.innerHtml = video.youtubeHtml;
  }
}
