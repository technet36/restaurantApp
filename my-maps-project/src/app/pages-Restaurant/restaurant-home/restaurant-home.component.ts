import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Cinema,CinemaService, Showtime} from '../../cinema-service/cinema-service';
import {ReviewService} from "../../review-service/review-service.service";

@Component({
    moduleId: module.id,
    selector:    'osl-restaurant-home',
    templateUrl: 'restaurant-home.component.html',
    styleUrls:  ['restaurant-home.component.css'],
    providers: [CinemaService]
})
export default class RestaurantHomeComponent implements OnInit {

    cnma: Cinema;
    show: Showtime;
    displayPrice: boolean;
    imageUrl: string;

    subscriberParams: any;
    subscriberData: any;

    constructor(private CnmaService: CinemaService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.cnma = new Cinema(0,"","",53.348,-6.294,"","");
        this.subscriberParams = this.route.params.subscribe(params => {
            let id: number = +params['id'];   // (+) converts string 'id' to a number
            this.CnmaService.getCinemaById(id).subscribe(Fullcin=>{
              this.cnma=Fullcin;
            });
            this.imageUrl = 'assets/' + id%6 + '.jpg';
        });

        this.subscriberData = this.route.data.subscribe(data => {
            this.displayPrice = data['displayPrice'];
        });
    }



}
