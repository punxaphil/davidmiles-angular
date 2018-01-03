import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { EmbedVideo } from 'ngx-embed-video';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TourComponent } from './tour/tour.component';
import { DataService } from "./services/data.service";
import { ContactComponent } from './contact/contact.component';
import { DiscographyComponent } from './discography/discography.component';
import { VideoComponent } from './video/video.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'om', component: AboutComponent },
  { path: 'spelplan', component: TourComponent },
  { path: 'kontakt', component: ContactComponent },
  { path: 'discografi', component: DiscographyComponent },
  { path: 'video', component: VideoComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    TourComponent,
    ContactComponent,
    DiscographyComponent,
    VideoComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    EmbedVideo.forRoot()
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
