angular.module('SAPApp', ['ui.router', 'ngCookies', 'ui-notification', 'ngAnimate', 'base64'])
.config(['NotificationProvider', function(NotificationProvider) {
        NotificationProvider.setOptions({
            delay: 10000,
            startTop: 50,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'top'
        });

         
    }]);