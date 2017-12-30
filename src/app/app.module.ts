import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TourComponent } from './tour/tour.component';
import { DataService } from "./services/data.service";

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'om', component: AboutComponent },
  { path: 'spelplan', component: TourComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    TourComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
