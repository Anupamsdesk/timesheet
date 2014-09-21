/*globals app*/
app.directive('dayOfWeekListItem', function () {
  return {
    templateUrl : 'js/components/day-of-week-list-item/template.html',
    scope       : {
      model : '='
    },
    controller  : ['$scope', function (self) {
      var splt        = self.model.title.split(', ');
      self.title1     = splt[0];
      self.title2     = splt[1];
      self.collection = [];
    }],
    restrict    : 'AC',
    replace     : true,
    transclude  : true
  };
});