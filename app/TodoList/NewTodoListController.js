angular.module('TODO')
.controller('NewTodoListController', function($scope, $state, DataService) {
    $scope.createNewTodo = function() {
        var todoListIndex = DataService.createNewTodoList($scope.newTodoListTitle);
        $state.go('TodoList', {todoListId: todoListIndex});
    };
});