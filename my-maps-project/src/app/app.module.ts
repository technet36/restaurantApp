import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';
import {SearchFormComponent} from "./searchForm/searchForm.component";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import ApplicationComponent from "./application/application.component";
import FooterComponent from "./footer/footer.component";
import AboutComponent from "./about/about.component";
import MenuBarComponent from "./menubar/menubar.component";
import CinemaHomeComponent from "./pages-Cinema/cinema-home/cinema-home.component";
import CinemaLocationComponent from "./pages-Cinema/cinema-location/cinema-location.component";
import CinemaTimetableComponent from "./pages-Cinema/cinema-timetable/cinema-timetable.component";
import ScoreComponent from "./score/score.component";
import PageNotFoundComponent from "./pagenotfound/pagenotfound.component";
import {LoggerService} from "./logger-service/logger-service";
import ReviewComponent from "./pages-Cinema/review/review.component";
import {ReviewService} from "./review-service/review-service.service";
import {CinemaService} from "./cinema-service/cinema-service";
import MovieComponent from "./page-Movie/movie.component";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAqW1hwjAN3wlnU2eD0KVm4LUPzHmPmdBM'
    }),
    RouterModule.forRoot([
      { path: '', component: SearchFormComponent },
      { path: 'cinema/:id', component: CinemaHomeComponent, data: {displayPrice: true}  },
      { path: 'movie/:id', component: MovieComponent, data: {displayPrice: true}  },
      { path: '**', component: PageNotFoundComponent },
      { path: 'donate', component: AboutComponent  }
    ])
  ],
  providers: [CinemaService,LoggerService,ReviewService],
  declarations: [
    SearchFormComponent,
    ApplicationComponent,
    FooterComponent,
    AboutComponent,
    MenuBarComponent,
    CinemaHomeComponent,
    CinemaLocationComponent,
    CinemaTimetableComponent,
    ScoreComponent,
    PageNotFoundComponent,
    ReviewComponent,
    MovieComponent
  ],
  bootstrap: [ ApplicationComponent ]
})
export class AppModule {}
