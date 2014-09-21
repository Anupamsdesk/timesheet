app.service('Repository', ['localStorage', '$q', '_', function(localStorage, $q, _){

  console.log(localStorage);
  var data = [], self = this;
  var uniqueKey = 'XXXX-ANUPAM-TIMESHEET-XXX';

  function init(){
    if (localStorage.has(uniqueKey)){
      data = localStorage.get(uniqueKey).data;
    }else{
      localStorage.put(uniqueKey, {data: []});
    }
    console.log('initted!!');
  }
  function updateStorage(){
    localStorage.put(uniqueKey, {data: data});
  }

  init();

  this.findByDate = function(dateId){
    console.log(dateId);
    console.log(data);
    var tasks = _.filter(data, function(item){
      return item.dateId === dateId;
    });
    console.log(tasks);
    var defer = $q.defer();
    defer.resolve(tasks);
    return defer.promise;
  }

  this.findById = function(id){
    var defer = $q.defer();
    var found = false;
    for(var i=0; i<data.length; i++){
      if (data[i].id === id){
        defer.resolve(angular.copy(data[i]));
        found = true;
        break;
      }
    }
    if (!found){
      defer.reject();
    }
    return defer.promise;
  };
  this.insert = function (aTask){
    var defer = $q.defer();
    data.push(aTask);
    defer.resolve(aTask);
    updateStorage();
    return defer.promise;
  };
  this.update = function(aTask){
    var defer = $q.defer();
    var found = false;
    for(var i=0; i<data.length; i++){
      if (data[i].id === aTask.id){
        data[i] = angular.copy(aTask);
        defer.resolve(aTask);
        found = true;
      }
    }
    if (!found){
      defer.reject();
    }
    updateStorage();
    return defer.promise;
  };
  this.delete = function(aTaskId){
    var defer = $q.defer();
    var found = false;
    for(var i=0; i<data.length; i++){
      if (data[i].id === aTaskId){
        data.splice(i,1);//[i] = angular.copy(aTask);
        defer.resolve();
        found = true;
      }
    }
    if (!found){
      defer.reject();
    }
    updateStorage();
    return defer.promise;
  }
}]);