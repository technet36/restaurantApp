import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";

export class Resto {
    constructor(
        public id: number,
        public name: string,
        public lat: number,
        public long: number,
        public address: string,
        public city: string,
        public tag: Array<string>,
        public menu: Array<Array<string>>,
        public menuUrl: string,
        public averagePrice: number,
        public averageScore: number,
        public openingHours:Array<string>,
        public facilities:string) {}
}
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
    public slug:string,
    public image_url: string
  ){}
}
export class Showtime {
  constructor(
    public cinema_id:number,
    public movie_id:number,
    public start_at :string,
    public language:number,
    public auditorium: string,
    public booking_type:string,
    public is_3d:boolean
  ){}
}

@Injectable()
export class RestoService {
  private mesRestaurants:Array<Resto>;
  private header:HttpHeaders = new HttpHeaders("user-key:3312c04b34aebdde5a1e322d74150b17");
  private apiBase:string ="https://developers.zomato.com/api/v2.1/";

  constructor(private http:HttpClient){
    this.mesRestaurants=[];
  }

  getRestaurants(): Array<Resto> {
        var restos: Array<Resto> = [];
        return restos;
    }

  public getRestos(cityQuery:string,tagId:number):Observable<Resto[]>{
    return new Observable((observer)=>{
      this.http.get(this.apiBase+"locations?query="+cityQuery,{headers:this.header}).subscribe(
        value=>{
        let cityId = value["location_suggestions"][0]["city_id"];
        let urlString = this.apiBase+"search?sort=rating&order=desc";
        //console.log("cityQuery :|"+cityQuery+"| "+cityId+" || tagId:"+tagId);
        if(cityQuery!==""){
          urlString = urlString+"&entity_id="+cityId+"&entity_type=city";
        }
        if(tagId!=0){
          urlString = urlString+"&cuisines="+tagId;
        }
        this.http.get(urlString,{headers:this.header}).subscribe(
          values=>{
            this.mesRestaurants=[];
            values["restaurants"].forEach(function (unResto) {
              this.mesRestaurants.push(new Resto(
                unResto["restaurant"]["R"]["res_id"],
                unResto["restaurant"]["name"],
                parseFloat(unResto["restaurant"]["location"]["latitude"]),
                parseFloat(unResto["restaurant"]["location"]["longitude"]),
                unResto["restaurant"]["location"]["address"],
                unResto["restaurant"]["location"]["city"],
                unResto["restaurant"]["cuisines"].split(", "),
                [["Soup","Beans","Banoffe"],["Salad","Pork with Fries","Yogurt"]] ,
                unResto["restaurant"]["menu_url"],
                unResto["restaurant"]["average_cost_for_two"]/2,
                unResto["restaurant"]["user_rating"]["aggregate_rating"],
                ["11h - 13h","17h - 22h"],
                "40 pers."));
            },this);
            //console.log(this.mesRestaurants);
            observer.next(this.mesRestaurants);
            observer.complete();
          },()=>{
            observer.error([]);
          }
        );
      },()=>{
        observer.error([]);
      }
      );
    });
  }
  getAllTags(a:number,b?:number):Observable<Object>{
      if(b){
        //return ["Classic","Irish"];
      }else{
        return this.http.get(this.apiBase+"cuisines?city_id=91",{headers:this.header});
      }
  }
  getRestosById(id: number):Observable<Resto> {

      return new Observable((monObserver)=>{
        this.http.get(this.apiBase+"restaurant?res_id="+id,{headers:this.header}).subscribe(
        unResto=>{
          let leResto:Resto= new Resto(
              unResto["R"]["res_id"],
              unResto["name"],
              parseFloat(unResto["location"]["latitude"]),
              parseFloat(unResto["location"]["longitude"]),
              unResto["location"]["address"],
              unResto["location"]["city"],
              unResto["cuisines"].split(", "),
              [["Soup","Beans","Banoffe"],["Salad","Pork with Fries","Yogurt"]] ,
              unResto["menu_url"],
              unResto["average_cost_for_two"]/2,
              unResto["user_rating"]["aggregate_rating"],
              ["11h - 13h","17h - 22h"],
              "40 pers.");
          monObserver.next(leResto);
          monObserver.complete();
        },()=>{
            monObserver.error([]);
        });
      });
  }
}

@Injectable()
export class CinemaService {
  private headers:HttpHeaders = new HttpHeaders("X-API-Key:JtKDDYcaAhgOd8J8Jxr9TW5V5kk4kaz8");

  constructor(private http:HttpClient){
    console.log("constructor")
    //this.headers.append("country","IE");
  }

  public getCinemas():Observable<number>{
    console.log("getCinemas");
    return new Observable<number>((observer)=>{
      this.http.get("https://api.internationalshowtimes.com/v4/cinemas/?countries=IE",{headers:this.headers}).subscribe(
        response=>{
          console.log(response);
          observer.next(42);
          observer.complete();
        },()=>{
          console.log("error");
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
          console.log(response);
          observer.next(42);
          observer.complete();
        },()=>{
          console.log("error");
          observer.error([])
        }
      )
    })
  }
  public getMovies():Observable<number>{
    console.log("getMovies");
    return new Observable<number>((observer)=>{
      this.http.get("https://api.internationalshowtimes.com/v4/movies/?countries=IE",{headers:this.headers}).subscribe(
        response=>{
          console.log(response);
          observer.next(42);
          observer.complete();
        },()=>{
          console.log("error");
          observer.error([])
        }
      )
    })
  }

}


const genres = [
  {
    "id": "0",
    "name": "Action"
  },
  {
    "id": "1",
    "name": "Adventure"
  },
  {
    "id": "2",
    "name": "Animation"
  },
  {
    "id": "3",
    "name": "Comedy"
  },
  {
    "id": "4",
    "name": "Crime"
  },
  {
    "id": "5",
    "name": "Documentary"
  },
  {
    "id": "6",
    "name": "Drama"
  },
  {
    "id": "7",
    "name": "Family"
  },
  {
    "id": "8",
    "name": "Fantasy"
  },
  {
    "id": "9",
    "name": "Foreign"
  },
  {
    "id": "10",
    "name": "History"
  },
  {
    "id": "11",
    "name": "Horror"
  },
  {
    "id": "12",
    "name": "Music"
  },
  {
    "id": "13",
    "name": "Mystery"
  },
  {
    "id": "14",
    "name": "Romance"
  },
  {
    "id": "15",
    "name": "Science Fiction"
  },
  {
    "id": "16",
    "name": "TV Movie"
  },
  {
    "id": "17",
    "name": "Thriller"
  },
  {
    "id": "18",
    "name": "War"
  },
  {
    "id": "19",
    "name": "Western"
  },
  {
    "id": "20",
    "name": "Family"
  },
  {
    "id": "21",
    "name": null
  },
  {
    "id": "22",
    "name": "Romance"
  },
  {
    "id": "24",
    "name": "Biography"
  },
  {
    "id": "25",
    "name": "Animation"
  },
  {
    "id": "26",
    "name": null
  },
  {
    "id": "27",
    "name": "Musical"
  },
  {
    "id": "28",
    "name": "Sport"
  },
  {
    "id": "29",
    "name": "NobleCinemaWide"
  },
  {
    "id": "30",
    "name": null
  },
  {
    "id": "31",
    "name": "News"
  },
  {
    "id": "32",
    "name": null
  },
  {
    "id": "33",
    "name": "Short"
  },
  {
    "id": "34",
    "name": null
  },
  {
    "id": "35",
    "name": null
  },
  {
    "id": "36",
    "name": null
  },
  {
    "id": "37",
    "name": null
  },
  {
    "id": "38",
    "name": null
  },
  {
    "id": "39",
    "name": null
  },
  {
    "id": "40",
    "name": null
  },
  {
    "id": "41",
    "name": null
  },
  {
    "id": "42",
    "name": null
  },
  {
    "id": "43",
    "name": null
  },
  {
    "id": "44",
    "name": null
  },
  {
    "id": "45",
    "name": null
  },
  {
    "id": "46",
    "name": null
  },
  {
    "id": "47",
    "name": null
  },
  {
    "id": "48",
    "name": null
  },
  {
    "id": "49",
    "name": null
  },
  {
    "id": "50",
    "name": null
  },
  {
    "id": "51",
    "name": null
  },
  {
    "id": "52",
    "name": null
  },
  {
    "id": "53",
    "name": null
  },
  {
    "id": "54",
    "name": null
  },
  {
    "id": "55",
    "name": null
  },
  {
    "id": "56",
    "name": null
  },
  {
    "id": "57",
    "name": null
  },
  {
    "id": "58",
    "name": null
  },
  {
    "id": "59",
    "name": null
  },
  {
    "id": "60",
    "name": null
  },
  {
    "id": "61",
    "name": null
  },
  {
    "id": "62",
    "name": null
  },
  {
    "id": "63",
    "name": null
  },
  {
    "id": "64",
    "name": null
  },
  {
    "id": "65",
    "name": null
  },
  {
    "id": "67",
    "name": "Comedia"
  },
  {
    "id": "68",
    "name": null
  },
  {
    "id": "69",
    "name": null
  },
  {
    "id": "70",
    "name": null
  },
  {
    "id": "71",
    "name": null
  },
  {
    "id": "72",
    "name": "Film-Noir"
  },
  {
    "id": "95",
    "name": "Film-Noir"
  },
  {
    "id": "98",
    "name": null
  },
  {
    "id": "99",
    "name": null
  },
  {
    "id": "100",
    "name": null
  },
  {
    "id": "101",
    "name": null
  },
  {
    "id": "102",
    "name": null
  },
  {
    "id": "103",
    "name": "Independent"
  },
  {
    "id": "105",
    "name": null
  },
  {
    "id": "106",
    "name": null
  },
  {
    "id": "107",
    "name": null
  },
  {
    "id": "108",
    "name": null
  },
  {
    "id": "109",
    "name": null
  },
  {
    "id": "110",
    "name": null
  },
  {
    "id": "111",
    "name": null
  },
  {
    "id": "112",
    "name": null
  },
  {
    "id": "113",
    "name": null
  },
  {
    "id": "114",
    "name": null
  },
  {
    "id": "115",
    "name": null
  },
  {
    "id": "116",
    "name": null
  },
  {
    "id": "117",
    "name": null
  },
  {
    "id": "118",
    "name": null
  },
  {
    "id": "119",
    "name": null
  },
  {
    "id": "120",
    "name": null
  },
  {
    "id": "121",
    "name": null
  },
  {
    "id": "122",
    "name": "Sci-Fi"
  },
  {
    "id": "123",
    "name": "Historical"
  },
  {
    "id": "124",
    "name": "Family Animation"
  },
  {
    "id": "125",
    "name": "Romantic Comedy"
  },
  {
    "id": "126",
    "name": "Biopic"
  },
  {
    "id": "127",
    "name": "Reality-TV"
  },
  {
    "id": "128",
    "name": "Adult"
  },
  {
    "id": "129",
    "name": "Docudrama"
  },
  {
    "id": "130",
    "name": "War Drama"
  },
  {
    "id": "131",
    "name": "Vampire"
  },
  {
    "id": "132",
    "name": null
  },
  {
    "id": "133",
    "name": "Bio"
  },
  {
    "id": "134",
    "name": "Game-Show"
  },
  {
    "id": "135",
    "name": "Crime Thriller"
  },
  {
    "id": "136",
    "name": "Supernatural"
  },
  {
    "id": "137",
    "name": "Crime Drama"
  },
  {
    "id": "138",
    "name": null
  },
  {
    "id": "139",
    "name": "Children"
  },
  {
    "id": "140",
    "name": "12A"
  },
  {
    "id": "141",
    "name": "Suspense"
  },
  {
    "id": "142",
    "name": "Opera"
  },
  {
    "id": "143",
    "name": "Children's"
  },
  {
    "id": "144",
    "name": null
  },
  {
    "id": "145",
    "name": null
  },
  {
    "id": "146",
    "name": "PG"
  },
  {
    "id": "147",
    "name": "Music Drama"
  },
  {
    "id": "148",
    "name": "Comedy Horror"
  },
  {
    "id": "149",
    "name": "Sports Documentary"
  },
  {
    "id": "150",
    "name": null
  },
  {
    "id": "151",
    "name": null
  },
  {
    "id": "152",
    "name": "Fantasy Drama"
  }
];
