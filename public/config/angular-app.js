'use strict';

var app = angular.module('RestApp', ['ngRoute']);

app.config(function($routeProvider) {

	$routeProvider.when('/home', {
		controller:'HomeController',
		templateUrl:'src/home/home.html'
	}).otherwise({ redirectTo: '/home'});
	
});

app.run();
