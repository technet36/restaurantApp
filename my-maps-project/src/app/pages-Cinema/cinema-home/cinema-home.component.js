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
var router_1 = require('@angular/router');
var restaurant_service_1 = require('../../restaurant-service/restaurant-service');
var RestaurantHomeComponent = (function () {
    function RestaurantHomeComponent(restoService, route) {
        this.restoService = restoService;
        this.route = route;
        this.tagsString = "";
    }
    RestaurantHomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriberParams = this.route.params.subscribe(function (params) {
            var id = +params['id']; // (+) converts string 'id' to a number
            _this.resto = _this.restoService.getRestosById(id);
            _this.imageUrl = '/images/' + id + '.jpg';
        });
        this.subscriberData = this.route.data.subscribe(function (data) {
            _this.displayPrice = data['displayPrice'];
        });
        //Display Array Tags
        for (var _i = 0, _a = this.resto.tag; _i < _a.length; _i++) {
            var t = _a[_i];
            this.tagsString += t + " * ";
        }
    };
    RestaurantHomeComponent.prototype.ngOnDestroy = function () {
        this.subscriberParams.unsubscribe();
        this.subscriberData.unsubscribe();
    };
    RestaurantHomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'cinema-home',
            templateUrl: 'cinema-home.component.html',
            styleUrls: ['cinema-home.component.css'],
            providers: [restaurant_service_1.RestoService]
        }),
        __metadata('design:paramtypes', [restaurant_service_1.RestoService, router_1.ActivatedRoute])
    ], RestaurantHomeComponent);
    return RestaurantHomeComponent;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RestaurantHomeComponent;
//# sourceMappingURL=cinema-home.component.js
