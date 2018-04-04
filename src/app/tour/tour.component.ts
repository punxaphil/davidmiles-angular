import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {ITour, IGig} from '../models';
import {AuthorizationService} from '../services/authorization.service';
import {TourEditComponent} from '../tour-edit/tour-edit.component';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {
  tour: ITour;
  isLoggedIn: boolean;

  static dayDiff(first: Date, second: Date): number {
    return Math.round((second.getTime() - first.getTime()) / (1000 * 60 * 60 * 24));
  }

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    const savedContent = localStorage.getItem(TourEditComponent.SAVED_TOUR_CONTENT);
    if (savedContent) {
      this.tour = this.createTour(JSON.parse(savedContent));
    } else {
      this.dataService.getTour(response => {
        this.tour = this.createTour(JSON.parse(response.data));
      });
    }
    this.isLoggedIn = AuthorizationService.isLoggedIn();
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
      const diff = TourComponent.dayDiff(now, first.dateObject);
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
