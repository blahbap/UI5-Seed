'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('SAPApp').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // Application routes
        $stateProvider
            .state('login', {   
                url: '/login',
                templateUrl: 'templates/login.html'
            })
            .state('home', {   
                url: '/home',
                templateUrl: 'templates/home.html'
            });

        // For unmatched routes
        $urlRouterProvider.otherwise('/login');
    }
]);