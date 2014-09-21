/*globals app*/
app.directive('calWeekView', ['DateService', '$location', function (DateService, $location) {
  return {
    templateUrl: 'js/components/week-view/template.html',
    restrict: 'AC',
    transclude: true,
    replace: true,
    scope: {
      today : '=',
      showMonthView : '='
    },
    controller: ['$scope', function ($scope) {

      function initialize() {
        $scope.collection = [];
        $scope.showList = true;
        $scope.selectedDateId = 0;
      }

      function navigateToDate(aDate, view) {
        view = view || 'week-view';
        $location.url('/' + view + '?selectedDate=' + DateService.toDateId(aDate));
      }

      function updateWeek() {
        var dataDates = DateService.getAllDaysInWeek($scope.today);
        var collection = [];
        initialize();
        $scope.selectedDateId = 0;
        angular.forEach(dataDates, function (aDate, i) {
          if (aDate.isSame($scope.today)) {
            $scope.selectedDateId = i;
          }
          collection.push({date: aDate, id: i, title: DateService.toTitleString(aDate)});
        });
        $scope.collection = collection;
      }

      $scope.dayClicked = function (id) {
        var i;
        for (i = 0; i < $scope.collection.length; i++) {
          if ($scope.collection[i].id === id) {
            navigateToDate($scope.collection[i].date);
          }
        }
      };

      $scope.previousWeek = function () {
        navigateToDate(DateService.getDateBehindByOneWeek($scope.today));
      };
      $scope.nextWeek = function () {
        navigateToDate(DateService.getDateAheadByOneWeek($scope.today));
      };
      $scope.monthView = function () {
        navigateToDate($scope.today, 'month-view');
      };

      updateWeek();

    }]
  };
}]);