import {Injectable} from '@angular/core';
import {GitHubApi} from '../models';
import 'rxjs/add/operator/map';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AuthorizationService} from './authorization.service';

@Injectable()
export class DataService {

  private githubApi: GitHubApi;

  constructor(private http: HttpClient, private authorizationService: AuthorizationService) {
    this.githubApi = new GitHubApi(authorizationService);
  }

  getTour(successCallback) {
    this.githubApi.getFileFromRepo('spelplan.json', successCallback);
  }

  saveTour(content, successCallback) {
    this.githubApi.writeFile('spelplan.json', content, successCallback);
  }

  getAlbums(successCallback) {
    this.githubApi.getFileFromRepo('albums.json', successCallback);
  }

  getVideos(successCallback) {
    this.githubApi.getFileFromRepo('video-artist.json', successCallback);
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
    this.githubApi.getFileFromRepo('texter.json', successCallback);
  }

  getLyric(textFile: string, successCallback, errorCallback) {
    this.githubApi.getFileFromRepo('lyrics/' + textFile, successCallback, errorCallback);
  }

  getReviews(successCallback) {
    this.githubApi.getFileFromRepo('recensioner.json', successCallback);
  }

  getPressAnnouncements(successCallback) {
    this.githubApi.getFileFromRepo('press/announcements', successCallback);
  }

  getPressImages(imagesPath: string, successCallback) {
    this.githubApi.getFileFromRepo(imagesPath, successCallback);
  }

  getPressPoster(successCallback) {
    this.githubApi.getFileFromRepo('press/affisch', successCallback);
  }

  getImageTitles(fileName: string, successCallback, errorCallback) {
    this.githubApi.getFileFromRepo(fileName, successCallback, errorCallback);
  }
}
