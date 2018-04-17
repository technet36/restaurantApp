import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {forEach} from "@angular/router/src/utils/collection";

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
    public tag: number[],
    public age_limit: string,
    public release_date: string,
    public cast: any,
    public crew:any
  ){}
}

export class Showtime {
  constructor(
    public id:number,
    public cinema_id:number,
    public movie_id:number,
    public start_at :string,
    public language:number,
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
  private headers:HttpHeaders = new HttpHeaders("X-API-Key:JtKDDYcaAhgOd8J8Jxr9TW5V5kk4kaz8");

  constructor(private http:HttpClient){
    console.log("constructor")
    //this.headers.append("country","IE");
  }

  public getCinemas():Observable<Cinema[]>{
    console.log("getCinemas");
    return new Observable<Cinema[]>((observer)=>{
      this.http.get("https://api.internationalshowtimes.com/v4/cinemas/?countries=IE",{headers:this.headers}).subscribe(
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
    console.log("getShowtimes()");
    return new Observable<Showtime[]>((observer)=>{
      this.http.get("https://api.internationalshowtimes.com/v4/showtimes/?countries=IE",{headers:this.headers}).subscribe(
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

  public getGenres():Observable<number>{
    console.log("getGenres");
    return new Observable<number>((observer)=>{
      this.http.get("https://api.internationalshowtimes.com/v4/genres/?countries=IE",{headers:this.headers}).subscribe(
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
    console.log("getMovies");
    return new Observable<Movie[]>((observer)=>{
      this.http.get("https://api.internationalshowtimes.com/v4/movies/?countries=IE",{headers:this.headers}).subscribe(
        response=>{
          let movieArray = [];
          response["movies"].forEach(function (oneMovie){
            movieArray.push(new Movie(oneMovie["id"],oneMovie["title"],oneMovie["slug"],oneMovie["poster_image_thumbnail"]))
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
/*
  public getMovieById(id):Observable<Movie>{

    console.log("getMoviesById");
    return new Observable<Movie>((observer)=>{
      this.http.get("https://api.internationalshowtimes.com/v4/movies/"+id+"?countries=IE",{headers:this.headers}).subscribe(
        response=>{
          let movieArray = [];
          response["movies"].forEach(function (oneMovie){
            movieArray.push(new Movie(oneMovie["id"],oneMovie["title"],oneMovie["slug"],oneMovie["poster_image_thumbnail"]))
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
*/
}
