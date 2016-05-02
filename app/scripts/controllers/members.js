'use strict';

/**
* @ngdoc function
* @name projectProposalApp.controller:DefinitionsCtrl
* @description
* # DefinitionsCtrl
* Controller responsible for the .members page.
*/
angular.module('projectProposalApp')
.controller('MembersCtrl', function ($scope) {
})

/**
* @ngdoc directive
* @name projectProposalApp.directive:selectPi
* @description
* # selectPi
* Input form to select an user as the project leader.
*/
.directive('selectPi', function($log, hbpIdentityUserDirectory) {
  return {
    scope: true,
    template: '<hbp-user-selector hbp-on-select="handleUserSelection(user)"></hbp-user-selector><hbp-usercard hbp-user="record.pi" ></hbp-usercard></pre>',
    link: function(scope, elt, attr) {
      scope.handleUserSelection = function(options) {
        console.log('select', arguments);
        scope.record.pi = options;
      }
    }
  }
})

/**
* @ngdoc directive
* @name projectProposalApp.directive:selectCopi
* @description
* # selectCopi
* Input form to select an user as the project co-leader.
*/
.directive('selectCopi', function($log, hbpIdentityUserDirectory) {
  return {
    scope: true,
    template: '<hbp-user-selector hbp-on-select="handleUserSelection(user)"></hbp-user-selector><hbp-usercard hbp-user="record.copi" ></hbp-usercard></pre>',
    link: function(scope, elt, attr) {
      scope.handleUserSelection = function(options) {
        console.log('select', arguments);
        scope.record.copi = options;
      }
    }
  }
})

/**
* @ngdoc directive
* @name projectProposalApp.directive:selectCopi
* @description
* # selectCopi
* Input form to select multiple user.
*/
.directive('multiUserSelect', function() {
  return {
    scope: true,
    template: '<hbp-user-selector hbp-on-select="handleUserSelection(user)"></hbp-user-selector><hbp-usercard ng-repeat="u in record.members" hbp-user="u" ></hbp-usercard></pre>',
    link: function(scope, elt, attr) {
      scope.handleUserSelection = function(options) {
        if(scope.record.members==undefined ||scope.record.members==null){
          scope.record.members = [];
        }
        console.log('select', arguments);
        scope.record.members.push(options);
      }
    }
  }
});
