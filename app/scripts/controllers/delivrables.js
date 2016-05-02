'use strict';

/**
* @ngdoc function
* @name projectProposalApp.controller:DefinitionsCtrl
* @description
* # DefinitionsCtrl
* Controller responsible for the .deliverables page.
*/
angular.module('projectProposalApp')
.controller('DeliverablesCtrl', function ($scope) {
  /**
  * @ngdoc function
  * @name addPerson
  * @description
  * # addPerson
  * Add the specified person to the membersAndLead array if it is not yet there.
  * @param {Object} person The person to add.
  */
  function addPerson(person){
    if($scope.membersAndLead.indexOf(person)==-1){
      $scope.membersAndLead.push(person);
    }
  }

  // Add every selected members.
  if($scope.record.members!=undefined && $scope.record.members!=null){
    angular.forEach($scope.record.members,function(people){
      addPerson(people);
    });
  }
  // Add the project leader.
  addPerson($scope.record.pi);
  // If a co-leader have been chosen, add it.
  if($scope.record.copi!=undefined && $scope.record.copi!=null){
    addPerson($scope.record.copi);
  }
})

/**
* @ngdoc filter
* @name projectProposalApp.filter:dependencyFilter
* @description
* # dependencyFilter
* Filter used by the dependency field to remove deliverables that will cause a
* dependency loop.
* @param {Array} input List of deliverables to filter.
* @param {String} optional1 Name of the deliverable that may cause a loop.
*/
.filter('dependencyFilter', function() {
  /**
  * @ngdoc function
  * @name dependencyCheck
  * @description
  * # dependencyCheck
  * Recursive function that verifies if the given deliverable appears as a
  * a dependency for the provided deliverable.
  * @param {Object} val Deliverable in which the dependency is checked.
  * @param {String} optional1 Name of the deliverable that is looked for.
  */
  function dependencyCheck(val,optional1){
    var depend = true;
    angular.forEach(val.dependency,function(dep){
      if (dep.name === optional1){
        return false;
      }
      depend = dependencyCheck(dep,optional1);
    });
    return depend ;
  }

  return function(input, optional1) {
    var output=[];
    angular.forEach(input,function(val){
      if (val.name !== optional1){
        var depend = dependencyCheck(val,optional1);
        if(depend){
          output.push(val);
        }
      }
    });
    return output;
  };
})

/**
* @ngdoc directive
* @name projectProposalApp.directive:deliverablePicker
* @description
* # deliverablePicker
* Directive managing the deliverables for the .deliverables page.
*/
.directive('deliverablePicker', function () {
  return {
    scope: true,
    templateUrl: 'views/deliverablePicker.html',
    link: function postLink(scope) {
      // Verify that the JSON part exists.
      if (!scope.record.deliverables) {
        scope.record.deliverables = [
          {'name': '', 'date': '', 'risks': '', 'description': '','dependency':[],'members':[{'name': '', 'role': '', 'pm':'','description':''}],'HPC':'','cloud':''}
        ];
      }

      /**
      * @ngdoc function
      * @name deleteDeliverable
      * @description
      * # deleteDeliverable
      * Delete the specified deliverable.
      * If it is the only deliverable, reset it.
      * @param {Object} item The deliverable to delete.
      */
      scope.deleteDeliverable = function (item) {
        resetBubble();
        if (scope.record.deliverables.length < 2) {
          scope.record.deliverables = [{'name': '', 'date': '', 'risks': '', 'description': '','dependency':[],'members':[{'name': '', 'role': '', 'pm':'','description':''}],'HPC':'','cloud':''}];
          return;
        }
        var index = scope.record.deliverables.indexOf(item);
        scope.record.deliverables.splice(index, 1);

      };


      /**
      * @ngdoc function
      * @name addDeliverable
      * @description
      * # addDeliverable
      * Add an additional form for a deliverable.
      */
      scope.addDeliverable = function () {
        scope.record.deliverables.push({'name': '', 'date': '', 'risks': '', 'description': '','dependency':[],'members':[{'name': '', 'role': '', 'pm':'','description':''}],'HPC':'','cloud':''});
      };

      // Functions for the members inside a deliverable
      /**
      * @ngdoc function
      * @name deleteMember
      * @description
      * # deleteMember
      * Delete the specified member.
      * If it is the only member, reset it.
      * @param {Object} item The member to delete.
      * @param {Object} del The deliverable in which the member have to be deleted.
      */
      scope.deleteMember = function (item,del) {
        resetBubble();
        var index = scope.record.deliverables.indexOf(del);
        if (scope.record.deliverables[index].members.length < 2) {
          scope.record.deliverables[index].members = [{'name': '', 'role': '', 'pm':'','description':''}];
          return;
        }
        var indexMember = scope.record.deliverables[index].members.indexOf(item);
        scope.record.deliverables[index].members.splice(indexMember, 1);
      };
      /**
      * @ngdoc function
      * @name addMember
      * @description
      * # addMember
      * Add an additional form for a member in the specified deliverable.
      * @param {Object} del The deliverable in which the form have to be added.
      */
      scope.addMember = function (del) {
        var index = scope.record.deliverables.indexOf(del);
        scope.record.deliverables[index].members.push({'name': '', 'role': '', 'pm':'','description':''});
      };
    }
  };
});
