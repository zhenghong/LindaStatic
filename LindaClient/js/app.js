'use strict';

//  Declare app level module which depends on filters, and services
/*
	controller //function或string类型。在当前模板上执行的controller函数，生成新的scope
	controllerAs //string类型，为controller指定别名
	template //string或function类型，视图所用的模板，这部分内容将被ngView引用
	templateUrl //string或function类型，当视图模板为单独的html文件或是使用了<script type="text/ng-template">定义模板时使用
	resolve //指定当前controller所依赖的其他模块
	redirectTo //重定向的地址
*/
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', function($routeProvider) {

        // main route
        $routeProvider.when('/main', {templateUrl: 'partials/main.html'});
        $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: login});
        $routeProvider.when('/logout', {templateUrl: 'partials/main.html', controller: logout});
        // tran route
        $routeProvider.when('/account/account001', {templateUrl: 'partials/account.html', controller: account});
        $routeProvider.when('/transfer/transfer001', {templateUrl: 'partials/transfer/transfer.html', controller: transfer});
        $routeProvider.when('/transfer/result', {templateUrl: 'partials/transfer/result.html'});
        // public route

        // other
        $routeProvider.otherwise({redirectTo: '/main'});

      }
  ]);

