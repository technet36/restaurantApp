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
var core_1 = require('@angular/core');
var logger_service_1 = require('../logger-service/logger-service');
var ReviewComponent = (function () {
    function ReviewComponent(loggerService) {
        this.loggerService = loggerService;
        this.list_Review = [];
        this.number_reviews = 0;
        this.number_reviews = this.list_Review.length;
    }
    ReviewComponent.prototype.ngOnInit = function () {
        //Remplissage list Review avec le json
        //mise a jour de number_reviews
    };
    ;
    ReviewComponent.prototype.getReview = function () {
        if (this.reviewText != null) {
            this.number_reviews++;
            this.list_Review.push(new AReview(this.id_resto, this.number_reviews, this.reviewText));
            //init empty the input
            this.reviewText = null;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ReviewComponent.prototype, "id_resto", void 0);
    ReviewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'osl-review',
            templateUrl: 'review.component.html',
            styleUrls: ['review.component.css'],
            providers: [logger_service_1.LoggerService]
        }), 
        __metadata('design:paramtypes', [logger_service_1.LoggerService])
    ], ReviewComponent);
    return ReviewComponent;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ReviewComponent;
var AReview = (function () {
    function AReview(review_id, resto_id, text_review) {
        this.review_id = review_id;
        this.resto_id = resto_id;
        this.text_review = text_review;
    }
    ;
    return AReview;
}());
exports.AReview = AReview;
//# sourceMappingURL=review.component.js.map