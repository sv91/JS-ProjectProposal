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
    })
    .directive('singleUserSelectPi', function($log, hbpIdentityUserDirectory) {
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
    .directive('singleUserSelectCopi', function($log, hbpIdentityUserDirectory) {
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
    })
    ;
