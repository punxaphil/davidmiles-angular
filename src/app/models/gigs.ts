export interface IGig {
  date?: string;
  dateObject?: Date;
  place?: string;
  distance?: string;
}

export interface ITour {
  upcomingGigs?: Array<IGig>[];
  historyGigs?: Array<IGig>[];
  firstGig?: IGig;
}
