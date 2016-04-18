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

  .directive('deliverablePicker', function () {
    return {
      scope: true,
      templateUrl: 'views/deliverablePicker.html',
      link: function postLink(scope) {
        if (!scope.record.deliverables) {
          scope.record.deliverables = [
            {"name": "", "date": "", "risks": "", "description": "","dependency":[]}
          ];
        }
        scope.deleteDeliverable = function (item) {
        resetBubble();
          if (scope.record.deliverables.length < 2) {
            scope.record.deliverables = [{"name": "", "date": "", "risks": "", "description": "","dependency":[]}];
            return;
          }
          var index = scope.record.deliverables.indexOf(item);
          scope.record.deliverables.splice(index, 1);

        };
        scope.addDeliverable = function () {
          scope.record.deliverables.push({"name": "", "date": "", "risks": "", "description": "","dependency":[]});
        };

      }
    };
  })

  .directive('memberPicker', function () {
    return {
      scope: true,
      templateUrl: 'views/memberPicker.html',
      link: function postLink(scope) {
        if (!scope.record.members) {
          scope.record.members = [
            {"name": "", "link": ""}
          ];
        }
        scope.deleteMember = function (item) {
          if (scope.record.members.length < 2) {
            scope.record.members = [{"name": "", "link": ""}];
            return;
          }
          var index = scope.record.members.indexOf(item);
          scope.record.members.splice(index, 1);

        };
        scope.addMember = function () {
          scope.record.members.push({"name": "", "link": ""});
        };

      }
    };
  })

  ;
