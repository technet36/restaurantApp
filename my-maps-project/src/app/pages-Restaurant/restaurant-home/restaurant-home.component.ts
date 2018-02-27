import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Resto,RestoService} from '../../restaurant-service/restaurant-service';

@Component({
    moduleId: module.id,
    selector:    'osl-restaurant-home',
    templateUrl: 'restaurant-home.component.html',
    styleUrls:  ['restaurant-home.component.css'],
    providers: [RestoService]
})
export default class RestaurantHomeComponent implements OnInit, OnDestroy {

    resto: Resto;
    displayPrice: boolean;
    imageUrl: string;
    tagsString: string = "";

    subscriberParams: any;
    subscriberData: any;

    constructor(private restoService: RestoService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.resto = new Resto(0,"",53.348,-6.294,"","",[],[],"",0.0,0.0,[],"");
        this.subscriberParams = this.route.params.subscribe(params => {
            let id: number = +params['id'];   // (+) converts string 'id' to a number
            this.restoService.getRestosById(id).subscribe(leResto=>{
              console.log("LeResto");
              console.log(leResto);
              this.resto=leResto;
            });
            this.imageUrl = 'assets/' + id%6 + '.jpg';
        });

        this.subscriberData = this.route.data.subscribe(data => {
            this.displayPrice = data['displayPrice'];
        });



    }

    ngOnDestroy() {
        this.subscriberParams.unsubscribe();
        this.subscriberData.unsubscribe();
    }
}
