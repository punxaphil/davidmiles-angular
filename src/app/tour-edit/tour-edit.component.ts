import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {IGig} from '../models';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tour-edit',
  templateUrl: './tour-edit.component.html',
  styleUrls: ['./tour-edit.component.scss']
})
export class TourEditComponent implements OnInit {
  public static SAVED_TOUR_CONTENT = 'savedTourContent';
  public static SAVED_TOUR_SHA = 'savedTourSha';
  tour: String;
  private tourOriginal: any;

  constructor(private dataService: DataService, private router: Router) {
  }

  private static createTour(gigs: Array<IGig>): String {
    return gigs.map(gig => {
      return `${gig.date} ${gig.place}`;
    }).join('\n');
  }

  ngOnInit() {
    const savedContent = localStorage.getItem(TourEditComponent.SAVED_TOUR_CONTENT);
    if (savedContent) {
      const savedSha = localStorage.getItem(TourEditComponent.SAVED_TOUR_SHA);
      localStorage.removeItem(TourEditComponent.SAVED_TOUR_CONTENT);
      localStorage.removeItem(TourEditComponent.SAVED_TOUR_SHA);
      this.tourOriginal = {data: savedContent, sha: savedSha};
      this.tour = TourEditComponent.createTour(JSON.parse(savedContent));
    } else {
      this.dataService.getTour((data, sha) => {
        this.tourOriginal = {data, sha};
        this.tour = TourEditComponent.createTour(data);
      });
    }
  }

  save() {
    let gigs: Array<IGig>;
    try {
      gigs = this.tour.split('\n').map(line => {
        let gig: IGig;
        const regexp = /(\d\d\d\d-\d\d-\d\d) (.+)/g;
        const matches = regexp.exec(line);
        gig = {
          date: matches[1],
          place: matches[2]
        };
        return gig;
      });
      this.dataService.saveTour(JSON.stringify(gigs, null, 2), this.tourOriginal, (content, sha) => {
        localStorage.setItem(TourEditComponent.SAVED_TOUR_CONTENT, content);
        localStorage.setItem(TourEditComponent.SAVED_TOUR_SHA, sha);
        this.router.navigate(['spelplan']);
      });
    } catch (e) {
      console.error(e);
      window.alert('Något gick snett. Verifiera att varje rad innehåller ett korrekt datum följt av en plats.');
    }
    console.log(gigs);
  }

  cancel() {
    this.router.navigate(['spelplan']);
  }

}
