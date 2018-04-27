import {Component, Input, OnInit} from '@angular/core';
import {Cinema, CinemaService, Movie, Showtime} from '../../cinema-service/cinema-service';
import {ActivatedRoute} from "@angular/router";
import MovieComponent from "../../page-Movie/movie.component";
@Component({
    moduleId:     module.id,
    selector:    'osl-restaurant-menu',
    templateUrl: 'cinema-timetable.component.html',
    styleUrls:  ['cinema-timetable.component.css'],
})
export default class RestaurantMenuComponent implements OnInit {
    @Input() cnma: Cinema;
    show: Showtime;
    imageUrl: string;
    subscriberParams: any;
    timetableArray: any;
    activeDay =0;
    currentDayShowtimes = [];

    constructor(private CnmaService: CinemaService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.show = new Showtime("", 0, 0, "", null, "", "", null);
    this.timetableArray=[[],[],[],[],[],[],[]];//an array containing an array for each 7 next days
    this.subscriberParams = this.route.params.subscribe(params => {
      let id: number = +params['id'];   // (+) converts string 'id' to a number
      this.CnmaService.getShowtimeById(id).subscribe(Fullshow => {
        this.initShtmArray(Fullshow);
      });
    });
  }

  initShtmArray(allShtm:Showtime[]){

    this.CnmaService.getMovies().subscribe(dataMovies=>{
      let myMovie:Movie;
      let today = new Date();
      let temp =false;
      today.setHours(0,0,0,0);
      allShtm.forEach((oneShowtime) =>{
        let myDate = new Date(oneShowtime.start_at);
        oneShowtime.start_at = myDate.getHours()+":"+(myDate.getMinutes()==0?"00":myDate.getMinutes());
        let timeStampOffset = myDate.getTime()- today.getTime();
        let dayOffset = Math.floor(timeStampOffset/(1000*60*60*24));
        oneShowtime["offset"] = (timeStampOffset / (1000 * 60 * 60 * 24) * 100 % 100)+"%";

        if(7>dayOffset && -1<dayOffset){
          this.timetableArray[dayOffset].forEach(oneDay=>{
            if(oneDay["movie_id"]==oneShowtime.movie_id){
              oneDay["showtimes"].push(oneShowtime);
              oneDay["showtimes"].sort(MovieComponent.compareShowtime);
              temp = true;
            }
          });
          if (false==temp){
            myMovie = dataMovies.find(theMovie=>{return theMovie.id==oneShowtime.movie_id;});
            if(typeof myMovie !== "undefined"){
              this.timetableArray[dayOffset].push({"movie_id":oneShowtime.movie_id,"name":myMovie.name,"tag":myMovie.tag,"showtimes":[oneShowtime]});
            }
          }
        }
        temp=false;
      });
      this.updateShowtimeDay(0);
    });
  }


  public updateShowtimeDay(day){
    this.activeDay = day;
    this.currentDayShowtimes = this.timetableArray[day];
  }

}
