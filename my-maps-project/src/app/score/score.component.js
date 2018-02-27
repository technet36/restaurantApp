"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Implement ScoreComponent here.
var core_1 = require('@angular/core');
var FilmItemComponent = (function () {
    function FilmItemComponent() {
        this.starsEmpty = [];
    }
    FilmItemComponent.prototype.ngOnInit = function () {
        for (var i = 1; i < this.score; i++) {
            this.starsEmpty.push(false);
        }
        for (var i = this.score; i <= 5; i++) {
            this.starsEmpty.push(true);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], FilmItemComponent.prototype, "score", void 0);
    FilmItemComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'osl-score-item',
            templateUrl: 'score.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], FilmItemComponent);
    return FilmItemComponent;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FilmItemComponent;
//# sourceMappingURL=score.component.js.map