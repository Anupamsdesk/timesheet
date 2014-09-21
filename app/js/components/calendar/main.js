app.directive('calMonthView', ['$compile','$location','DateService', function($compile, $location, DateService){
	return{
		scope: {
			today : '=',
			showMonthView: '='
		},
		templateUrl: 'js/components/calendar/template.html',
		restrict: 'AC',
		transclude: true,
		replace: true,
		controller: ['$scope', function(scope){
			function navigateToDate(aDate, view){
				var dId = DateService.toDateId(aDate);
				view = view || 'month-view';
				$location.url('/'+view+'?selectedDate='+ dId);
			}
			function calculateDateAndNavigate(){
				var dd = DateService.createDate(scope.currentDate.year, scope.currentDate.month);
				navigateToDate(dd);
			}
			
			scope.increase = function(numOfMonths){
				var dd = angular.copy(scope.today);
				navigateToDate(dd.add(numOfMonths, 'months'));
			};

			scope.selectDate = function(d){
				navigateToDate(moment(scope.today.date(d)), 'week-view');
			};

			scope.selectionChanged = function(){
				calculateDateAndNavigate();
			}

			scope.currentDate = {
				year: scope.today.year(),
				month: scope.today.format('MMMM'),
				day: scope.today.day()
			};
			scope.daysInMonth = DateService.getAllDaysInMonth(scope.today);
			scope.yearList = DateService.getYears(scope.today);
			scope.monthList = DateService.getMonths();
			scope.weekDayNames = DateService.getWeekDayNames();

			//setupWatches();
						
		}],
		link: function(scope, el, attrs){
			var daysInMonth = scope.daysInMonth;
			var templateDay        = '<a class="day" ng-click="selectDate(day)">{{day}}</a>',
				templateEmptyDay     = '<a class="day empty"></a>', 
				templateWeek         = '<div class="week"></div>',
				templateSelectOption = '<option value="{{optionId}}">{{value}}</option>';

			//populating the calendar month	
			el.find('.list').empty();
			el.find('.list').append(templateWeek);
			if (daysInMonth[0].format('d') > 0){
				for(var i=0; i<daysInMonth[0].format('d'); i++){
					$compile(templateEmptyDay)({}, function(compiled){
						el.find('.list .week:last').append(compiled);
					});	
				}
			}
			while(daysInMonth.length>0){
				var x = daysInMonth[0];
				var dayOfWeek = x.format('d')
				var sc = scope.$new();
				sc.day = x.format('D');
				if (dayOfWeek === '0'){
					el.find('.list').append(templateWeek);
				}
				$compile(templateDay)(sc, function(compiled){
					el.find('.list .week:last').append(compiled);
				});
				daysInMonth.shift();
			};
		}
	};
}]);