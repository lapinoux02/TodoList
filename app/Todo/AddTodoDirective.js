angular.module("TODO")
.directive('addTodo', function($stateParams, DataService) {
    return {
        restrict: 'E',
        templateUrl: 'app/Todo/AddTodoDirective.tpl.html',
        link: function(scope) {
            scope.adding = false;
            
            scope.toggleAdd = function() {
                scope.adding = !scope.adding;
            };
            
            scope.cancelNewTodo = function() {
                scope.toggleAdd();
                scope.newTitle = "";
                scope.newDescription = "";
            };
            
            scope.addNewTodo = function() {
                scope.toggleAdd();
                DataService.addNewTodo($stateParams.todoListId, scope.newTitle, scope.newDescription);
                console.log(DataService.getData());
                scope.newTitle = "";
                scope.newDescription = "";
            }
        }
    };
});