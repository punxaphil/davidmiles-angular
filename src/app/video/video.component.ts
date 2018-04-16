import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { EmbedVideoService } from 'ngx-embed-video';
import { IVideo } from '../models';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  videosIds: Array<string>;
  videos: Array<IVideo>;
  constructor(private dataService: DataService, private embedService: EmbedVideoService) {}

  ngOnInit() {
    this.dataService.getVideos(videos => {
      this.videosIds = videos;
      this.videos = [];
      this.videosIds.forEach(videoId => {
        const v: IVideo = {};
        v.youtubeHtml = this.embedService.embed_youtube(videoId, { query: { autoplay: 1 }, attr: { width: '100%', height: 180 } });
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

  showVideo(event, video: IVideo) {
    video.innerHtml = video.youtubeHtml;
  }
}
