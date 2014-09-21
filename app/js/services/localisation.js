/*globals app*/
(function () {
  //Enter localisation values here
  var localisationMap = {
    'notFoundInLocale'      : 'Not found in Locale',
    'switchToMonthView'     : 'Switch to month view',
    'noTaskFound'           : 'No tasks were found',
    'totalTime'             : 'Total time',
    'hourMedium'            : 'hrs',
    'minMedium'             : 'mins',
    'hourShort'             : 'hh',
    'minShort'              : 'mm',
    //form labels
    'formLabel-group'       : 'Group',
    'formLabel-category'    : 'Category',
    'formLabel-taskType'    : 'Task type',
    'formLabel-task'        : 'Task',
    'formLabel-description' : 'Description',
    'formLabel-time'        : 'Time',
    'save'                  : 'Save',
    'reset'                 : 'Reset'
  };


  app.config(['$filterProvider', function ($filterProvider) {
    var notFound = localisationMap.notFoundInLocale;
    $filterProvider.register('localise', function () {
      return function (text) {
        return text && (localisationMap[text] || notFound);
      };
    });
  }]);
}());