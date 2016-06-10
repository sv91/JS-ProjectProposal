'use strict';

/**
* @ngdoc function
* @name projectProposalApp.controller:SummaryCtrl
* @description
* # DefinitionsCtrl
* Controller responsible for the .summary page.
*/
angular.module('projectProposalApp')
.controller('SummaryCtrl', function ($scope) {
  // default value for the 'New Project' field.
  $scope.record.newproject = 'true';
  $scope.record.projectStartDateMD = new Date();
})

/**
* @ngdoc directive
* @name projectProposalApp.directive:publicationPicker
* @description
* # publicationPicker
* Directive managing the selection of one or more publication for the
* .definitions page.
*/
.directive('publicationPicker', function () {
  return {
    scope: true,
    templateUrl: 'views/publicationPicker.html',
    link: function postLink(scope) {
      // Verify that the JSON part exists.
      if (!scope.record.publications) {
        scope.record.publications = [
          {'name': '', 'link': ''}
        ];
      }
      /**
      * @ngdoc function
      * @name deletePublication
      * @description
      * # deletePublication
      * Delete the specified publication.
      * If it is the only publication, reset it.
      * @param {Object} item The publication to delete.
      */
      scope.deletePublication = function (item) {
        resetBubble();
        // If only one publication, reset it instead of deleting.
        if (scope.record.publications.length < 2) {
          scope.record.publications = [{'name': '', 'link': ''}];
          return;
        }
        var index = scope.record.publications.indexOf(item);
        scope.record.publications.splice(index, 1);
      };

      /**
      * @ngdoc function
      * @name addPublication
      * @description
      * # addPublication
      * Add an additional form for a publication.
      */
      scope.addPublication = function () {
        scope.record.publications.push({'name': '', 'link': ''});
      };
    }
  };
})

/**
* @ngdoc filter
* @name projectProposalApp.filter:taskFilter
* @description
* # taskFilter
* Filter used by the Tags field to show tasks related to the selected grants.
* @param {Array} input List of tasks to filter.
* @param {Array} list List of selected grants.
*/
.filter('taskFilter', function() {
  return function(input, list) {
    // If no selected grants, return the list unfiltered.
    if(list == undefined){
      return input;
    }

    var output=[];
    angular.forEach(input,function(val){
      if (list.indexOf(val.grant)>-1){
        output.push(val);
      }
    })
    return output;
  }
})

/**
* @ngdoc directive
* @name projectProposalApp.directive:relatedProjectPicker
* @description
* # relatedProjectPicker
* Directive managing the selection of one or more related projects for the
* .definitions page.
*/
.directive('relatedProjectPicker', function () {
  return {
    scope: true,
    templateUrl: 'views/relatedProjectPicker.html',
    link: function postLink(scope) {
      // Verify that the JSON part exists.
      if (!scope.record.relatedProjects) {
        scope.record.relatedProjects = [];
      }
      /**
      * @ngdoc function
      * @name deleteProject
      * @description
      * # deleteProject
      * Delete the specified project references.
      * If it is the only project, reset its references.
      * @param {Object} item The project to delete.
      */
      scope.deleteProject = function (item) {
        resetBubble();
        // If only one project, reset it instead of deleting.
        if (scope.record.relatedProjects.length < 1) {
          scope.record.relatedProjects = [];
          return;
        }
        var index = scope.record.relatedProjects.indexOf(item);
        scope.record.relatedProjects.splice(index, 1);

      };

      /**
      * @ngdoc function
      * @name addProject
      * @description
      * # addProject
      * Add an additional form for a related project.
      */
      scope.addProject = function () {
        scope.record.relatedProjects.push({'name': '', 'startDate': '', 'endDate': '', 'description': '','open':true});
      };
    }
  };
});
