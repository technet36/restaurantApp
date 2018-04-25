import {Component, Input, OnInit} from '@angular/core';
import {Cinema, CinemaService, Showtime} from '../../cinema-service/cinema-service';
import {ActivatedRoute} from "@angular/router";
@Component({
    moduleId:     module.id,
    selector:    'osl-restaurant-menu',
    templateUrl: 'restaurant-menu.component.html',
    styleUrls:  ['restaurant-menu.component.css'],
})
export default class RestaurantMenuComponent implements OnInit {
    @Input() cnma: Cinema;
    show: Showtime;
    displayPrice: boolean;
    imageUrl: string;
    tagsString: string = "";

    subscriberParams: any;
    subscriberData: any;

    constructor(private CnmaService: CinemaService, private route: ActivatedRoute) {}

  ngOnInit() {
    //console.log(this.cnma);
    this.show = new Showtime(0, 0, 0, "", null, "", "", null);
    this.subscriberParams = this.route.params.subscribe(params => {
      let id: number = +params['id'];   // (+) converts string 'id' to a number
      this.CnmaService.getShowtimeById(id).subscribe(Fullshow => {
        console.log("Fullshow");
        console.log(Fullshow);

      });
    });



  }
}
