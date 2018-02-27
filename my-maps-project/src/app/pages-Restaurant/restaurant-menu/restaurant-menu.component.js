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
var restaurant_service_1 = require('../../restaurant-service/restaurant-service');
var RestaurantMenuComponent = (function () {
    function RestaurantMenuComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', restaurant_service_1.Resto)
    ], RestaurantMenuComponent.prototype, "resto", void 0);
    RestaurantMenuComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'osl-restaurant-menu',
            templateUrl: 'restaurant-menu.component.html',
            styleUrls: ['restaurant-menu.component.css'],
        }), 
        __metadata('design:paramtypes', [])
    ], RestaurantMenuComponent);
    return RestaurantMenuComponent;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RestaurantMenuComponent;
//# sourceMappingURL=restaurant-menu.component.js.map