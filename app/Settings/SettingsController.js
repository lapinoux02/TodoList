angular.module("TODO")
.controller("SettingsController", function($scope) {
    var matchURL = function(string) {
        if (!string) return false;
        // regex url
        var regex = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);
        if (!string.match(regex)) return false;
        return true;
    };
    
    $scope.applyNewSettings = function() {
        if (matchURL($scope.newBackground)) {
            var body = document.querySelector('body');
            body.style.backgroundImage = 'url("' + $scope.newBackground + '")';
        }
    };
});