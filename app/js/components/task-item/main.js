app.directive('taskItem', ['$compile', function($compile){
	return{
		templateUrl: 'js/components/task-item/template.html',
		restrict: 'AC',
		transclude: true,
		replace: true,
		scope: {
			model: '='
		},
		controller: ['$scope', function(self){
			console.log('task item: ' + self.model);
		}]
	};
}]);