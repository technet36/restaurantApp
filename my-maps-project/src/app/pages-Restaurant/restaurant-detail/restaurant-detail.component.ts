import {Component,Input} from '@angular/core';
import {Cinema, Showtime} from '../../cinema-service/cinema-service';

@Component({
    moduleId:     module.id,
    selector:    'osl-restaurant-detail',
    templateUrl: 'restaurant-detail.component.html',
    styleUrls:  ['restaurant-detail.component.css'],
})
export default class RestaurantDetailComponent {
  @Input() cnma: Cinema;
  @Input() show: Showtime;
}
