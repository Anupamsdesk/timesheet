app.directive('taskItem', ['$compile', function($compile){
	return{
		templateUrl: 'js/components/task-item/template.html',
		restrict: 'AC',
		transclude: true,
		replace: true,
		scope: {
			model: '='
		},
		controller: ['$scope', function($scope){
			$scope.remove = function($event){
				$scope.$emit('delete-model', $scope.model);
				$event.stopPropagation();
			}
		}]
	};
}]);