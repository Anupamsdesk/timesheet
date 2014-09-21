app.service('authService', ['$q',function($q) {
  
  return{
    authenticate: function(){
      var defer = $q.defer();
      defer.resolve();
      //defer.reject();
      return defer.promise;
    },
    getUser: function(){
      var obj = {'name': 'Anupam Singh', 'id': '12902312'};
      var defer = $q.defer();
      defer.resolve(obj);
      return defer.promise;
    }
  }
  
}]);