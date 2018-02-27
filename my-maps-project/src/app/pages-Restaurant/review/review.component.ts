import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Review, ReviewService} from "../../review-service/review-service.service";

@Component({
    moduleId:     module.id,
    selector:    'osl-review',
    templateUrl: 'review.component.html',
    styleUrls:  ['review.component.css']
})

export default class ReviewComponent implements OnInit{

    @Input() set resto_id(leResto:number){
      console.log("callback leResto");
      console.log(leResto);
      this.restoId = leResto;
      this.reviewService.getReviews(leResto).subscribe(data=>{
        this.list_Review = data;
      });
    }
    restoId:number;
    reviewText : string; // review input in the HTML
    list_Review: Array<Review> ;
    number_reviews: number = 0;
    constructor(private reviewService:ReviewService) {
      this.list_Review=[];
      this.number_reviews = 0;
    }

    ngOnInit() {
    };

    getReview() : void {
      if(this.reviewText !== ""){
        console.log(this.restoId);
        let newReview:Review = {id:0,resto_id:this.restoId,text_review:this.reviewText};
        this.list_Review.push( newReview );
        this.reviewService.pushReview(newReview.resto_id,newReview.text_review).subscribe((data)=>{
        }
      );
        //init empty the input
        this.reviewText = null;
        //Ecriture dans le json
      }
    }


}
