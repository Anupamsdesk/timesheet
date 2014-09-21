/*globals app, $routeProviderReference*/
app.run(['authService', function (authService) {
  var $rp = $routeProviderReference;

  $rp.when('/', {
    templateUrl: 'js/views/month-view-template.html',
    controller: 'appCtrl',
    resolve: {
      'authentication': authService.authenticate
    }
  });

  $rp.when('/login', {
    templateUrl: 'js/views/login-view-template.html',
    controller: 'loginCtrl'
  });

  $rp.when('/week-view', {
    templateUrl: 'js/views/week-view-template.html',
    controller: 'appCtrl'
  });

  $rp.when('/month-view', {
    templateUrl: 'js/views/month-view-template.html',
    controller: 'appCtrl'
  });

  $rp.otherwise({
    redirectTo: '/login'
  });
}]);

