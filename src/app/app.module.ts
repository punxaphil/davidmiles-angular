import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { EmbedVideo } from 'ngx-embed-video';
import { MatCardModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TourComponent } from './tour/tour.component';
import { DataService } from './services/data.service';
import { ContactComponent } from './contact/contact.component';
import { DiscographyComponent } from './discography/discography.component';
import {AuthorizationService} from './services/authorization.service';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { VideoComponent } from './video/video.component';
import { TextComponent } from './text/text.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'om', component: AboutComponent },
  { path: 'spelplan', component: TourComponent },
  { path: 'kontakt', component: ContactComponent },
  { path: 'discografi', component: DiscographyComponent },
  { path: 'video', component: VideoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'texter', component: TextComponent },
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
    VideoComponent,
    LoginComponent,
    TextComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    EmbedVideo.forRoot(),
    FormsModule,
    MatCardModule,
    BrowserAnimationsModule
  ],
  providers: [DataService, AuthorizationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
