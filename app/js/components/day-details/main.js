app.directive('dayDetailView', 
	['$compile', 'TaskDataService', function($compile, taskService){
	return{
		templateUrl: 'js/components/day-details/template.html',
		restrict: 'AC',
		transclude: true,
		replace: true,
		scope: {
			'selectedDateId': '=selectedId'
		},
		controller: ['$scope', function(self){
			console.log('day-details controller');
			self.collection = taskService.getTasks();
			self.selectedId = self.collection.length> 0 ? self.collection[0].id: 1;
			self.model = taskService.getTaskById(self.selectedId);

			self.$watch('selectedId', function(){
				console.log('id changed! '+ self.selectedId);
				self.model = taskService.getTaskById(self.selectedId);
			});

		}]
	};
}]);