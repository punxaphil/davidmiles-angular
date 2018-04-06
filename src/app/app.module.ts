import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {EmbedVideo} from 'ngx-embed-video';
import {MatButtonModule, MatCardModule, MatInputModule, MatListModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {LayoutModule} from '@angular/cdk/layout';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {TourComponent} from './tour/tour.component';
import {TourEditComponent} from './tour-edit/tour-edit.component';
import {DataService} from './services/data.service';
import {ContactComponent} from './contact/contact.component';
import {DiscographyComponent} from './discography/discography.component';
import {AuthorizationService} from './services/authorization.service';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import {VideoComponent} from './video/video.component';
import {TextComponent} from './text/text.component';
import {ReviewsComponent} from './reviews/reviews.component';
import {PressComponent} from './press/press.component';
import {ArtistImagesComponent} from './artist-images/artist-images.component';
import {ImagesComponent} from './images/images.component';
import {TroubadourReferencesComponent} from './troubadour-references/troubadour-references.component';
import {KeysPipe} from './pipe/keys.pipe';
import {NgxImageGalleryModule} from 'ngx-image-gallery';
import {FlexLayoutModule} from '@angular/flex-layout';
import { TroubadourImagesComponent } from './troubadour-images/troubadour-images.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'om', component: AboutComponent},
  {path: 'spelplan', component: TourComponent},
  {path: 'spelplan-redigera', component: TourEditComponent},
  {path: 'kontakt', component: ContactComponent},
  {path: 'discografi', component: DiscographyComponent},
  {path: 'video', component: VideoComponent},
  {path: 'login', component: LoginComponent},
  {path: 'texter', component: TextComponent},
  {path: 'recensioner', component: ReviewsComponent},
  {path: 'press', component: PressComponent},
  {path: 'artist-bilder', component: ArtistImagesComponent},
  {path: 'trubadur-referenser', component: TroubadourReferencesComponent },
  {path: 'trubadur-bilder', component: TroubadourImagesComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    TourComponent,
    TourEditComponent,
    ContactComponent,
    DiscographyComponent,
    VideoComponent,
    LoginComponent,
    TextComponent,
    ReviewsComponent,
    PressComponent,
    KeysPipe,
    ArtistImagesComponent,
    TroubadourReferencesComponent,
    ImagesComponent,
    TroubadourImagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    EmbedVideo.forRoot(),
    FormsModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    LayoutModule,
    NgxImageGalleryModule,
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    BrowserAnimationsModule
  ],
  providers: [DataService, AuthorizationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
