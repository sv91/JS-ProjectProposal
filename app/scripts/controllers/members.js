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
  });
