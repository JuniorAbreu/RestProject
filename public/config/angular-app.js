'use strict';

var app = angular.module('RestApp', ['ngRoute']);

app.config(function($routeProvider) {
	var resolveProjects = {
		projects: function (Projects) {
			return Projects.fetch();
		}
	};

	$routeProvider.when('/home', {
		controller:'HomeController',
		templateUrl:'src/home/home.html'
	}).otherwise({ redirectTo: '/home'});
});

app.run();
