"use strict";

angular.module("searchModule").directive("searchForm", function (dataService) {
    return {
        require: "?ngModel",
        scope: true,
        templateUrl: 'modules/search/searchFormTemplate.html',
        link: function(scope, element, attrs, ngModel){
            if (!ngModel) return;
            var countries;
            dataService.getContries().then(function (data) {
                countries = data;
            });
            scope.search = function (searchString) {
                scope.searchedCountries = [];

                var search = new RegExp(searchString , "i");
                $.map(countries, function (value) {
                        if(value.name.match(search)) {
                            if (scope.searchedCountries.indexOf(value) > -1)
                                return false;
                            else {
                                scope.searchedCountries.push(value);

                            }
                        }
                        return null;
                    }
                );

            }

            scope.viewCountry = function(countryCode) {
                scope.selectedCountry = [];
                dataService.getCountry(countryCode).then(function (data) {
                    scope.selectedCountry = data
                });
            }


        }
    };
});