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

    .directive('singleUserSelect', function($log, hbpUserDirectory) {
  	return {
  	    scope: true,
  		template: '<hbp-user-selector hbp-on-select="handleUserSelection"></hbp-user-selector><hbp-usercard hbp-user="selectedUser" ></hbp-usercard></pre>',
  		link: function(scope, elt) {
  			// check if a user id is already set
  			var userId = elt.parent().find('input').attr('value');
  			if (userId) {
  				hbpUserDirectory.get([userId])
  				.then(function(users) {
  					scope.selectedUser = users[userId];
  				})
  				.catch($log.error);
  			}
      }
    };
  });
