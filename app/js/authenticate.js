/*globals app*/
app.service('authService', ['$q', function ($q) {
  var userObj = {'name': 'Anupam Singh', 'id': '1'};
  return {
    authenticate: function () {
      var defer = $q.defer();
      defer.resolve();
      return defer.promise;
    },
    getUser: function () {
      return angular.copy(userObj);
    }
  };
}]);