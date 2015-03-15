var app = angular.module('projectExplorerApp',['ngRoute']);

var projectExplorerHost = 'http://localhost:8080'

app.config(function ($routeProvider) {
    $routeProvider
        .when('/projects/:projectName', {
            templateUrl: 'views/project.html',
            controller: 'projectController'
        })
        .when('/', {
            templateUrl: 'views/allProjects.html',
            controller: 'projectListController'
        })
        .when('/features', {
            templateUrl: 'views/allFeatures.html',
            controller: 'allFeaturesController'
        })
        .when('/features/:featureName', {
            templateUrl: 'views/feature.html',
            controller: 'featureController'
        });
});

app.factory('allProjectsService', function($http) {
    var allProjectsService = {
        async: function() {
            // $http returns a promise, which has a then function, which also returns a promise
            var promise = $http.get(projectExplorerHost + '/projects').then(function (response) {
                // The then function here is an opportunity to modify the response
                console.log(response);
                // The return value gets picked up by the then in the controller.
                return response.data;
            });
            // Return the promise to the controller
            return promise;
        }
    };
    return allProjectsService;
});

app.factory('projectService', function($http) {
    var projectService = {
        async: function(projectName) {
            // $http returns a promise, which has a then function, which also returns a promise
            var promise = $http.get(projectExplorerHost + '/projects/' + projectName + '/features').then(function (response) {
                // The then function here is an opportunity to modify the response
                console.log(response.data);
                // The return value gets picked up by the then in the controller.
                return response.data;
            });
            // Return the promise to the controller
            return promise;
        }
    };
    return projectService;
});

app.factory('allFeaturesService', function($http) {
    var allProjectsService = {
        async: function() {
            // $http returns a promise, which has a then function, which also returns a promise
            var promise = $http.get(projectExplorerHost + '/features').then(function (response) {
                // The then function here is an opportunity to modify the response
                console.log(response);
                // The return value gets picked up by the then in the controller.
                return response.data;
            });
            // Return the promise to the controller
            return promise;
        }
    };
    return allProjectsService;
});

app.factory('featureService', function($http) {
    var featureService = {
        async: function(featureName) {
            // $http returns a promise, which has a then function, which also returns a promise
            var promise = $http.get(projectExplorerHost + '/features/' + featureName).then(function (response) {
                // The then function here is an opportunity to modify the response
                console.log(response.data);
                // The return value gets picked up by the then in the controller.
                return response.data;
            });
            // Return the promise to the controller
            return promise;
        }
    };
    return featureService;
});

app.controller('projectListController', function($scope, allProjectsService) {
    allProjectsService.async().then(function(d) {
        $scope.projects = d;
    });
    // $http.get("http://localhost:8080/projects").success(function(response) {$scope.projects = response;});
});

app.controller('projectController', function($scope, projectService, $routeParams ) {
    console.log($routeParams.projectName)
    $scope.projectName = $routeParams.projectName
    projectService.async($routeParams.projectName).then(function(d) {
        $scope.features = d;
    });
});

app.controller('allFeaturesController', function($scope, allFeaturesService) {
    allFeaturesService.async().then(function(d) {
        $scope.features = d;
    });
});

app.controller('featureController', function($scope, featureService, $routeParams ) {
    featureService.async($routeParams.featureName).then(function(d) {
        $scope.feature = d;
    });
});
