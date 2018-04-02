import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {ITour, IGig} from '../models';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tour-edit',
  templateUrl: './tour-edit.component.html',
  styleUrls: ['./tour-edit.component.scss']
})
export class TourEditComponent implements OnInit {
  tour: String;

  constructor(private dataService: DataService, private router: Router) {
  }

  private static createTour(gigs: Array<IGig>): String {
    return gigs.map(gig => {
      return `${gig.date} ${gig.place}`;
    }).join('\n');
  }

  ngOnInit() {
    this.dataService.getTour(response => {
      this.tour = TourEditComponent.createTour(response);
    });
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
      this.dataService.saveTour(JSON.stringify(gigs, null, 2), () => {
        this.router.navigate(['spelplan']);
      });
    } catch (e) {
      console.error(e);
      window.alert('Något gick snett. Verifiera att varje rad innehåller ett korrekt datum följt av en plats.');
    }
    console.log(gigs);
  }

  cancel() {

  }

}
