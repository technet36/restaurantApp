import {Component,Input} from '@angular/core';
import {Cinema} from '../../cinema-service/cinema-service';

@Component({
    moduleId:     module.id,
    selector:    'osl-restaurant-location',
    templateUrl: 'restaurant-location.component.html',
    styleUrls:   ['restaurant-location.component.css']
})
export default class RestaurantLocationComponent {
      @Input() cnma: Cinema;
}
