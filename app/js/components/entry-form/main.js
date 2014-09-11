app.directive('entryForm', ['TaskDataService', 
	function(DataService){
	return {
		templateUrl: 'js/components/entry-form/template.html',
		restrict: 'A',
		replace: true,
		transclude: true,
		scope: {
			model : '='
		},
		controller: ['$scope', function(self){
			console.log(self.model);
			self.catgeories = DataService.getOptions('category');
			self.taskTypes = DataService.getOptions('taskType');
			self.groups = DataService.getOptions('group');

			self.save = function(){
				console.log(self.model);
			}
			self.$watch('model', function(){
				console.log(self.model);
			});
		}]
	};
}]);