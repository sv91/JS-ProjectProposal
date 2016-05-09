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
.module('projectProposalApp', ['ui.router','ui.select','angular.filter','hbpCommon','bbpOidcClient','ui.bootstrap'])
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
		controller: 'SummaryCtrl'
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

.controller('formController', function($scope, hbpCollabStore) {
	// we will store all of our form data in this object
	$scope.record = {};
	$scope.summ = {};
	// value of current date
	$scope.date = new Date();

	$scope.membersAndLead = [];

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
		{'name':'Algorithms','shortName':'Algo'},
		{'name':'Analysis','shortName':'Ana'},
		{'name':'Building','shortName':'Build'},
		{'name':'Data Integration','shortName':'DI'},
		{'name':'Data Mining','shortName':'DM'},
		{'name':'High Performance Computing','shortName':'HPC'},
		{'name':'Infrastructure','shortName':'Infra'},
		{'name':'Neurorobotics','shortName':'Neuro'},
		{'name':'Platform','shortName':'Plat'},
		{'name':'Simulation','shortName':'Sim'},
		{'name':'Sub Cellular','shortName':'Sub'},
		{'name':'Visualization','shortName':'Viz'}
	];

	$scope.availableCollab=[];
	//Get the list of collabs

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
