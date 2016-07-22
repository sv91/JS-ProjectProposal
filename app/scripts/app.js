'use strict';

/**
* @ngdoc overview
* @name projectProposalApp
* @description
* # projectProposalApp
*
* Main module of the application.
*/

angular
.module('projectProposalApp', ['ui.router','ui.select','angular.filter','hbpCommon','bbpOidcClient','ui.bootstrap','ngMaterial', 'ngMessages','ngStorage'])
.config(function ($stateProvider, $urlRouterProvider) {
	// link adresses to views and controllers
	$stateProvider
	.state('form', {
		url: '/form',
		templateUrl: 'views/form.html',
		controller:'formController'
	})
	.state('form.type', {
		url: '/type',
		templateUrl: 'views/type.html'
	})
	.state('form.members', {
		url: '/members',
		templateUrl: 'views/members.html',
		controller: 'MembersCtrl'
	})
	.state('form.summary', {
		url: '/summary',
		templateUrl: 'views/summary.html',
		controller: 'SummaryCtrl'
	})
	.state('form.requirements', {
		url: '/requirements',
		templateUrl: 'views/requirements.html',
		controller: 'RequirementsCtrl'
	})
	.state('form.deliverables', {
		url: '/deliverables',
		templateUrl: 'views/deliverables.html',
		controller: 'DeliverablesCtrl'
	})
	.state('form.review', {
		url: '/review',
		templateUrl: 'views/review.html',
		controller: 'ReviewCtrl'
	})
	.state('form.help', {
		url: '/help',
		templateUrl: 'views/help.html'
	})
	.state('form.updates', {
		url: '/updates',
		templateUrl: 'views/updates.html'
	})
	.state('form.finalize', {
		url: '/finalize',
		templateUrl: 'views/finalize.html',
		controller: 'FinalizeCtrl'
	});
	$urlRouterProvider.otherwise('/form/type');
})

.controller('formController', function($scope, hbpCollabStore, $localStorage) {
	// we will store all of our form data in this object
	if($scope.record == undefined | $scope.record == null){
		console.log('scope');
		$scope.record = $localStorage;
		$scope.summ = {};
		$scope.faq = '';
		// value of current date
		$scope.today = new Date();

		$scope.membersAndLead = [];
		$scope.log = [];

		// The available values for the different fields
		$scope.availableTags = ['Science','Research','Testing','Computing'];
		$scope.availableRoles = ['Deliverable lead','Technical Lead','Scientific Lead','Developper','Scientist'];
		$scope.availableGrants = ['Human Brain Project','Blue Brain Project','KAUST'];
		$scope.availableHardware = ['MacBook','PS4','iPhone'];
		$scope.availableTasks = [
			{'name':'TaskHBP1','grant':'Human Brain Project'},
			{'name':'TaskHBP2','grant':'Human Brain Project'},
			{'name':'TaskBBP1','grant':'Blue Brain Project'},
			{'name':'TaskBBP2','grant':'Blue Brain Project'},
			{'name':'TaskKAUST1','grant':'KAUST'},
			{'name':'TaskKAUST2','grant':'KAUST'},
		];
		$scope.availableSoftDev = [
			{'name':'Ticketing system','desc':'(JIRA, ...)'},
			{'name':'Continuous integration','desc':'(Jenkins, ...)'},
			{'name':'Wiki','desc':'(Confluence, ...)'},
			{'name':'Git repository','desc':''},
			{'name':'Gerrit review','desc':''}
		];
		$scope.availableArchitecture = [
			{'name':'Intel x86','desc':''},
			{'name':'Intel accelarators','desc':'(KNL, SKL, ...)'},
			{'name':'IBM Blue Gene/Q','desc':''},
			{'name':'IBM POWER7, POWER8','desc':''},
			{'name':'Nvidia GPU','desc':''}
		];
		$scope.availableArchitectureCloud = [
			{'name':'Amazon','desc':''},
			{'name':'BBP OpenStack','desc':''},
			{'name':'Other','desc':''}
		];
		$scope.availableVirtualization = [
			{'name':'Virtual Machine','desc':'(OpenStack, VMware, ...)'},
			{'name':'Container','desc':'(Docker, ...)'}
		];
		$scope.availableDevEnv = [
			{'name':'Compiler','desc':'(GCC, icc, ...)'},
			{'name':'Python','desc':'(2.6, 2.7, 3.1, 3.2)'},
			{'name':'Parallel environment','desc':'(MPI, OpenMP, Spark, ...)'}
		];
		$scope.availableTeams = [
			{'name':'Algorithms','shortName':'Algo','displayName':''},
			{'name':'Analysis','shortName':'Ana','displayName':''},
			{'name':'Building','shortName':'Build','displayName':''},
			{'name':'Data Integration','shortName':'DI','displayName':''},
			{'name':'Data Mining','shortName':'DM','displayName':''},
			{'name':'High Performance Computing','shortName':'HPC','displayName':''},
			{'name':'Infrastructure','shortName':'Infra','displayName':''},
			{'name':'Neurorobotics','shortName':'Neuro','displayName':''},
			{'name':'Platform','shortName':'Plat','displayName':''},
			{'name':'Simulation','shortName':'Sim','displayName':''},
			{'name':'Sub Cellular','shortName':'Sub','displayName':''},
			{'name':'Visualization','shortName':'Viz','displayName':''}
		];
		angular.forEach($scope.availableTeams,function(val){
			val.displayName = 'BBP Team: ' + val.name;
		});
		$scope.availableTypes = [
			{'name':'Bug','description':'Did you notice a bug?'},
			{'name':'Error','description':'Did an error appear?'},
			{'name':'Comment','description':'Do you have a comment?'}
		];
		$scope.availableDataTransfer = [
			{'name':'GridFTP','desc':''},
			{'name':'globus online','desc':''}
		];
		$scope.availableRequirements = [
			{'name':'Building','desc':'Define size of circuit, model, software to be used.'},
			{'name':'Simulation','desc':'Define typical simulation, expected time to solution, size of circuit, equations, software to be used.'},
			{'name':'Analysis','desc':'Define typical analysis and software package to be used.'},
			{'name':'Visualization','desc':'Define typical visualization, file format, software package to be used.'},
			{'name':'Web application','desc':''},
			{'name':'Infrastructure','desc':''}
		];
		$scope.availableFormats = [
			{'name':'HDF5'},
			{'name':'ASCII'}
		];

		// List of required fields for each level of proposal
		$scope.requiredFields = {};
		$scope.requiredFields.gold = [
			{'field':'projectTitle'},
			{'field':'projectStartDate'}
		];
		$scope.good = false;
		$scope.log=[];
		$scope.minDate = new Date();
		$scope.maxDate = new Date();
	}


	// Check if all the required values were filled
	$scope.$watch('record', function(attrs) {
		var level = $scope.record.projectType;
		var temp = true;
		angular.forEach($scope.fields,function(elem){
			if( elem.required >= level ){
				var iter = $scope.record[elem.name];
				if(iter == undefined || iter == '' || iter == null){
					temp = false;
				}
			}
		})
		$scope.good = temp;
	}, true);

	// Activate or disactivate the submit button
	$scope.$watch('good', function() {
		var classes = 'finalN';
		if(!$scope.good){
			classes += ' disabled';
		}
		document.getElementById('final').className = classes;
	});


	// Change the minimum date of the projects depending on the type of projects
	$scope.$watchGroup(['record.projectType', 'record.projectStartDate'], function() {
		$scope.minDate= new Date();
		var numberOfDaysToAdd = 0;
		if($scope.record.projectType == 2){
			numberOfDaysToAdd = 365;
		}
		var dateTemp = new Date();
		if($scope.record.projectStartDate!=undefined ){
			dateTemp = $scope.record.projectStartDate;
		}
		$scope.minDate.setDate(dateTemp.getDate() + numberOfDaysToAdd);
	});

	// Change the maximum date of the projects depending on the type of projects
	$scope.$watchGroup(['record.projectType', 'record.projectStartDate'], function() {
		$scope.maxDate= new Date();
		var numberOfDaysToAdd = 3650;
		if($scope.record.projectType == 0){
			numberOfDaysToAdd = 90;
		}
		if($scope.record.projectType == 1){
			numberOfDaysToAdd = 183;
		}
		var dateTemp = new Date();
		if($scope.record.projectStartDate!=undefined ){
			dateTemp = $scope.record.projectStartDate;
		};
		$scope.maxDate.setDate(dateTemp.getDate() + numberOfDaysToAdd);
	});

	// Load the Collabs informations
	function loadCollabs() {
		hbpCollabStore.list().then(function(rs) {return rs.toArray();})
		.then(function(arr){
			$scope.availableCollab = arr;
		})
	}
	loadCollabs();


	// function to process the form
	$scope.processForm = function() {
	};
});
