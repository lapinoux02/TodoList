angular.module('TODO')
.controller('NavbarController', function($scope, $timeout, $state, $stateParams, DataService, SettingsService) {
    
    $scope.data = DataService.getData();
    
    $scope.getTitle = function() {
        switch ($state.current.name) {
            case 'Home':
                return 'Home sweet home...';
            case 'TodoList':
                if (DataService.getList($stateParams.todoListId))
                    return DataService.getList($stateParams.todoListId).title;
            case 'Settings':
                return 'Settings';
        }
    };
    
    $scope.newTodoList = function() {
        $state.go('NewTodoList');
    };
    
    $scope.deleteTodoList = function() {
        $state.go('Home');
        DataService.deleteTodoList($stateParams.todoListId);
    };
    
    $scope.getState = function() {
        return $state.current.name;
    };
    
    $scope.gotoHome = function() {
        $state.go('Home');
    };
    
    $scope.gotoList = function(todoListId) {
        $state.go('TodoList', {todoListId: todoListId});
    };
    
    $scope.gotoSettings = function() {
        $state.go('Settings');
    };
    
    $scope.showDeleteTodoList = function() {
        return $state.current.name === 'TodoList';
    };
    
    $scope.downloadLists = function() {
        // Création du lien (inutile de le bind au DOM)
        var link = document.createElement('A');
        // Création de l'objet à DL
        var toDl = JSON.stringify({
            data: DataService.getSaveData(),
            settings: SettingsService.getSettings()
        });
        var blob = new Blob([toDl], {type: 'text/plain'});
        // Création de l'URL
        var url = (window.URL || window.webkitURL).createObjectURL(blob);
        // On set les propriétés du lien (nom d'enregistrement et url)
        link.setAttribute('download', 'TodoLists.json')
        link.setAttribute('href', url);
        // Quand tout est synchronisé, on click sur le lien puis on détruit l'url
        $timeout(function() {
            link.click();
            window.URL.revokeObjectURL(url);
        });
    };
    
    $scope.uploadLists = function() {
        // Création de l'input
        var input = document.createElement('INPUT');
        // Set du type d'input à 'file'
        input.setAttribute('type', 'file');
        // Rajout de l'event listener sur le change de l'input
        input.addEventListener(
            'change',
            function() {
                // Récupère les fichiers
                var files = input.files;
                // Création du fileReader
                var fileReader = new FileReader();
                // Lors du chargement du fichier
                fileReader.onload = function() {
                    // On lit le fichier
                    var uploadedData = JSON.parse(fileReader.result);
                    // On met à jour les données
                    DataService.setSaveData(uploadedData.data);
                    SettingsService.setSettings(uploadedData.settings);

                    $state.go('Home');
                };
                // On lit le fichier
                fileReader.readAsText(files[0]);
            },
            false
        );
        input.click();
    };
});