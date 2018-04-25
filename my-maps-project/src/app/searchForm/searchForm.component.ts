import {Component, OnInit} from '@angular/core';
import {Cinema, CinemaService, Genres, Movie} from "../cinema-service/cinema-service";
import {isNumber} from "util";

@Component({
    moduleId: module.id,
    selector: 'my-form',
    templateUrl: 'searchForm.component.html',
    styleUrls:['searchForm.component.css']

})
export class SearchFormComponent implements OnInit {
    sortDirect:number;
    initPos;
    allCinemas: Cinema[];
    allMovies: Movie[];
    displayedMovies: Movie[];
    genreList:Genres[];
    inputMovie: string;
    inputGenre;

    constructor( private cinemaService:CinemaService) {
        this.allCinemas = [];
        this.allMovies = [];
        this.displayedMovies=[];
        this.initPos = {lng:0,lat:0};
        if(window.navigator.geolocation){
          window.navigator.geolocation.getCurrentPosition((pos)=> {
            this.initPos.lat = pos.coords.latitude;
            this.initPos.lng = pos.coords.longitude;
          });
        }

        cinemaService.getCinemas().subscribe(response=>{
          this.allCinemas = response;
        });
        cinemaService.getMovies().subscribe(response=>{
          this.allMovies=response;
          this.displayedMovies = response;
        });
        cinemaService.getGenres().subscribe(response=>{
          this.genreList = response;
        });

        this.sortDirect=1;
        this.inputMovie = "";
    }

    ngOnInit(): void {
        //TableComponent.
    }

  getResult() {
    let request_query;
    if (null==this.inputGenre) this.inputGenre = "no";
    request_query = this.inputMovie != "" ? this.inputMovie : this.inputGenre;

    this.cinemaService.getMoviesByGenreId(request_query).subscribe(response=>{
      this.displayedMovies = response;

    });
  }
}
