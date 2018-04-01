import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ITour, IGig } from '../models';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {
  tour: ITour;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getTour(response => {
      const gigs: Array<IGig> = response;
      this.tour = this.createTour(gigs);
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
      const diff = this.dayDiff(now, first.dateObject);
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

  dayDiff(first: Date, second: Date): number {
    return Math.round((second.getTime() - first.getTime()) / (1000 * 60 * 60 * 24));
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
