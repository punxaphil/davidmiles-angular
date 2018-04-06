import {Injectable} from '@angular/core';
import {GitHubApi} from '../models';
import 'rxjs/add/operator/map';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AuthorizationService} from './authorization.service';
import { HttpModule } from '@angular/http';

@Injectable()
export class DataService {

  private githubApi: GitHubApi;

  constructor(private http: HttpClient, private authorizationService: AuthorizationService) {
    this.githubApi = new GitHubApi(authorizationService);
  }

  getTour(successCallback) {
    this.githubApi.getJsonFileFromRepo('spelplan.json', successCallback);
  }

  saveTour(content, original, successCallback) {
    this.githubApi.writeFile('spelplan.json', content, original, successCallback);
  }

  getAlbums(successCallback) {
    this.githubApi.getJsonFileFromRepo('albums.json', successCallback);
  }

  getVideos(successCallback) {
    this.githubApi.getJsonFileFromRepo('video-artist.json', successCallback);
  }

  getYouTubeVideoTitle(id: string, callback) {
    const apiKey = 'AIzaSyBKplqq_V9dmIO1y8oD73kaj5rwnRSS_d4';

    const params = new HttpParams()
      .set('key', apiKey)
      .set('id', id)
      .set('part', 'snippet');

    this.http.get('https://www.googleapis.com/youtube/v3/videos?', {params: params})
      .toPromise()
      .then(response => {
        callback(response['items'][0].snippet.title);
      })
      .catch(error => {
        console.error(error);
      });
  }

  getLyrics(successCallback) {
    this.githubApi.getJsonFileFromRepo('texter.json', successCallback);
  }

  getLyric(textFile: string, successCallback, errorCallback) {
    this.githubApi.getTxtFileFromRepo('lyrics/' + textFile, successCallback, errorCallback);
  }

  getReviews(successCallback) {
    this.githubApi.getJsonFileFromRepo('recensioner.json', successCallback);
  }

  getPressAnnouncements(successCallback) {
    this.githubApi.getJsonFileFromRepo('press/announcements', successCallback);
  }

  getPressImages(imagesPath: string, successCallback) {
    this.githubApi.getJsonFileFromRepo(imagesPath, successCallback);
  }

  getPressPoster(successCallback) {
    this.githubApi.getJsonFileFromRepo('press/affisch', successCallback);
  }

  getImageTitles(fileName: string, successCallback, errorCallback) {
    this.githubApi.getJsonFileFromRepo(fileName, successCallback, errorCallback);
  }
}
