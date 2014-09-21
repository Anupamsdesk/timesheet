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

app.service('TaskDataService', ['TaskOptionsService', '$q', 'authService', 'Repository', function(TaskOptions, $q, auth, repository){
  
  var userData = [];
  var uid = 1;
  var counter = 1;
  
  function generateTaskId(){
    return Date().toString()+ uid + counter++;
  }

  function createDefaultTask(dateId){
    return {
      dateId: dateId,
      userId: uid,
      taskType: 1,
      category: 1,
      group: 1,
      timeMins: 0,
      timeHrs: 0,
      title: '',
      taskDescription: '',
      id: generateTaskId()
    };
  }

  function getUserId(){
    return auth.getUser().id;
  }

  function getTasks(aDate){
    return repository.findByDate(aDate);
  }
  function getTaskById(id){
    console.log('get task by id: '+ id);
    return repository.findById(id);
  }

  function removeTask(id){
    return repository.delete(id);
  }

  function createTask(aDate){
    return createDefaultTask(aDate);
  }
  function save(aModel){
    var defer = $q.defer();

    repository.findById(aModel.id).then(function(){
      console.log('repo: updating..');
      repository.update(aModel).then(function(data){
        defer.resolve(data);
      }, function(){
        defer.reject('ERROR while updating');
      });
    },
    function(){
      console.log('repo: inserting..');
      repository.insert(aModel).then(function(data){
        defer.resolve(data);
      }, function(){
        defer.reject('ERROR while inserting');
      });
    });

    return defer.promise;
  }

  return{
    getTasks: getTasks,
    getTaskById: getTaskById,
    getOptions: TaskOptions.getOptions,
    createTask: createTask,
    save: save,
    removeTask: removeTask
  }
}]);