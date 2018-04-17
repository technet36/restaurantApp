import {Component, OnInit} from "@angular/core";
import {CinemaService} from "../cinema-service/cinema-service";

@Component({
  moduleId: module.id,
  selector:    'my-movie-page',
  templateUrl: 'movie.component.html',
  styleUrls:  ['movie.component.css'],
  providers: [CinemaService]
})
export default class MovieComponent implements OnInit {
  ngOnInit(): void {
  }

}
