import {Injectable} from '@angular/core';
import {IGig, ITour, IAlbum} from '../models';
import 'rxjs/add/operator/map';
import * as GitHub from 'github-api';
import { Http, RequestOptions, URLSearchParams } from "@angular/http";

@Injectable()
export class DataService {
  private gh: GitHub;
  private repo: any;
  constructor(private http: Http) {
    this.gh = new GitHub();
    this.repo = this.gh.getRepo('johanfrick', 'davidmiles-angular');
  }

  static dayDiff(first: Date, second: Date): number {
    return (second.getTime() - first.getTime()) / (1000 * 60 * 60 * 24);
  }
  getTour(callback) {
    this.repo.getContents('data', 'spelplan.json', true)
      .then(value => {
        const gigs: Array<IGig> = value.data;
        const tour = this.createTour(gigs);
        callback(tour);
      }, reason => {
        console.error(reason);
        callback({});
      });
  }

  private createTour(gigs: Array<IGig>) {
    const upcomingGigs: Array<IGig> = [];
    const historyGigs: Array<IGig> = [];
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    gigs.forEach(gig => {
      gig.dateObject = new Date(gig.date);
      gig.dateObject.setHours(0, 0, 0, 0);
      if (now <= gig.dateObject) {
        upcomingGigs.push(gig);
      } else {
        historyGigs.unshift(gig);
      }
    });
    const first = upcomingGigs[0];
    if (first) {
      const diff = DataService.dayDiff(now, first.dateObject);
      if (diff === 0) {
        first.distance = 'är idag!';
      } else {
        first.distance = 'är om ' + diff + ' dagar';
      }
    }
    const tour: ITour = {};
    tour.upcomingGigs = this.orderByArray(upcomingGigs, 'dateObject');
    tour.historyGigs = this.orderByArray(historyGigs, 'dateObject');
    tour.firstGig = first;
    tour.hasUpcomingGigs = upcomingGigs.length > 0;
    return tour;
  }

  orderByArray(values: any[], orderType: any) {
    return values.sort((a, b) => {
      if (a[orderType] < b[orderType]) {
        return -1;
      }
      if (a[orderType] > b[orderType]) {
        return 1;
      }
      return 0;
    });
  }

  getAlbums(callback) {
    this.repo.getContents('data', 'albums.json', true)
      .then(value => {
        const albums: Array<IAlbum> = value.data;
        callback(albums);
      }, reason => {
        console.error(reason);
        callback({});
      });
  }

  getVideos(callback) {
    this.repo.getContents('data', 'video-artist.json', true)
      .then(value => {
        const videos: Array<string> = value.data;
        callback(videos);
      }, reason => {
        console.error(reason);
        callback({});
      });
  }

  getYouTubeVideoTitle(id: string, callback) {
    let apiKey = 'AIzaSyBKplqq_V9dmIO1y8oD73kaj5rwnRSS_d4';
    let params: URLSearchParams = new URLSearchParams();
    params.set('key', apiKey);
    params.set('id', id);
    params.set('part', 'snippet');
    let requestOptions = new RequestOptions();
    requestOptions.search = params;

    this.http.get('https://www.googleapis.com/youtube/v3/videos?', requestOptions)
      .toPromise()
      .then(response => callback(response.json().items[0].snippet.title));
  }
}
