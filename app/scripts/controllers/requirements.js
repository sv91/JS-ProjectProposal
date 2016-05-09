'use strict';

/**
* @ngdoc function
* @name projectProposalApp.controller:RequirementsCtrl
* @description
* # RequirementsCtrl
* Controller responsible for the .requirements page.
*/
angular.module('projectProposalApp')
.controller('RequirementsCtrl', function () {
})

/**
* @ngdoc directive
* @name projectProposalApp.directive:publicationPicker
* @description
* # publicationPicker
* Directive managing the selection of one or more requirement for the
* .requirements page.
*/
.directive('requirementsPicker', function () {
  return {
    scope: true,
    templateUrl: 'views/requirementsPicker.html',
    link: function postLink(scope) {
      // Verify that the JSON part exists.
      if (!scope.record.requirements) {
        scope.record.requirements = [
          {'feature': '', 'requirement': '','type':''}
        ];
      }
      /**
      * @ngdoc function
      * @name deleteRequirement
      * @description
      * # deleteRequirement
      * Delete the specified requirement.
      * If it is the only requirement, reset it.
      * @param {Object} item The requirement to delete.
      */
      scope.deleteRequirement = function (item) {
        resetBubble();
        // If only one requirement, reset it instead of deleting.
        if (scope.record.requirements.length < 2) {
          scope.record.requirements = [{'feature': '', 'requirements': '','type':''}];
          return;
        }
        var index = scope.record.requirements.indexOf(item);
        scope.record.requirements.splice(index, 1);
      };

      /**
      * @ngdoc function
      * @name addRequirement
      * @description
      * # addRequirement
      * Add an additional form for a requirement.
      */
      scope.addRequirement = function () {
        scope.record.requirements.push({'feature': '', 'requirements': '','type':''});
      };
    }
  };
});
