var app = angular.module('app',['ngRoute']);
app.constant('moment',moment);
app.constant('_', _);


//get an instance of routeprovider and keep it for configuring routes in the app.run()
var $routeProviderReference;
app.config(['$routeProvider', function($routeProvider){
  $routeProviderReference = $routeProvider;
}]);

//listen to route errors and successes
app.run(['$rootScope', '$location', function($rootScope, $location){
	$rootScope.$on('$routeChangeSuccess', function(rc){
		//console.log("ROUTE CHANGE Success");
	});
	$rootScope.$on("$routeChangeError", function (e,d) {
    //console.log("failed to change routes");
    $location.url('/login');
  });
}]);

app.controller('appCtrl', ['$scope', '$location', 'moment', 'DateService', '$rootScope', function($scope, $location, moment, DateService, $rootScope){
	
	$scope.showMonthView = true;
	var selectedDate = $location.search().selectedDate;
	var momentDt = moment(selectedDate, 'YYYY-MM-D');
	if (momentDt.isValid()){
		$scope.today = momentDt;
	}else{
		$scope.today = moment();
	}

	$scope.$watch('today', function(){
		$location.search('selectedDate', DateService.toDateId($scope.today));
	});
	function printDate(){
		console.log($scope.today.format("dddd, MMMM Do YYYY, h:mm:ss a"));
	}
}]);



app.controller('loginCtrl', [function(){
	//console.log('inside login controller');
}]);