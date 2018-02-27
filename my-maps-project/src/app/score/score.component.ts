// Implement ScoreComponent here.
import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

@Component({
    moduleId:     module.id,
    selector:    'osl-score-item',
    templateUrl: 'score.component.html'
})
export default class ScoreComponent implements OnInit {
    @Input() score: number;
    starsEmpty: Array<boolean> = [];

    ngOnInit() {
        for(let i : number = 1; i < this.score; i ++)
        {
          this.starsEmpty.push(false);
        }

        for(let i : number = this.score; i <= 5; i ++)
        {
          this.starsEmpty.push(true);
        }
    }
}
