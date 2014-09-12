app.directive('dayDetailView', 
	['$compile', 'TaskDataService', function($compile, taskService){
	return{
		templateUrl: 'js/components/day-details/template.html',
		restrict: 'AC',
		transclude: true,
		replace: true,
		scope: {
			'selectedDateId': '=selectedId',
			'today': '='
		},
		controller: ['$scope', function(self){
			console.log('day-details controller');
			console.log(self.today);
			self.collection = taskService.getTasks(self.today);
			self.selectedId = self.collection.length> 0 ? self.collection[0].id: 1;
			self.model = taskService.getTaskById(self.selectedId);

			self.$watch('today', function(){
				console.log('detail --- changed today!!');
				self.collection = taskService.getTasks(self.today);
				self.model = taskService.getTaskById(self.selectedId);
			});

			self.$watch('selectedId', function(){
				console.log('id changed! '+ self.selectedId);
				self.model = taskService.getTaskById(self.selectedId);
			});

		}]
	};
}]);