/*globals app*/
app.directive('calMonthView', ['$compile',  '$location', 'DateService', function ($compile, $location, DateService) {
  return {
    scope: {
      today         : '=',
      showMonthView : '='
    },
    templateUrl : 'js/components/calendar/template.html',
    restrict    : 'AC',
    transclude  : true,
    replace     : true,
    controller  : ['$scope', function (scope) {
      function navigateToDate(aDate, view) {
        var dId = DateService.toDateId(aDate);
        view = view || 'month-view';
        $location.url('/' + view + '?selectedDate=' + dId);
      }
      function calculateDateAndNavigate() {
        var dd = DateService.createDate(scope.currentDate.year, scope.currentDate.month);
        navigateToDate(dd);
      }

      scope.increase = function (numOfMonths) {
        var dd = angular.copy(scope.today);
        navigateToDate(dd.add(numOfMonths, 'months'));
      };

      scope.selectDate = function (d) {
        //navigateToDate(moment(scope.today.date(d)), 'week-view');
        navigateToDate(scope.today.date(d), 'week-view');
      };

      scope.selectionChanged = function () {
        calculateDateAndNavigate();
      };

      scope.currentDate = {
        year: scope.today.year(),
        month: scope.today.format('MMMM'),
        day: scope.today.day()
      };
      scope.daysInMonth = DateService.getAllDaysInMonth(scope.today);
      scope.yearList = DateService.getYears(scope.today);
      scope.monthList = DateService.getMonths();
      scope.weekDayNames = DateService.getWeekDayNames();
    }],

    link: function (scope, el) {
      var daysInMonth       = scope.daysInMonth,
        templateDay         = '<a class="day" ng-click="selectDate(day)">{{day}}</a>',
        templateEmptyDay    = '<a class="day empty"></a>',
        templateWeek        = '<div class="week"></div>';
      var x, dayOfWeek, sc, i;

      function attachToDom(compiled) {
        el.find('.list .week:last').append(compiled);
      }

      //populating the calendar month 
      el.find('.list').empty();
      el.find('.list').append(templateWeek);
      if (daysInMonth[0].format('d') > 0) {
        for (i = 0; i < daysInMonth[0].format('d'); i++) {
          $compile(templateEmptyDay)({}, attachToDom);
        }
      }
      while (daysInMonth.length > 0) {
        x = daysInMonth[0];
        dayOfWeek = x.format('d');
        sc = scope.$new();
        sc.day = x.format('D');
        if (dayOfWeek === '0') {
          el.find('.list').append(templateWeek);
        }
        $compile(templateDay)(sc, attachToDom);
        daysInMonth.shift();
      }
    }
  };
}]);