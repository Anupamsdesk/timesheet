app.service('TaskDataService', function(){
	var uid = 1;
	function getTasks(aDate){
		return 	[{
					id: 1,
					title: 'A task of Id: 1',
					timeHrs: 5,
					timeMins: 30,
					category: 1,
					taskType: 9,
					group: 5,
					description: 'This is description 1'
				},
				{
					id: 2,
					title: 'A task of Id: 2',
					timeHrs: 7,
					timeMins: 45,
					category: 2,
					taskType: 8,
					group: 2,
					description: 'This is description 2'
				},
				{
					id: 3,
					title: 'A task of Id: 3',
					timeHrs: 9,
					timeMins: 55,
					category: 3,
					taskType: 7,
					group: 4,
					description: 'This is description 3'
				}];
	}
	function getTaskById(id){
		console.log('get task by id: '+ id);
		var tasks = getTasks();
		for(var i=0; i<=tasks.length; i++){
			if (tasks[i].id === id){
				return tasks[i];
			}
		}
		return '';
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