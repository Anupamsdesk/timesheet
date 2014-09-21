/*globals app*/
app.directive('containerList', ['$compile', function ($compile) {
  return {
    templateUrl : 'js/components/container-list/template.html',
    restrict    : 'A',
    replace     : true,
    transclude  : true,
    scope       : {
      collection      : '=',
      idAttribute     : '@',
      labelAttribute  : '@',
      classNames      : '@',
      clickEvent      : '=',
      show            : '=',
      selectedId      : '=',
      itemTemplate    : '@',
      notFoundText    : '@'
    },
    controller  : ['$scope', function (self) {
      self.selectedId = self.selectedId || -1;
      self.click = function (id) {
        self.selectedId = id;
        if (self.clickEvent) {
          self.clickEvent(id);
        }
      };
      self.ifActiveGetClass = function (id) {
        return (id === self.selectedId) ? 'active' : 'not-active';
      };
      self.notFoundText = self.notFoundText || 'No records found!';
    }],
    link        : function (scope, el) {
      function render() {
        var toAppend = '', i, item, temp1, temp2, find, re, ns;

        function attachToDom(compiled) {
          el.append(compiled);
        }

        for (i = 0; i < scope.collection.length; i++) {
          item     = scope.collection[i];
          temp1    = '<li ng-click="click(item.id, $event)" class="list-item {{ifActiveGetClass(item.id)}}"> <span %itemTemplate% class="" model="item"></span></li>';
          temp2    = '<li ng-click="click(item.id, $event)" class="list-item {{ifActiveGetClass(item.id)}}"><span> {{item.title}}</span></li>';
          toAppend = '';

          if (scope.itemTemplate) {
            find      = '%itemTemplate%';
            re        = new RegExp(find, 'g');
            toAppend  = temp1.replace(re, scope.itemTemplate);
          } else {
            toAppend  = temp2;
          }
          ns = scope.$new();
          ns.item = item;
          $compile(toAppend)(ns, attachToDom);
        }
      }//end of render


      function clearAndRender() {
        el.find('li.list-item').remove();
        render();
      }

      render();

      scope.$watchCollection('collection', function () {
        clearAndRender();
      });
      scope.$watch('selectedId', function () {
        clearAndRender();
      });
    }
  };
}]);