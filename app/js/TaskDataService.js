app.service('TaskDataService', function(){
	var userData = DATA;
	var uid = 1;
	function getTasks(aDate){
		var dateString = aDate.format('YYYY-MM-DD');
		var data = _.filter(userData, function(d){
			return d.dateId === dateString;
		});
		console.log('getTasks: ' + dateString);
		console.log(data.length);
		return data;
	}
	function getTaskById(id){
		console.log('get task by id: '+ id);
		var tasks = _.filter(userData, function(d){
			return d.id === id;
		});
		return tasks[0];

	}

	function getOptions(name){
		switch(name){
			case 'category':
				return [
					{id: 1, title: 'Development'},
					{id: 2, title: 'Database'},
					{id: 3, title: 'QA'},
					{id: 4, title: 'Design'},
					{id: 5, title: 'Other'}
				];
				break;
			case 'group':
				return [
					{id: 1, title: 'TAG'},
					{id: 2, title: 'Symphony'},
					{id: 3, title: 'MRM'},
					{id: 4, title: 'QA'},
					{id: 5, title: 'Other'}
				];
				break;
			case 'taskType':
				return [
					{id: 1, title: 'Development'},
					{id: 2, title: 'Design'},
					{id: 3, title: 'Meeting'},
					{id: 4, title: 'Internal meeting'},
					{id: 5, title: 'Client call'},
					{id: 6, title: 'Testing'},
					{id: 7, title: 'R&D'},
					{id: 8, title: 'Bug fixing'},
					{id: 9, title: 'Code review'}
				];
				break;
			default:
				return [];
				break;
		}
	}

	return{
		getTasks: getTasks,
		getTaskById: getTaskById,
		getOptions: getOptions
	}
});