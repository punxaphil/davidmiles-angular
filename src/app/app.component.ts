import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AuthorizationService} from './services/authorization.service';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean;
  opened: boolean;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(private authorizationService: AuthorizationService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.opened = !this.mobileQuery.matches;
    this._mobileQueryListener = () => {
      changeDetectorRef.detectChanges();
      this.opened = !this.mobileQuery.matches;
    };
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.isLoggedIn = this.authorizationService.isLoggedIn();
    this.authorizationService.loggedInUpdated.subscribe((loggedIn: boolean) => this.isLoggedIn = loggedIn
    );
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
