app.service('TaskDataService', ['TaskOptionsService', function(TaskOptions){
  var userData = DATA;
  var uid = 1;
  function getTasks(aDate){
    var dateString = aDate.format('YYYY-MM-DD');
    var data = _.filter(userData, function(d){
      return d.dateId === dateString;
    });
    return data;
  }
  function getTaskById(id){
    console.log('get task by id: '+ id);
    var tasks = _.filter(userData, function(d){
      return d.id === id;
    });
    return tasks[0];
  }
  return{
    getTasks: getTasks,
    getTaskById: getTaskById,
    getOptions: TaskOptions.getOptions
  }
}]);