/*globals moment, _*/
var $routeProviderReference;
var app = angular.module('app', ['ngRoute']);
app.constant('moment', moment);
app.constant('_', _);
//get an instance of routeprovider and keep it for configuring routes in the app.run()
app.config(['$routeProvider', function ($routeProvider) {
  $routeProviderReference = $routeProvider;
}]);


//listen to route errors and successes
app.run(['$rootScope', '$location', function ($rootScope, $location) {
  /*$rootScope.$on('$routeChangeSuccess', function (rc) {
  });*/
  $rootScope.$on("$routeChangeError", function () {
    $location.url('/login');
  });
}]);

app.controller('appCtrl', ['$scope', '$location', 'moment', 'DateService', function ($scope, $location, moment, DateService) {
  var selectedDate = $location.search().selectedDate,
    momentDt = DateService.convertStringToDate(selectedDate);
  $scope.showMonthView = true;
  if (momentDt.isValid()) {
    $scope.today = momentDt;
  } else {
    $scope.today = moment();
  }

  $scope.$watch('today', function () {
    $location.search('selectedDate', DateService.toDateId($scope.today));
  });
}]);

app.controller('loginCtrl', [function () {
  console.log('inside login controller');
}]);