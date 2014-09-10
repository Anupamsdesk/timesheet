app.directive('calMonthView', ['$compile', 'DateService', function($compile, DateService){
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
			console.log('controller');
			scope.today = scope.today || moment();
			function initCurrentDate(){
				scope.currentDate = {
					year: scope.today.year(),
					month: scope.today.format('MMMM'),
					day: scope.today.day()
				};	
			}

			initCurrentDate();
			
			scope.dateChanged = function(){
				scope.today = DateService.createDate(scope.currentDate.year, scope.currentDate.month);
				scope.daysInMonth = DateService.getAllDaysInMonth(scope.today);
				console.log('updated scope');
				scope.yearList = DateService.getYears(scope.today);
				scope.monthList = DateService.getMonths();
				scope.weekDayNames = DateService.getWeekDayNames();
			};
			
			scope.increase = function(){
				scope.today.add(1, 'months');
				initCurrentDate();
			};
			scope.decrease = function(){
				scope.today.add(-1, 'months');;
				console.log(scope.today.month());
				initCurrentDate();
			};
			scope.selectDate = function(d){
				console.log('date selected');
				scope.today = moment(scope.today.date(d));
				//DateService.print(scope.today);
				
				//scope.today.date(d);
				
				//.scope.today = moment(scope.today);
				//scope.today = moment(scope.today.date(d));//moment({year: scope.currentDate.year, month: scope.currentDate.month, day: d});
				scope.showMonthView = false;
			};
			scope.$watch('currentDate.year', function(){
				scope.dateChanged();
			});
			scope.$watch('currentDate.month', function(){
				scope.dateChanged();
			});
		}],
		link: function(scope, el, attrs){
			scope.$watch('daysInMonth', function(){
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
			});
		}
	};
}]);