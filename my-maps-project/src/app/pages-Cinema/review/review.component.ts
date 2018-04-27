import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Review, ReviewService} from "../../review-service/review-service.service";

@Component({
    moduleId:     module.id,
    selector:    'cinema-review',
    templateUrl: 'review.component.html',
    styleUrls:  ['review.component.css']
})

export default class ReviewComponent implements OnInit{

    @Input() set cnmaId(cnma_id:number){
      if (cnma_id!=0){
        this.cinemaId = cnma_id;
        this.getReview();
      }
    }
    cinemaId:number;
    reviewText : string; // review input in the HTML
    list_Review: Array<Review> ;
    number_reviews: number = 0;

    constructor(private reviewService:ReviewService) {
      this.list_Review=[];
      this.number_reviews = 0;
    }

    ngOnInit() {
    };


  getReview() {
    this.reviewService.getReviewsByCinema(this.cinemaId).subscribe((data)=>{
      this.list_Review = data;
    },error=>{
      console.log("Fail to get the reviews "+this.cinemaId);
    });
  }
  pushReview() : void {
    if(this.reviewText !== ""){
      let newReview:Review = {id_movie:0,id_cinema:this.cinemaId,text_review:this.reviewText};
      this.list_Review.push( newReview );
      this.reviewService.pushReview(newReview.id_cinema,0,newReview.text_review).subscribe((data)=>{
        console.log("success");
        },error=>{
        console.log("fail ot push the review");
        }
      );
      //init empty the input
      this.reviewText = null;
      //Ecriture dans le json
    }
  }


}
