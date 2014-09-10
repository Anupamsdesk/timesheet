app.directive('calWeekView', ['$compile', 'DateService', function($compile, DateService){
	return{
		templateUrl: 'js/components/week-view/template.html',
		restrict: 'AC',
		transclude: true,
		replace: true,
		scope: {
			today : '=',
			showMonthView : '='
		},
		controller: ['$scope', function($scope){
			
			function initialize(){
				$scope.collection = [];
				$scope.showList = true;
				$scope.selectedDateId = 0;
			}

			function updateWeek(){
				var dataDates = DateService.getAllDaysInWeek($scope.today);
				initialize();
				$scope.selectedDateId = 0;
				var collection =[];
				angular.forEach(dataDates, function(aDate, i){
					if (aDate.isSame($scope.today)){
						$scope.selectedDateId = i;
						console.log('Match!');
					}
					collection.push({date: aDate, id: i, title: DateService.toTitleString(aDate)});
				});
				$scope.collection = collection;
			}

			$scope.$watch('today', function(){
				console.log('changed week-view');
				updateWeek();
			});

			$scope.dayClicked = function(id){
				console.log('day clicked!');
				var vc='';
				angular.forEach($scope.collection, function(aModel){
					if (aModel.id === id){
						console.log(id);
						vc = aModel.date;
					}
				});
				$scope.today = vc;
			};

			$scope.previousWeek= function(){
				console.log('prev week');
				$scope.today = DateService.getDateBehindByOneWeek($scope.today);
				updateWeek();
			};
			$scope.nextWeek = function(){
				console.log('next week');
				$scope.today = DateService.getDateAheadByOneWeek($scope.today);
				updateWeek();
			};

			initialize();

			$scope.monthView = function(){
				console.log('here!!');
				$scope.showMonthView = true;
			};
		}]
	};
}]);