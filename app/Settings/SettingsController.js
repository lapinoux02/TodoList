angular.module("TODO")
.controller("SettingsController", function($scope, SettingsService) {
    $scope.applyNewSettings = function() {
        SettingsService.setBackground($scope.newBackground);
    };
    
    $scope.resetSettings = function() {
        if (confirm('Souhaitez-vous vraiment Reset tous vos paramètres personalisés ?')) {
            SettingsService.resetBackground();
        }
    };
});