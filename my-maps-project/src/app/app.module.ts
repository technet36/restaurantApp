import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';
import {SearchFormComponent} from "./searchForm/searchForm.component";
import {HttpClientModule} from "@angular/common/http";
import {RestoService} from "./restaurant-service/restaurant-service";
import {RouterModule} from "@angular/router";
import ApplicationComponent from "./application/application.component";
import FooterComponent from "./footer/footer.component";
import AboutComponent from "./about/about.component";
import MenuBarComponent from "./menubar/menubar.component";
import RestaurantHomeComponent from "./pages-Restaurant/restaurant-home/restaurant-home.component";
import RestaurantDetailComponent from "./pages-Restaurant/restaurant-detail/restaurant-detail.component";
import RestaurantLocationComponent from "./pages-Restaurant/restaurant-location/restaurant-location.component";
import RestaurantMenuComponent from "./pages-Restaurant/restaurant-menu/restaurant-menu.component";
import ScoreComponent from "./score/score.component";
import PageNotFoundComponent from "./pagenotfound/pagenotfound.component";
import {LoggerService} from "./logger-service/logger-service";
import ReviewComponent from "./pages-Restaurant/review/review.component";
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
      { path: 'cinema/:id', component: RestaurantHomeComponent, data: {displayPrice: true}  },
      { path: 'movie/:id', component: MovieComponent, data: {displayPrice: true}  },
      { path: '**', component: PageNotFoundComponent },
      { path: 'donate', component: AboutComponent  }
    ])
  ],
  providers: [RestoService,CinemaService,LoggerService,ReviewService],
  declarations: [
    SearchFormComponent,
    ApplicationComponent,
    FooterComponent,
    AboutComponent,
    MenuBarComponent,
    RestaurantHomeComponent,
    RestaurantDetailComponent,
    RestaurantLocationComponent,
    RestaurantMenuComponent,
    ScoreComponent,
    PageNotFoundComponent,
    ReviewComponent,
    MovieComponent
  ],
  bootstrap: [ ApplicationComponent ]
})
export class AppModule {}
