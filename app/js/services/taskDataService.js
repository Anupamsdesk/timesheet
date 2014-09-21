/*globals app*/
/* Model Schema
{
  "dateId":"2014-02-27",
  "id":"ab9622f9-1925-40ab-aab3-27349022f933",
  "userId":1,
  "taskType":3,
  "category":3,
  "group":4,
  "timeMins":21,
  "timeHrs":71,
  "title":"feugiat non pretium quis lectus suspendisse",
  "taskDescription":"purus eu magna vulputate"
}
*/

app.service('TaskDataService', ['TaskOptionsService', '$q', 'authService', 'Repository', 'GuidService', function (TaskOptions, $q, auth, repository, guidService) {

  function getUserId() {
    return auth.getUser().id;
  }

  function generateTaskId() {
    return guidService.get();
  }

  function createDefaultTask(dateId) {
    return {
      dateId          : dateId,
      userId          : getUserId(),
      taskType        : 1,
      category        : 1,
      group           : 1,
      timeMins        : 0,
      timeHrs         : 0,
      title           : '',
      taskDescription : '',
      id              : generateTaskId()
    };
  }

  function getTasks(aDate) {
    return repository.findByDate(aDate);
  }
  function getTaskById(id, aDateId) {
    return repository.findById(id, aDateId);
  }

  function removeTask(id, dateId) {
    return repository.delete(id, dateId);
  }

  function createTask(aDate) {
    return createDefaultTask(aDate);
  }
  function save(aModel) {
    var defer = $q.defer();

    repository.findById(aModel.id, aModel.dateId).then(
      function () { //object exists already so update
        repository.update(aModel).then(function (data) {
          defer.resolve(data);
        }, function () {
          defer.reject('ERROR while updating');
        });
      },
      function () { //object does not exist so create
        repository.insert(aModel).then(function (data) {
          defer.resolve(data);
        }, function () {
          defer.reject('ERROR while inserting');
        });
      }
    );

    return defer.promise;
  }

  return {
    getTasks    : getTasks,
    getTaskById : getTaskById,
    getOptions  : TaskOptions.getOptions,
    createTask  : createTask,
    save        : save,
    removeTask  : removeTask
  };
}]);