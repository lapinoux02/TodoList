angular.module('TODO')
.factory('SettingsService', function(DataService) {
    
    
    /*---------------------------*
     *      Private variable     *
     *---------------------------*/
    
    var settings = JSON.parse(localStorage.getItem('saveSettings')) || {
        background: 'http://7-themes.com/data_images/out/37/6896002-calm-wallpaper.jpg'
    };
    
    /*---------------------------*
     *      Private method       *
     *---------------------------*/
    
    var matchURL = function(string) {
        if (!string) return false;
        // regex url
        var regex = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);
        if (!string.match(regex)) return false;
        return true;
    };
    
    var applyAll = function() {
        setBackground(settings.background);
    };
    
    var storeSettings = function() {
        localStorage.setItem('saveSettings', JSON.stringify(settings));
    };
    
    /*---------------------------*
     *      Public method        *
     *---------------------------*/
    
    var setBackground = function(newUrl) {
        if (matchURL(newUrl)) {
            var body = document.querySelector('body');
            body.style.backgroundImage = 'url("' + newUrl + '")';
            settings.background = newUrl;
        }
        
        storeSettings();
    };
    
    var resetBackground = function() {
        var defaultBackground = 'http://7-themes.com/data_images/out/37/6896002-calm-wallpaper.jpg';
        document.querySelector('body').style.backgroundImage = 'url("' + defaultBackground + '")';
        settings.background = defaultBackground;
        storeSettings();
    };
    
    var setSettings = function(newSettings) {
        settings = newSettings;
        storeSettings();
        applyAll();
    };
    
    var getSettings = function() {
        return settings;
    };
    
    /*
     * Applique les settings
     */
    applyAll();
    
    return {
        getSettings: getSettings,
        setSettings: setSettings,
        setBackground: setBackground,
        resetBackground: resetBackground
    };
});