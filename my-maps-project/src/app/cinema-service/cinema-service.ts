import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {forEach} from "@angular/router/src/utils/collection";
import {isNumber, isString} from "util";

export class Cinema {
  constructor(
    public id: number,
    public name: string,
    public website: string,
    public lat: number,
    public lon: number,
    public address_text: string,
    public booking_type: string
  ){}
}

export class Movie {
  constructor(
    public id: number,
    public name:string,
    public synopsis:string,
    public image_url: string,
    public tag: any[],
    public age_limit: string,
    public release_date: string,
    public cast: any,
    public crew:any
  ){}
}

export class Showtime {
  constructor(
    public id:String,
    public cinema_id:number,
    public movie_id:number,
    public start_at :string,
    public language:string,
    public auditorium: string,
    public booking_type:string,
    public is_3d:boolean
  ){}
}

export class Genres {
  constructor(
    public id:number,
    public name:string
  ){}
}

@Injectable()
export class CinemaService {
  private headers:HttpHeaders = new HttpHeaders("X-API-Key:N7SSIfbqnaL85YyniFO6zytSyXhNnao5");
  private userPosition = {"latitude":53.348, "longitude":-6.294};

  constructor(private http:HttpClient){
    //https://api.internationalshowtimes.com/v4/cinemas/?countries=IE&lang=en&location=53.34,-6.31
    //this.headers.append("country","IE");
    navigator.geolocation.getCurrentPosition(
      (pos)=> {
        this.userPosition.latitude = pos.coords.latitude;
        this.userPosition.longitude = pos.coords.longitude;
      });
  }

  public getCinemas():Observable<Cinema[]>{
    return new Observable<Cinema[]>((observer)=>{
      this.http.get("https://api.internationalshowtimes.com/v4/cinemas/?countries=IE&lang=en",{headers:this.headers}).subscribe(
        response=>{
          let cinemasArray = [];
          response["cinemas"].forEach(function (oneCinema) {
            cinemasArray.push(new Cinema(oneCinema["id"],oneCinema["name"],oneCinema["website"],oneCinema["location"]["lat"],oneCinema["location"]["lon"],oneCinema["location"]["address"]["display_text"],oneCinema["booking_type"],))
          });
          observer.next(cinemasArray);
          observer.complete();
        },()=>{
          console.log("error getCinemas()");
          observer.error([])
        }
      )
    })
  }

  public getCinemasWithLocation():Observable<Cinema[]>{
    return new Observable<Cinema[]>((observer)=>{
      this.http.get("https://api.internationalshowtimes.com/v4/cinemas/?countries=IE&lang=en&location="+this.userPosition.latitude+","+this.userPosition.longitude,{headers:this.headers}).subscribe(
        response=>{
          let cinemasArray = [];
          response["cinemas"].forEach(function (oneCinema) {
            cinemasArray.push(new Cinema(oneCinema["id"],oneCinema["name"],oneCinema["website"],oneCinema["location"]["lat"],oneCinema["location"]["lon"],oneCinema["location"]["address"]["display_text"],oneCinema["booking_type"],))
          });
          observer.next(cinemasArray);
          observer.complete();
        },()=>{
          console.log("error getCinemas()");
          observer.error([])
        }
      )
    })
  }

  public getShowtimes():Observable<Showtime[]>{
    return new Observable<Showtime[]>((observer)=>{
      this.http.get("https://api.internationalshowtimes.com/v4/showtimes/?countries=IE&lang=en",{headers:this.headers}).subscribe(
        response=>{
          let showtimesArray = [];
          response["showtimes"].forEach(function (oneShowtime) {
            showtimesArray.push(new Showtime(oneShowtime["id"],oneShowtime["cinema_id"],oneShowtime["movie_id"],
                oneShowtime["start_at"],oneShowtime["language"],oneShowtime["auditorium"],oneShowtime["booking_type"],oneShowtime["is_3d"]))
          });
          observer.next(showtimesArray);
          observer.complete();
        },()=>{
          console.log("error getShowtimes()");
          observer.error([])
        }
      )
    })
  }

  public getShowtimesByMovie(movieId):Observable<Showtime[]>{
    return new Observable<Showtime[]>((observer)=>{
      this.http.get("https://api.internationalshowtimes.com/v4/showtimes/?countries=IE&lang=en&movie_id="+movieId+"&location="+this.userPosition.latitude+","+this.userPosition.longitude,{headers:this.headers}).subscribe(
        response=>{
          let showtimesArray = [];
          response["showtimes"].forEach(function (oneShowtime) {
            showtimesArray.push(new Showtime(oneShowtime["id"],oneShowtime["cinema_id"],oneShowtime["movie_id"],
                oneShowtime["start_at"],oneShowtime["language"],oneShowtime["auditorium"],oneShowtime["booking_type"],oneShowtime["is_3d"]))
          });
          observer.next(showtimesArray);
          observer.complete();
        },()=>{
          console.log("error getShowtimes()");
          observer.error([])
        }
      )
    })
  }

  public getGenres():Observable<Genres[]>{
    return new Observable<Genres[]>((observer)=>{
      this.http.get("https://api.internationalshowtimes.com/v4/genres/?countries=IE&lang=en",{headers:this.headers}).subscribe(
        response=>{
          observer.next(response["genres"]);
          observer.complete();
        },()=>{
          console.log("error");
          observer.error([])
        }
      )
    })
  }

  public getMovies():Observable<Movie[]>{
    return new Observable<Movie[]>((observer)=>{
      this.http.get("https://api.internationalshowtimes.com/v4/movies/?countries=IE&lang=en",{headers:this.headers}).subscribe(
        response=>{
          let movieArray = [];
          response["movies"].forEach(function (oneMovie){
            movieArray.push(new Movie(oneMovie["id"],oneMovie["title"],oneMovie["slug"],oneMovie["poster_image_thumbnail"],null,null,null, null, null))
          });
          observer.next(movieArray);
          observer.complete();
        },()=>{
          console.log("error");
          observer.error([])
        }
      )
    })
  }

  public getMovieById(id):Observable<Movie>{

    return new Observable<Movie>((observer)=>{
      this.http.get("https://api.internationalshowtimes.com/v4/movies/"+id+"?countries=IE&lang=en",{headers:this.headers}).subscribe(
        response=>{
          console.log(response);
          let myMovie = new Movie(
            response["movie"]["id"],
            response["movie"]["title"],
            response["movie"]["synopsis"],
            response["movie"]["poster_image_thumbnail"],
            response["movie"]["genres"],
            response["movie"]["age_limits"]['IE'],
            response["movie"]["release_dates"]["IE"][0]["date"],
            response["movie"]["cast"],
            response["movie"]["crew"],
            );
          observer.next(myMovie);
          observer.complete();
        },()=>{
          console.log("error");
          observer.error([])
        }
      )
    })
  }

  public getMoviesByGenreId(id):Observable<Movie[]>{
    let url = "https://api.internationalshowtimes.com/v4/movies/?countries=IE&lang=en";
    if(id=="no"){
      url += "";
    }else if (isNumber(id)){
      url += "&search_query="+id+"&search_field=genre";
    }else if(isString(id)){
      url += "&search_query="+id+"&search_field=title";
    }
    let moviesArray:Movie[]=[];
    return new Observable<Movie[]>((observer)=>{
      this.http.get(url,{headers:this.headers}).subscribe(response=>{
          response["movies"].forEach((oneMovie)=>{
            moviesArray.push(new Movie(
              oneMovie["id"],
              oneMovie["title"],
              "",
              oneMovie["poster_image_thumbnail"],
              [],
              "",
              "",
              "",
              ""
            ));
          });
          observer.next(moviesArray);
          observer.complete();
        },()=>{
          console.log("error");
          observer.error([])
        }
      )
    })
  }

  getCinemaById(id: number):Observable<Cinema> {

    return new Observable((monObserver)=>{
      this.http.get("https://api.internationalshowtimes.com/v4/cinemas/" + id + "?countries=IE" ,{headers:this.headers}).subscribe(
        Partcin=>{
          let Fullcin:Cinema= new Cinema(
            Partcin["cinema"]["id"],
            Partcin["cinema"]["name"],
            Partcin["cinema"]["website"],
            Partcin["cinema"]["location"]["lat"],
            Partcin["cinema"]["location"]["lon"],
            Partcin["cinema"]["location"]["address"]["display_text"],
            Partcin["cinema"]["booking_type"]);
          monObserver.next(Fullcin);
          monObserver.complete();
        },()=>{
          monObserver.error([]);
        });
    });
  }
}
