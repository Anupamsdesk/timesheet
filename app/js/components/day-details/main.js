app.directive('dayDetailView', 
	['$compile', 'TaskDataService', 'DateService', function($compile, taskService, DateService){
	return{
		templateUrl: 'js/components/day-details/template.html',
		restrict: 'AC',
		transclude: true,
		replace: true,
		scope: {
			'selectedDateId': '=selectedId',
			'today': '='
		},
		controller: ['$scope', function(self){
			self.totalTime = {
				timeHrs: 0,
				timeMins: 0
			};
			self.statusLabel='label-success';
			self.collection = [];
			

			/** Watch Expressions **/
			self.$watch('collection', function(){
				computeSummary(self.collection);
				console.log('collection changed');
				if (self.collection.length > 0){
					self.selectedId =  self.selectedId ? self.selectedId : self.collection[0].id;
					taskService.getTaskById(self.selectedId).then(function(aModel){
						self.model = aModel;
					});;
					//console.log(self.model);
				}
				else{
					self.selectedId = -1;
					self.model = '';
				}
				
			});
			self.$watch('selectedId', function(){
				console.log('id changed! '+ self.selectedId);
				taskService.getTaskById(self.selectedId).then(function(aModel){
					self.model = aModel;
				});
			});
			self.$on('delete-model', function(evt, aModel){
				console.log('DELETE MODEL!');
				console.log(aModel);
				taskService.removeTask(aModel.id).then(function(){
					refreshTaskCollection();
				}, function(){
					console.log("ERROR IN DELETION!");
				})
			});
			self.$on('model-changed', function(evt, aModel){
				console.log('MODEL CHANGED!!!');
				//console.log(aModel);
				self.selectedId = aModel.id;
				refreshTaskCollection();
			});

			refreshTaskCollection();

			self.addTask = function(){
				var task = taskService.createTask(DateService.toDateId(self.today));
				self.collection.push(task);
				self.model = task;
			}

			function refreshTaskCollection(){
				taskService.getTasks(DateService.toDateId(self.today)).then(function(data){
					self.collection = data;
				});				
			}


			function computeSummary(aCollection){
				var totalHrs =0, totalMins=0;
				angular.forEach(aCollection, function(task){
					totalHrs += task.timeHrs;
					totalMins += task.timeMins;
					console.log(task);
				});
				totalHrs += parseInt(totalMins/60, 10);
				totalMins = totalMins % 60;
				self.totalTime.timeHrs = totalHrs;
				self.totalTime.timeMins = totalMins;
				console.log(self.totalTime);

				//compute status
				if (totalHrs > 24){
					self.statusLabel = 'label-danger';
				}
				else if (totalHrs > 12){
					self.statusLabel = 'label-warning';
				}
				else if (totalHrs < 5){
					self.statusLabel = 'label-warning';
				}else {
					self.statusLabel = 'label-success';
				}
			}
		}]
	};
}]);