angular.module("TODO")
.directive('todo', function($stateParams, DataService) {
    return {
        restrict: 'E',
        scope: {
          data: '=data'
        },
        templateUrl: 'app/Todo/TodoDirective.tpl.html',
        link: function(scope) {
            scope.showDescription = false;
            scope.modification = false;
            
            scope.toto = function() {
                console.log('do smthg');
            };
            
            scope.toggleDescription = function() {
                if (scope.data.valid) {
                    return;
                }
                if (scope.modification) {
                    return;
                }
                
                scope.showDescription = !scope.showDescription;
                if (!scope.data.description) {
                    scope.showDescription = false;
                }
            };
            
            scope.toggleModification = function() {
                if (scope.data.valid) {
                    return;
                }
                scope.modification = !scope.modification;
                if (scope.modification) {
                    scope.showDescription = true;
                } else {
                    scope.showDescription = false;
                }
            };
            
            scope.delete = function() {
                if(confirm('Souhaitez vous vraiment supprimer cet élément ?')) {
                    DataService.removeTodo($stateParams.todoListId, scope.data.id);
                }
            };
            
            scope.validateTodo = function() {
                scope.showDescription = false;
                scope.modification = false;
                scope.data.valid = !scope.data.valid;
            }
        }
    };
});