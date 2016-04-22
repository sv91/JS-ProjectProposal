'use strict';

/**
* @ngdoc function
* @name projectProposalApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the projectProposalApp
*/
angular.module('projectProposalApp')
.controller('SummaryCtrl', function ($scope) {

  $scope.summ.softdev=[];
  $scope.summ.collabs=[];
  $scope.summ.architecture=[];
  $scope.summ.hpc={'runs':0,'partition':0,'time':0,'numarte':0,'sizearte':0};
  $scope.summ.cloud={'runs':0,'partition':0,'time':0,'numarte':0,'sizearte':0};
  $scope.summ.hardware=[];
  $scope.summ.members=[];

  function addIfNotNull(val){
    if (val!=null && val!=undefined ){
      return val;
    }
    return 0;
  }

  function refresh(){
    angular.forEach($scope.record.deliverables,function(val){
      angular.forEach(val.softdev,function(val2){
        if ($scope.summ.softdev.indexOf(val2)==-1){
          $scope.summ.softdev.push(val2);
        }
      })
      angular.forEach(val.collabs,function(val2){
        if ($scope.summ.collabs.indexOf(val2)==-1){
          $scope.summ.collabs.push(val2);
        }
      })
      angular.forEach(val.architecture,function(val2){
        if ($scope.summ.architecture.indexOf(val2)==-1){
          $scope.summ.architecture.push(val2);
        }
      })
      $scope.summ.hpc.runs+= addIfNotNull(val.HPC.runs);
      $scope.summ.hpc.partition+= addIfNotNull(val.HPC.partition);
      $scope.summ.hpc.time+= addIfNotNull(val.HPC.time);
      $scope.summ.hpc.numarte+= addIfNotNull(val.HPC.numarte);
      $scope.summ.hpc.sizearte+= addIfNotNull(val.HPC.sizearte)*addIfNotNull(val.HPC.numarte);
      $scope.summ.cloud.runs+= addIfNotNull(val.cloud.runs);
      $scope.summ.cloud.partition+= addIfNotNull(val.cloud.partition);
      $scope.summ.cloud.time+= addIfNotNull(val.cloud.time);
      $scope.summ.cloud.numarte+= addIfNotNull(val.cloud.numarte);
      $scope.summ.cloud.sizearte+= addIfNotNull(val.cloud.sizearte)*addIfNotNull(val.cloud.numarte);

      angular.forEach(val.hardware,function(val2){
        if ($scope.summ.hardware.indexOf(val2)==-1){
          $scope.summ.hardware.push(val2);
        }
      })
    });

    $scope.summ.cloud.sizearte = $scope.summ.cloud.sizearte/$scope.summ.cloud.numarte;
    $scope.summ.hpc.sizearte = $scope.summ.hpc.sizearte/$scope.summ.hpc.numarte;
  }
  refresh();
});
