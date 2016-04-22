'use strict';

/**
 * @ngdoc function
 * @name projectProposalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the projectProposalApp
 */
angular.module('projectProposalApp')
  .controller('DeliverablesCtrl', function () {
  })
  .filter('dependencyFilter', function() {
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
  .directive('deliverablePicker', function () {
    return {
      scope: true,
      templateUrl: 'views/deliverablePicker.html',
      link: function postLink(scope) {
        if (!scope.record.deliverables) {
          scope.record.deliverables = [
            {'name': '', 'date': '', 'risks': '', 'description': '','dependency':[],'members':[{'name': '', 'role': '', 'pm':'','description':''}],'HPC':'','cloud':''}
          ];
        }
        scope.deleteDeliverable = function (item) {
        resetBubble();
          if (scope.record.deliverables.length < 2) {
            scope.record.deliverables = [{'name': '', 'date': '', 'risks': '', 'description': '','dependency':[],'members':[{'name': '', 'role': '', 'pm':'','description':''}],'HPC':'','cloud':''}];
            return;
          }
          var index = scope.record.deliverables.indexOf(item);
          scope.record.deliverables.splice(index, 1);

        };
        scope.addDeliverable = function () {
          scope.record.deliverables.push({'name': '', 'date': '', 'risks': '', 'description': '','dependency':[],'members':[{'name': '', 'role': '', 'pm':'','description':''}],'HPC':'','cloud':''});
        };
        // Functions for the members inside a deliverable
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
        scope.addMember = function (del) {
          var index = scope.record.deliverables.indexOf(del);
          scope.record.deliverables[index].members.push({'name': '', 'role': '', 'pm':'','description':''});
        };

      }
    };
  })

  ;
