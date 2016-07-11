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
.directive('selectPi', function(hbpIdentityUserDirectory,$window, $timeout) {
  return {
    scope: true,
    template: '<hbp-user-selector hbp-on-select="handleUserSelection(user)"></hbp-user-selector><hbp-usercard hbp-user="record.pi" ></hbp-usercard></pre>',
    link: function(scope, elt, attr) {
      scope.handleUserSelection = function(options) {
        var copi = false;
        if(scope.record.copi != undefined){
          copi = (scope.record.copi.id == options.id);
        }
        var member = false;
        angular.forEach(scope.record.members,function(mem){
          if (mem.id === options.id){
            member = true;
          }
        });
        if(!copi && !member){
          console.log('select', arguments);
          scope.record.pi = options;
        } else if(copi){
          $timeout(function(){
            $window.alert(options.displayName + " is already defined as Co-Project Leader.");
          });
        } else if(member){
          $timeout(function(){
            $window.alert(options.displayName + " is already defined as HBP Member.");
          });
        }
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
.directive('selectCopi', function(hbpIdentityUserDirectory,$window, $timeout) {
  return {
    scope: true,
    template: '<hbp-user-selector hbp-on-select="handleUserSelection(user)"></hbp-user-selector><hbp-usercard hbp-user="record.copi" ></hbp-usercard></pre>',
    link: function(scope, elt, attr) {
      scope.handleUserSelection = function(options) {
        var pi = false;
        if(scope.record.pi != undefined){
          pi = (scope.record.pi.id == options.id);
        }
        var member = false;
        angular.forEach(scope.record.members,function(mem){
          if (mem.id === options.id){
            member = true;
          }
        });
        if(!pi && !member){
          console.log('select', arguments);
          scope.record.copi = options;
        } else if(pi){
          $timeout(function(){
            $window.alert(options.displayName + " is already defined as Project Leader.");
          });
        } else if(member){
          $timeout(function(){
            $window.alert(options.displayName + " is already defined as HBP Member.");
          });
        }
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
.directive('multiUserSelect', function($window, $timeout) {
  return {
    scope: true,
    template: '<hbp-user-selector hbp-on-select="handleUserSelection(user)"></hbp-user-selector><hbp-usercard ng-repeat="u in record.members" hbp-user="u" ></hbp-usercard></pre>',
    link: function(scope, elt, attr) {
      scope.handleUserSelection = function(options) {
        if(scope.record.members==undefined ||scope.record.members==null){
          scope.record.members = [];
        }
        var pi = false;
        if(scope.record.pi != undefined){
          pi = (scope.record.pi.id == options.id);
        }
        var copi = false;
        if(scope.record.copi != undefined){
          copi = (scope.record.copi.id == options.id);
        }
        if(!pi && !copi){
          console.log('select', arguments);
          scope.record.members.push(options);
        } else if(pi){
          $timeout(function(){
            $window.alert(options.displayName + " is already defined as Project Leader.");
          });
        } else if(copi){
          $timeout(function(){
            $window.alert(options.displayName + " is already defined as Co-Project Leader.");
          });
        }
      }
    }
  }
});
