import { Component } from '@angular/core';
import { DataService } from '../services/data.service'
import { IReview } from '../models';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent  {

  reviews: Array<IReview>;

  constructor(private dataService: DataService) {
    this.dataService.getReviews(response => {
      this.reviews = response;
      this.reviews.forEach(review => {
        review.hasImage = review.albumImage !== undefined;
      });
      console.log(response);
    });
  }

}
