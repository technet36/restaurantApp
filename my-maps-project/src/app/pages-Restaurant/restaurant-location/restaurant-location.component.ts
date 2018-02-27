import {Component,Input} from '@angular/core';
import {Resto} from '../../restaurant-service/restaurant-service';

@Component({
    moduleId:     module.id,
    selector:    'osl-restaurant-location',
    templateUrl: 'restaurant-location.component.html',
    styleUrls:   ['restaurant-location.component.css']
})
export default class RestaurantLocationComponent {
      @Input() resto: Resto;
}
