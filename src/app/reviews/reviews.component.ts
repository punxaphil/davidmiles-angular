import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { IReview } from '../models';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  reviews: Array<IReview>;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getReviews(response => {
      this.reviews = response;
      this.reviews.forEach(review => {
        review.hasImage = review.albumImage !== undefined;
      });
    });
  }
}
