/*global app*/
app.service('Repository', ['localStorage', '$q', function (localStorage, $q) {

  var map, uniqueKey = 'XXXX-ANUPAM-TIMESHEET-XXX';

  function init() {
    if (localStorage.has(uniqueKey)) {
      map = localStorage.get(uniqueKey).map || {};
    } else {
      localStorage.put(uniqueKey, { map: {}});
    }
  }

  function updateStorage() {
    localStorage.put(uniqueKey, { map: map});
  }

  function getMap(dateId) {
    if (!map[dateId]) {
      map[dateId] = [];
    }
    return map[dateId];
  }

  init();

  this.findByDate = function (dateId) {
    var tasks = getMap(dateId);
    var defer = $q.defer();
    defer.resolve(angular.copy(tasks));
    return defer.promise;
  };

  this.findById = function (id, dateId) {
    var defer = $q.defer(),
      data,
      i,
      found = false;

    if (!dateId) {
      defer.reject('dateId is required');
    } else {
      data = getMap(dateId);
      for (i = 0; i < data.length; i++) {
        if (data[i].id === id) {
          defer.resolve(angular.copy(data[i]));
          found = true;
          break;
        }
      }
      if (!found) {
        defer.reject();
      }
    }
    return defer.promise;
  };

  this.insert = function (aTask) {
    var dateId = aTask.dateId;
    var data = getMap(dateId);

    var defer = $q.defer();
    data.push(aTask);
    defer.resolve(aTask);
    updateStorage();
    return defer.promise;
  };
  this.update = function (aTask) {
    var i, data, defer, found,
      dateId = aTask.dateId;

    data = getMap(dateId);
    defer = $q.defer();
    found = false;
    for (i = 0; i < data.length; i++) {
      if (data[i].id === aTask.id) {
        data[i] = angular.copy(aTask);
        updateStorage();
        defer.resolve(aTask);
        found = true;
        break;
      }
    }
    if (!found) {
      defer.reject();
    }
    return defer.promise;
  };

  this.delete = function (aTaskId, dateId) {
    var defer = $q.defer(),
      found = false,
      data,
      i;

    data = getMap(dateId);
    for (i = 0; i < data.length; i++) {
      if (data[i].id === aTaskId) {
        found = true;
        break;
      }
    }
    if (!found) {
      defer.reject();
    } else {
      data.splice(i, 1);//[i] = angular.copy(aTask);
      defer.resolve();
      map[dateId] = data;
    }
    updateStorage();
    return defer.promise;
  };
}]);