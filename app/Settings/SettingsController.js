angular.module("TODO")
.controller("SettingsController", function($scope, SettingsService) {
    $scope.applyNewSettings = function() {
        SettingsService.setBackground($scope.newBackground);
    };
});