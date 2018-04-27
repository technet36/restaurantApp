import {Component,Input} from '@angular/core';
import {Cinema} from '../../cinema-service/cinema-service';

@Component({
    moduleId:     module.id,
    selector:    'cinema-location',
    templateUrl: 'cinema-location.component.html',
    styleUrls:   ['cinema-location.component.css']
})
export default class RestaurantLocationComponent {
      @Input() cnma: Cinema;
}
