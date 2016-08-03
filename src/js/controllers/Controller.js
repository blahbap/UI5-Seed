angular
    .module('SAPApp')
    .controller('MasterController', ['$scope', '$http', '$cookieStore', '$base64', '$q', 'Notification', '$state', MasterController]);

function MasterController($scope, $http, $cookieStore, $base64, $q, Notification, $state) {

	/**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;

    $scope.getWidth = function() {
        return window.innerWidth;
    };

   $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };

  	//Login 
    $scope.loggedInSystems = []; 
    $scope.user = {username:"", password:""}; 
    $scope.loading = false; 
    $scope.loginMessage = "Not logged in"; 

 	$scope.logon = function() {
        $scope.loading = true; 

        $http.defaults.headers.common['Authorization'] = 'Basic ' + $base64.encode($scope.user.username + ':' + $scope.user.password);
        $http({method: 'GET', url: '/systems'}).
            success(function(data, status, headers, config) {
            $scope.systems = data; 
            var requests = [];
            
            //Logon to all systems
            for (var i = 0; i < $scope.systems.length; i++) {
                
                var promise = $http({method: 'GET', url: '/sap/public/ping?sapsystem=' + $scope.systems[i].name}).
                        success((function(system) {
                            return function(data) {
                                Notification.success('Logged in to ' + system);
                            };
                        })($scope.systems[i].name)).
                        error(function(data) {
                            alert(data);
                    });

                requests.push(promise);
            }

            $q.all(requests).then(function(data) {
                console.log("All logged in");
                $scope.loading = false;
                $state.go('home');
                $scope.loginMessage = "Good to go";
                $scope.isLoggedIn = true;
                $scope.loading = false; 
            });



            }).
            error(function(data, status, headers, config) {
                alert('Unable to get list of SAP systems - could not log in');
            });

    };

    $http({method: 'GET', url: '/systems'}).
            success(function(data, status, headers, config) {
                $scope.systems = data; 
        	});
    
}