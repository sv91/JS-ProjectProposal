'use strict';

/**
 * @ngdoc function
 * @name projectProposalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the projectProposalApp
 */
angular.module('projectProposalApp')
  .controller('MembersCtrl', function ($scope) {
    $scope.record = {
      "principalInvestigator": {},
      "coPrincipalInvestigator":{},
  /*    "memberList":[
        "name":{},
        "sciper":{}
      ]*/
    };
    })
    .directive('singleUserSelect', function($log, hbpIdentityUserDirectory) {
    return {
    	scope: true,
    template: '<hbp-user-selector hbp-on-select="handleUserSelection"></hbp-user-selector><hbp-usercard hbp-user="selectedUser" ></hbp-usercard></pre>',
    link: function(scope, elt, attr) {
    	// check if a user id is already set
    	var userId = elt.parent().find('input').attr('value');
    	if (userId) {
    		hbpIdentityUserDirectory.get([userId])
    		.then(function(users) {
    			scope.selectedUser = users[userId];
    		})
    		.catch($log.error);
    	}

    	scope.selectedUser = null;
    	scope.handleUserSelection = function(options) {
    			console.log('select', arguments);
    			scope.selectedUser = options.user;
    			elt.parent().find('input').attr('value', scope.selectedUser.id);
    	}
    }
    }
    })

    .directive('multiUserSelect', function() {
    	return {
    		scope: true,
    		template: '<hbp-user-selector hbp-on-select="handleUserSelection"></hbp-user-selector><hbp-usercard ng-repeat="u in selectedUsers" hbp-user="u" ></hbp-usercard></pre>',
    		link: function(scope, elt, attr) {
    			scope.selectedUsers = [];
    			scope.handleUserSelection = function(options) {
    				console.log('select', arguments);
    				scope.selectedUsers.push(options.user);
    				elt.parent().find('input').attr(value, scope.selectedUser);
    			}
    		}
    	}
    })
    ;
