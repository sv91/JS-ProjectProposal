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
  .directive('singleUserSelect', function($log, hbpUserDirectory) {
	return {
	    scope: true,
		template: '<hbp-user-selector hbp-on-select="handleUserSelection"></hbp-user-selector><hbp-usercard hbp-user="selectedUser" ></hbp-usercard></pre>',
		link: function(scope, elt, attr) {
			// check if a user id is already set
			var userId = elt.parent().find('input').attr('value');
			if (userId) {
				hbpUserDirectory.get([userId])
				.then(function(users) {
					scope.selectedUser = users[userId];
				})
				.catch($log.error);
			}

			scope.selectedUser = null;
			scope.handleUserSelection = function(options) {
				if(checkNames(options.user.displayName,elt.parent().find('input').attr('id'))){
					console.log('select', arguments);
					scope.selectedUser = options.user;
					elt.parent().find('input').attr('value', scope.selectedUser.displayName);
					elt.parent().find('p').find('input').attr('value', scope.selectedUser.id);
				}
			}
		}
	}
})
.directive('singleUserShow', function($log, hbpUserDirectory) {
	return {
	    scope: true,
		template: '<hbp-usercard hbp-user="selectedUser" ></hbp-usercard></pre>',
		link: function(scope, elt, attr) {
			// check if a user id is already set
			var userId = elt.parent().find('input').attr('value');
			if (userId) {
				hbpUserDirectory.get([userId])
				.then(function(users) {
					scope.selectedUser = users[userId];
				})
				.catch($log.error);
			}


			scope.selectedUser = null;
			scope.handleUserSelection = function(options) {
				console.log('select', arguments);
				scope.selectedUser = options.user;
				elt.parent().find('input').attr('value', scope.selectedUser.displayName);
				elt.parent().find('p').find('input').attr('value', scope.selectedUser.id);
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
.module('projectProposalApp', ['ui.router'])
.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
		'use strict';

		$stateProvider
			.state('type', {
				url: '/type',
				templateUrl: 'views/type.html',
				controller: 'TypeCtrl'
			})
      .state('members', {
				url: '/members',
				templateUrl: 'views/members.html',
				controller: 'MembersCtrl'
			})
      .state('definitions', {
				url: '/definitions',
				templateUrl: 'views/definitions.html',
				controller: 'DefinitionsCtrl'
			})
      .state('deliverables', {
				url: '/deliverables',
				templateUrl: 'views/deliverables.html',
				controller: 'DeliverablesCtrl'
			})
      .state('summary', {
				url: '/summary',
				templateUrl: 'views/summary.html',
				controller: 'SummaryCtrl'
			})
		$urlRouterProvider.otherwise('/type');
});
