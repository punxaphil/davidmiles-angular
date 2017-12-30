import { Injectable } from '@angular/core';
import { Http, Response  } from '@angular/http';
import { IGig, ITour } from '../models';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  
  private upcomingGigs: Array<IGig> = [];
  private historyGigs: Array<IGig> = [];
  private text: string;

  constructor(private http: Http) {
  }

  getTour(callback) {

    this.http.get('assets/txt/spelplan.txt').subscribe(data => {
      this.upcomingGigs = new Array<IGig>();
      this.historyGigs = new Array<IGig>();
      var now = new Date();
      now.setHours(0, 0, 0, 0);
      var gigLines = data.text();
      gigLines.split('\n').forEach(line => {
        var gig: IGig = {};
        gig.date = this.parseDate(line);
        if (gig.date) {
          gig.place = line.replace(gig.date, '');
          gig.dateObject = new Date(gig.date);
          gig.dateObject.setHours(0, 0, 0, 0);
          if (now <= gig.dateObject) {
            this.upcomingGigs.push(gig);
          } else {
            this.historyGigs.unshift(gig);
          }
        }
      });
      let first = this.upcomingGigs[0];
      if (first) {
        var diff = this.dayDiff(now, first.dateObject);
        if (diff === 0) {
          first.distance = 'är idag!';
        } else {
          first.distance = 'är om ' + diff + ' dagar';
        }
      }
      const tour: ITour = {};
      tour.upcomingGigs = this.orderByArray(this.upcomingGigs, "dateObject");
      tour.historyGigs = this.orderByArray(this.historyGigs, "dateObject");
      tour.firstGig = first;
      tour.hasUpcomingGigs = this.upcomingGigs.length > 0;
      callback(tour);
    });
  }

  dayDiff(first: Date, second: Date): number {
    return (second.getTime() - first.getTime()) / (1000 * 60 * 60 * 24);
  }

  parseDate(line: string): string {
    const matches = line.match(/\d\d\d\d-\d\d-\d\d( \d\d?:\d\d)?/);
    if (matches && matches.length) {
      const gig = {};
      return matches[0];
    }
    return undefined;
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

  getPodCast() {
    return this.http.get('assets/json/podcast.json').map((res: Response) =>res.json());
  }
}
