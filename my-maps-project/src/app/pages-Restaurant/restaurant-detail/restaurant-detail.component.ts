import {Component,Input} from '@angular/core';
import {Resto} from '../../restaurant-service/restaurant-service';

@Component({
    moduleId:     module.id,
    selector:    'osl-restaurant-detail',
    templateUrl: 'restaurant-detail.component.html',
    styleUrls:  ['restaurant-detail.component.css'],
})
export default class RestaurantDetailComponent {
  @Input() resto: Resto;
}
