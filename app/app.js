angular.module("TODO", ["ui.bootstrap", "ngCookies", "ngAnimate", "ui.router"])
.config(function($stateProvider, $compileProvider, $urlRouterProvider) {
    /*
     * Permet de faire marcher le téléchargement des todoList.
     * Cf. doc. $compileProvider at "https://docs.angularjs.org/api/ng/provider/$compileProvider"
     */
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
    
    // Routes
    $urlRouterProvider.otherwise("/home");
    $stateProvider
    .state("Home", {
        url: "/home",
        templateUrl: "app/Home/Home.tpl.html"
    })
    .state("TodoList", {
        url: "/todoList/:todoListId",
        templateUrl: "app/TodoList/TodoList.tpl.html",
        controller: "TodoListController"
    })
    .state("NewTodoList", {
        url: '/newTodoList',
        templateUrl: 'app/TodoList/NewTodoList.tpl.html',
        controller: 'NewTodoListController'
    })
    .state("Settings", {
        url: "/settings",
        templateUrl: "app/Settings/Settings.tpl.html",
        controller: "SettingsController"
    })
});