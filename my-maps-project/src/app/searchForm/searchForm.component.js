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
var restaurant_service_1 = require("../restaurant-service/restaurant-service");
var SearchFormComponent = (function () {
    function SearchFormComponent() {
        this.mesResto = new restaurant_service_1.RestoService().getRestaurants();
        this.inputLocation = "";
        this.inputTag = "";
        this.cities = [];
        this.tags = [];
        this.results = this.mesResto;
        this.mesResto.forEach(function (unResto) {
            if (!this.cities.includes(unResto.city))
                this.cities.push(unResto.city);
            unResto.tag.forEach(function (unTag) {
                if (!this.tags.includes(unTag))
                    this.tags.push(unTag);
            }, this);
        }, this);
        //console.log(this.mesResto);
    }
    SearchFormComponent.prototype.ngOnInit = function () {
        //TableComponent.
    };
    SearchFormComponent.prototype.getResult = function () {
        var isSearch = false;
        this.results = [];
        this.mesResto.forEach(function (unResto) {
            isSearch = false;
            if (this.inputLocation === unResto.city || this.inputLocation === "") {
                unResto.tag.forEach(function (unTag) {
                    if (unTag === this.inputTag || this.inputTag === "") {
                        isSearch = true;
                    }
                }, this);
            }
            if (isSearch)
                this.results.push(unResto);
        }, this);
    };
    SearchFormComponent.prototype.clickRow = function (restoId) {
        //console.log("clicked on resto with id :" + restoId);
    };
    SearchFormComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-form',
            templateUrl: 'searchForm.component.html'
        }),
        __metadata('design:paramtypes', [])
    ], SearchFormComponent);
    return SearchFormComponent;
}());
exports.SearchFormComponent = SearchFormComponent;
//# sourceMappingURL=searchForm.component.js.map
