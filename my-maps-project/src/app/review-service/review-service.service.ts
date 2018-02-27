import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";


export interface Review{
  id:number;
  resto_id:number;
  text_review:string;
}


@Injectable()
export class ReviewService {


  private mesReview:Array<Review>;
  private apiBase:string ="http://localhost/rwa_project/review_handler.php";

  constructor(private http:HttpClient){
    this.mesReview=[];
  }


  public getReviews(restoId:number):Observable<Review[]>{
    let urlString = this.apiBase+"?action=1&resto_id="+restoId;
    return new Observable((observer)=>{
      this.http.get<Review[]>(urlString).subscribe(
        value=>{
          observer.next(value);
        },()=>{
          observer.error([{id:0,resto_id:0,text_review:"No review"}]);
        }
      );
    });
  }

  public pushReview(restoId:number,reviewContent:string):Observable<Review[]>{
    console.log("push service "+restoId);
    let urlString = this.apiBase+"?action=2&resto_id="+restoId+"&content="+reviewContent;
    return new Observable((observer)=>{
      this.http.get<Review[]>(urlString).subscribe(
        value=>{
          observer.next(value);
        },()=>{
          observer.error([{id:0,resto_id:0,text_review:"No review"}]);
        }
      );
    });
  }
}
