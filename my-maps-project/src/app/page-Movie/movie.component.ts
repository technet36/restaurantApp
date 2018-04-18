import {Component, OnInit} from "@angular/core";
import {CinemaService, Movie} from "../cinema-service/cinema-service";
import {ActivatedRoute} from "@angular/router";

@Component({
  moduleId: module.id,
  selector:    'my-movie-page',
  templateUrl: 'movie.component.html',
  styleUrls:  ['movie.component.css'],
  providers: [CinemaService]
})
export default class MovieComponent implements OnInit {
  private theMovie: Movie;
  private imageUrl: string;

  constructor( private cinemaService:CinemaService, private route: ActivatedRoute) {
    console.log("movie");
    this.theMovie = new Movie(0, "", "", "", [], "", "", "", "");
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id: number = +params['id'];   // (+) converts string 'id' to a number
      this.cinemaService.getMovieById(id).subscribe(theMovie=>{
        console.log("theMovie");
        console.log(theMovie);
        this.theMovie=theMovie;
        this.imageUrl = theMovie.image_url;
      });
    });

  }

}
