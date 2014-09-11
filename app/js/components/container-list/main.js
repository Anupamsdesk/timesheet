app.directive('containerList', ['$compile', function($compile){
	return {
		templateUrl: 'js/components/container-list/template.html',
		restrict: 'A',
		replace: true,
		transclude: true,
		scope: {
			collection: '=',
			idAttribute: '@',
			labelAttribute: '@',
			classNames: '@',
			clickEvent: '=',
			show: '=',
			selectedId: '=',
			itemTemplate: '@'
		},
		controller: ['$scope', function(self){
			console.log('inside container-list-ctrl');
			self.selectedId = self.selectedId ? self.selectedId : -1;
			self.click = function(id, $event){
				console.log(id);
				self.selectedId = id;
				if (self.clickEvent){
					self.clickEvent(id);
				}
			};
			self.ifActiveGetClass = function(id){
				return (id === self.selectedId) ? 'active' : 'not-active';
			};
		}],
		link: function(scope, el, attrs){
			scope.$watchCollection('collection', function(v){
				console.log('CChere');
				clearAndRender();
			});
			scope.$watch('selectedId', function(){
				clearAndRender();
			});
			function clearAndRender(){
				el.find('li.list-item').remove();
				render();
			}
			function render(){
				var toAppend = '';
				var template1 = 
				"<li ng-repeat='item in collection' class='list-item {{ifActiveGetClass(item.id)}}' ng-click='click(item.id, $event)'>"
						+ "<div>	{{item.title}} </div>"
				+ "</li>";
				var template2 = 
				  "<li ng-repeat='item in collection' class='list-item {{ifActiveGetClass(item.id)}}' ng-click='click(item.id, $event)'>"
						+ "<span %itemTemplate%  class='%itemTemplate%' model='item'></span>"
				+ "</li>";

				for (var i=0; i<scope.collection.length; i++){
					var item = scope.collection[i];
					var classes= 'list-item ' + (scope.ifActiveGetClass(item.id));
					var temp1 = '<li ng-click="click(item.id, $event)" class="list-item {{ifActiveGetClass(item.id)}}"> <span %itemTemplate% class="" model="item"></span></li>';
					var temp2 = '<li ng-click="click(item.id, $event)" class="list-item {{ifActiveGetClass(item.id)}}"><span> {{item.title}}</span></li>';
					var toAppend = '';

					if (scope.itemTemplate){
						var find = '%itemTemplate%';
						var re = new RegExp(find, 'g');
						toAppend = temp1.replace(re, scope.itemTemplate);
					}else{
						toAppend = temp2;
					}
					var $ul = $(el.find('ul'));
					var ns = scope.$new();
					ns.item = item;
					$compile(toAppend)(ns, function(cloned, newscope){
						el.append(cloned);
					});
				}
			};
			render();
		}
	};
}]);