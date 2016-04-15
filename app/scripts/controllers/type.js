'use strict';

/**
 * @ngdoc function
 * @name projectProposalApp.controller:TypeCtrl
 * @description
 * # TypeCtrl
 * Controller of the projectProposalApp for the selection of the project type.
 */
angular.module('projectProposalApp')
  .controller('TypeCtrl', function (scope) {
    $scope.nextPage = "form.type";
    $scope.prevPage = "form.members";
  });
