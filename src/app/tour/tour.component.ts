import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service'
import { ITour } from '../models';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html'
})
export class TourComponent implements OnInit {
  tour: ITour = {};

  constructor(private dataService: DataService) {
    this.dataService.getTour(updatedTour => { this.tour = updatedTour });
  }

  ngOnInit() {
  }

}
