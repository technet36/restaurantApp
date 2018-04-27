import {Component, OnInit} from "@angular/core";
import {Cinema, CinemaService, Movie, Showtime} from "../cinema-service/cinema-service";
import {ActivatedRoute} from "@angular/router";
import {Review, ReviewService} from "../review-service/review-service.service";

@Component({
  moduleId: module.id,
  selector:    'my-movie-page',
  templateUrl: 'movie.component.html',
  styleUrls:  ['movie.component.css'],
  providers: [CinemaService]
})
export default class MovieComponent implements OnInit {

  public theMovie: Movie;
  public imageUrl: string;
  public listReview: Array<Review>;
  public movieId:number;
  public currentReview:Review = {id_movie:0,id_cinema:0,text_review:""};
  public timetableArray ;
  public currentDayShowtimes;
  public activeDay=0;
  public userPosition = {"latitude":53.348, "longitude":-6.294};
  public cinemaList:Array<Cinema>;
  private zoomMapLvl = 10;

  constructor( private cinemaService:CinemaService, private route: ActivatedRoute, private reviewService:ReviewService) {
    this.theMovie = new Movie(0, "", "", "", [], "", "", "", "");
    this.listReview = [];
    this.currentReview.id_cinema = 0;
    this.currentReview.text_review = "";
    this.currentReview.id_movie= 0;
    this.movieId = 0;
    this.timetableArray = [[],[],[],[],[],[],[]];
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.movieId = +params['id'];   // (+) converts string 'id' to a number
      this.currentReview.id_movie = this.movieId;
      this.getReview();
      navigator.geolocation.getCurrentPosition(
        (pos)=> {
        this.userPosition.latitude = pos.coords.latitude;
        this.userPosition.longitude = pos.coords.longitude;
      });
      this.cinemaService.getMovieById(this.movieId).subscribe(theMovie=>{
        this.theMovie=theMovie;
        this.imageUrl = theMovie.image_url;
      });
      this.initShowTimeList();
    });

  }

  pushReview() : void {
    if(this.currentReview.text_review !== ""){
      this.listReview.push( {id_cinema:this.currentReview.id_cinema,id_movie:this.currentReview.id_movie,text_review:this.currentReview.text_review});
      this.reviewService.pushReview(this.currentReview.id_cinema,this.currentReview.id_movie,this.currentReview.text_review).subscribe((data)=>{
        }
      );
      //reset the empty the input
      this.currentReview.text_review = "";
    }
  }

  getReview() {
    this.reviewService.getReviewsByMovie(this.currentReview.id_movie).subscribe((data)=>{
      this.listReview = data;
    });
  }

  initShowTimeList(){

    this.cinemaService.getCinemasWithLocation().subscribe(dataCinema=>{
        let myCinema;
      this.cinemaService.getShowtimesByMovie(this.movieId).subscribe(data=>{
            let today = new Date();
            let temp =false;
            today.setHours(0,0,0,0);
            data.forEach((oneShowtime) =>{
                let myDate = new Date(oneShowtime.start_at);
                oneShowtime.start_at = myDate.getHours()+":"+(myDate.getMinutes()==0?"00":myDate.getMinutes());
                let timeStampOffset = myDate.getTime()- today.getTime();
                let dayOffset = Math.floor(timeStampOffset/(1000*60*60*24));
              oneShowtime["offset"] = (timeStampOffset / (1000 * 60 * 60 * 24) * 100 % 100)+"%";
              if(7>dayOffset && -1<dayOffset){
                this.timetableArray[dayOffset].forEach(oneDay=>{
                  if(oneDay["cinema_id"]==oneShowtime.cinema_id){
                    oneDay["showtimes"].push(oneShowtime);
                    oneDay["showtimes"].sort(MovieComponent.compareShowtime);
                    temp = true;
                  }
                });
                if (false==temp){
                  myCinema = dataCinema.find(oneCinema=>{return oneCinema.id==oneShowtime.cinema_id;});
                  this.timetableArray[dayOffset].push({"cinema_id":oneShowtime.cinema_id,"name":myCinema.name,"address_text":myCinema.address_text,"lat":myCinema.lat,"lon":myCinema.lon,"showtimes":[oneShowtime]});
                }
              }
              temp=false;
            });
            this.updateShowtimeDay(0);
        });
    });
  }

  centerMap(lat,lon){
    this.userPosition.longitude= lon;
    this.userPosition.latitude= lat;
    this.zoomMapLvl = 14;
  }

  static compareShowtime(a, b){
    return a.start_at<b.start_at?-1:1;
  }

  public updateShowtimeDay(day){
    this.activeDay = day;
    this.currentDayShowtimes = this.timetableArray[day];
  }

}
