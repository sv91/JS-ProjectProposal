'use strict';

/**
 * @ngdoc function
 * @name projectProposalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the projectProposalApp
 */
angular.module('projectProposalApp')
  .controller('DefinitionsCtrl', function ($scope) {
    $scope.record.newproject = 'true';
  })

    .directive('publicationPicker', function () {
    	return {
    		scope: true,
    		templateUrl: 'views/publicationPicker.html',
    		link: function postLink(scope) {
          if (!scope.record.publications) {
  					scope.record.publications = [
  						{"name": "", "link": ""}
  					];
  				}
    			scope.deletePublication = function (item) {
          resetBubble();
    				if (scope.record.publications.length < 2) {
    					scope.record.publications = [{"name": "", "link": ""}];
    					return;
    				}
            var index = scope.record.publications.indexOf(item);
            scope.record.publications.splice(index, 1);

    			};
    			scope.addPublication = function () {
    				scope.record.publications.push({"name": "", "link": ""});
    			};

    		}
    	};
    })
    .filter('taskFilter', function() {
      return function(input, list) {
        if(list == undefined){
          return input;
        }
        var output=[];
        angular.forEach(input,function(val){
          if (list.indexOf(val.grant)>-1){
              output.push(val);
          }
        })
        return output;
      }
    })
      .directive('relatedProjectPicker', function () {
      	return {
      		scope: true,
      		templateUrl: 'views/relatedProjectPicker.html',
      		link: function postLink(scope) {
            if (!scope.record.relatedProjects) {
    					scope.record.relatedProjects = [
    						{"name": "", "startDate": "", "endDate": "", "description": ""}
    					];
    				}
      			scope.deleteProject = function (item) {
            resetBubble();
      				if (scope.record.relatedProjects.length < 2) {
      					scope.record.relatedProjects = [
                  {"name": "", "startDate": "", "endDate": "", "description": ""}
                ];
      					return;
      				}
              var index = scope.record.relatedProjects.indexOf(item);
              scope.record.relatedProjects.splice(index, 1);

      			};
      			scope.addProject = function () {
      				scope.record.relatedProjects.push({"name": "", "startDate": "", "endDate": "", "description": ""});
      			};

      		}
      	};
      });
