console.log('app.js');
var app = angular.module('app',['ngRoute']);
app.constant('moment',moment);
app.constant('_', _);

app.controller('appCtrl', ['$scope', 'moment', function($scope, moment){
	$scope.today = moment();
	$scope.showMonthView = true;
	$scope.$watch('today', function(){
		console.log('changed today!!');
		printDate();
	});
	function printDate(){
		console.log($scope.today.format("dddd, MMMM Do YYYY, h:mm:ss a"));
	}
}]);


app.service('DateService', ['moment', '_', function(moment, _){
	var self = this;
	this.createDate = function (year, month){
		var m = moment.months().indexOf(month);
		return moment({year: year, month: m, days: 1});
	};
	this.print = function(aDate){
		console.log(self.getLongString(aDate));
	};
	this.toLongString = function(aDate){
		return (aDate.format("dddd, MMMM Do YYYY, h:mm:ss a"));
	}
	this.toTitleString = function(aDate){
		return (aDate.format("dddd, MMMM Do"));	
	};
	this.getFirstDayOfMonth = function(m){
		var st = moment({y: m.year(), M: m.month(), d: 1});
		return st;
	};
	this.getAllDaysInMonth = function(m){
		var maxDays = m.daysInMonth();
		var days = [], year = m.year(), month = m.month();
		for(var i=1; i<=maxDays; i++){
			days.push(moment({year: year, month: month, days: i}));
		}
		return days;
	};
	this.getYears = function (m){
		var yr = m.year(), yrs = [];
		for(var i = yr-10; i<yr+10; i++){
			yrs.push(i);
		}
		return yrs;
	};
	this.getWeekDayNames = function(){
		return moment.weekdaysShort();
	};
	this.getMonths = function(){
		var mm = moment.months(), results=[];
		angular.forEach(mm,function(m, i){
			results.push(m);
		});
		return results;
	};

	this.getAllDaysInWeek = function(aDate){
		var data=[], startOfWeek = moment(aDate), i;
		startOfWeek.day(0);
		for(i=0; i<7; i++){
			data.push(moment(startOfWeek));
			startOfWeek.add(1, 'days');
		}
		return data;
	};

	this.getDateBehindByOneWeek = function (aDate){
		var d = moment(aDate);
		var day = -7;
		return d.add(day, 'd')
	};
	this.getDateAheadByOneWeek = function (aDate){
		var d = moment(aDate);
		var day = 7;
		return d.add(day, 'd')
	};

}]);	