'use strict';

/**
 * @ngdoc overview
 * @name projectProposalApp
 * @description
 * # projectProposalApp
 *
 * Main module of the application.
 */

/*  .module('projectProposalApp', ['hbpCommon','ui.select'])

.directive('multiUserSelect', function() {
	return {
		scope: true,
		template: '<hbp-user-selector hbp-on-select="handleUserSelection"></hbp-user-selector><hbp-usercard ng-repeat="u in selectedUsers" hbp-user="u" ></hbp-usercard></pre>',
		link: function(scope, elt, attr) {
			scope.selectedUsers = [];
			scope.handleUserSelection = function(options) {
				console.log('select', arguments);
				scope.selectedUsers.push(options.user);
				// TODO: elt.parent().find('input').attr(value, scope.selectedUser);
			}
		}
	}
})
.filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      var keys = Object.keys(props);

      items.forEach(function(item) {
        var itemMatches = false;

        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  };
})*/
angular
.module('projectProposalApp', ['ui.router','ui.select'/*,'hbpCommon','bbpOidcClient'*/])
.config(function ($stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('form', {
			url: '/form',
			templateUrl: 'views/form.html',
			controller:'formController'
		})
			.state('form.type', {
				url: '/type',
				templateUrl: 'views/type.html',
				controller: 'TypeCtrl'
			})
      .state('form.members', {
				url: '/members',
				templateUrl: 'views/members.html',
				controller: 'MembersCtrl'
			})
      .state('form.definitions', {
				url: '/definitions',
				templateUrl: 'views/definitions.html',
				controller: 'DefinitionsCtrl'
			})
      .state('form.deliverables', {
				url: '/deliverables',
				templateUrl: 'views/deliverables.html',
				controller: 'DeliverablesCtrl'
			})
      .state('form.summary', {
				url: '/summary',
				templateUrl: 'views/summary.html',
				//controller: 'SummaryCtrl'
			});
		$urlRouterProvider.otherwise('/form/type');
})

.controller('formController', function($scope) {
    // we will store all of our form data in this object
    $scope.record = {};
    $scope.date = new Date();
    $scope.nextPage = {};
    $scope.prevPage = {};

		// The available values for the different fields
	  $scope.availableTags = ["Science","Research","Testing","Computing"];
		$scope.availableGrants = ["Human Brain Project","Blue Brain Project","KAUST"];
		$scope.availableTasks = [
			{"name":"TaskHBP1","grant":"Human Brain Project"},
			{"name":"TaskHBP2","grant":"Human Brain Project"},
			{"name":"TaskBBP1","grant":"Blue Brain Project"},
			{"name":"TaskBBP2","grant":"Blue Brain Project"},
			{"name":"TaskKAUST1","grant":"KAUST"},
			{"name":"TaskKAUST2","grant":"KAUST"},
		];

    // function to process the form
    $scope.processForm = function() {
    };
})
.filter('objectByKeyValFilter', function () {
return function (input, filterKey, filterVal) {
    var filteredInput ={};
     angular.forEach(input, function(value, key){
       if(value[filterKey] && value[filterKey] !== filterVal){
          filteredInput[key]= value;
        }
     }
	 );
     return filteredInput;
}});
