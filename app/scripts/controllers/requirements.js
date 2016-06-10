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
          {'title':'','open':true,'feature': '', 'requirement': '','type':'','input':[],'output':[]}
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
          scope.record.requirements = [{'title':'','open':true,'feature': '', 'requirements': '','type':'','input':[],'output':[]}];
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
        scope.record.requirements.push({'title':'','open':true,'feature': '', 'requirements': '','type':'','input':[],'output':[]});
      };



      // Functions for the output ressources inside a requirement
      /**
      * @ngdoc function
      * @name deleteInput
      * @description
      * # deleteInput
      * Delete the specified input ressources.
      * If it is the only input ressource, reset it.
      * @param {Object} item The input ressources to delete.
      * @param {Object} del The requirement in which the input ressources have to be deleted.
      */
      scope.deleteInput = function (item,del) {
        resetBubble();
        var index = scope.record.requirements.indexOf(del);
        if (scope.record.requirements[index].input.length < 2) {
          scope.record.requirements[index].input = [];
          return;
        }
        var indexOutput = scope.record.requirements[index].input.indexOf(item);
        scope.record.requirements[index].input.splice(indexOutput, 1);
      };
      /**
      * @ngdoc function
      * @name addInput
      * @description
      * # addInput
      * Add an additional form for a input ressources in the specified requirement.
      * @param {Object} del The requirement in which the form have to be added.
      */
      scope.addInput = function (del) {
        var index = scope.record.requirements.indexOf(del);
        scope.record.requirements[index].input.push({'tag':'','format':'','number':'','size':'','open':true});
      };



      // Functions for the output ressources inside a requirement
      /**
      * @ngdoc function
      * @name deleteOutput
      * @description
      * # deleteOutput
      * Delete the specified output ressources.
      * If it is the only output ressource, reset it.
      * @param {Object} item The output ressources to delete.
      * @param {Object} del The requirement in which the output ressources have to be deleted.
      */
      scope.deleteOutput = function (item,del) {
        resetBubble();
        var index = scope.record.requirements.indexOf(del);
        if (scope.record.requirements[index].output.length < 2) {
          scope.record.requirements[index].output = [];
          return;
        }
        var indexOutput = scope.record.requirements[index].output.indexOf(item);
        scope.record.requirements[index].output.splice(indexOutput, 1);
      };
      /**
      * @ngdoc function
      * @name addOutput
      * @description
      * # addOutput
      * Add an additional form for a output ressources in the specified requirement.
      * @param {Object} del The requirement in which the form have to be added.
      */
      scope.addOutput = function (del) {
        var index = scope.record.requirements.indexOf(del);
        scope.record.requirements[index].output.push({'tag':'','format':'','number':'','size':'','open':true});
      };
    }
  };
});
