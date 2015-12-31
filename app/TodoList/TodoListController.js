angular.module("TODO")
.controller("TodoListController", function($scope, $stateParams, $interval, DataService) {
    $scope.todoList = DataService.getList($stateParams.todoListId);
});