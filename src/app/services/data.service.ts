import {Injectable} from '@angular/core';
import {IGig, ITour} from '../models';
import 'rxjs/add/operator/map';
import * as GitHub from 'github-api';

@Injectable()
export class DataService {
  private gh: GitHub;

  constructor() {
    this.gh = new GitHub();
  }

  static dayDiff(first: Date, second: Date): number {
    return (second.getTime() - first.getTime()) / (1000 * 60 * 60 * 24);
  }
  getTour(callback) {
    const repo = this.gh.getRepo('johanfrick', 'davidmiles-angular');
    repo.getContents('data', 'spelplan.json', true)
      .then(value => {
        const gigs: Array<IGig> = value.data;
        const tour = this.createTour(gigs);
        callback(tour);
      }, reason => {
        console.error(reason); // Error!
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
}
