
'use strict';

app.controller('HomeController', function ($scope, $http, $q, $timeout) {

    $scope.commands = [];
    $scope.messages = {success : false, error: false}

    $scope.runScript = () => {
        processPOST('/openBrowser').then(data => {
            $scope.messages.success = true;
            $timeout(() => { $scope.messages.success = false }, 4000);;
            listAll();
        }, err => {
            $scope.messages.error = true;
            $timeout(() => { $scope.messages.error = false }, 4000);;
            console.error(err);
        });
    }

    function listAll() {
        processGET('/commands').then(data => {
            $scope.commands = data.data ? data.data : $scope.commands;
        })
    }

    function processGET(url) {
        var deferred = $q.defer();
        $http.get(url, { timeout: 600000 }).then(
            response => {
                deferred.resolve(response.data);
            }, err => {
                console.error(err);
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }

    function processPOST(url, body) {
        var deferred = $q.defer();
        $http.post(url, body, { headers: { 'Content-Type': 'application/json' } }).then(
            response => {
                deferred.resolve(response.data);
            }, err => {
                console.error(err);
                deferred.reject(err);
            }
        );
        return deferred.promise;
    }

    listAll();
});