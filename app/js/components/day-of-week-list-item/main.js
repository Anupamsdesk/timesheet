app.directive('dayOfWeekListItem', function(){
	return {
		templateUrl: 'js/components/day-of-week-list-item/template.html',
		scope: {
			model: '=',
		},
		controller: ['$scope', function(self){
			console.log(self);
			var splt = self.model.title.split(', ');
			self.title1 = splt[0];
			self.title2 = splt[1];
		}],
		restrict: 'AC',
		replace: true,
		transclude: true,
		link: function(scope, el, attrs){
			console.log('pppllink');
			//scope.idAttribute = scope.idAttribute ? scope.idAttribute : 'id';
			//scope.labelAttribute = scope.labelAttribute ? scope.labelAttribute : 'title';
		}
	};
});