'use strict';

/**
* @ngdoc function
* @name projectProposalApp.controller:ReviewCtrl
* @description
* # ReviewCtrl
* Controller responsible for the .review page.
*/
angular.module('projectProposalApp')
.controller('ReviewCtrl', function ($scope) {

  $scope.summ.softdev=[];
  $scope.summ.collabs=[];
  $scope.summ.datatransfer=[];
  $scope.summ.virtualization=[];
  $scope.summ.devenv=[];
  $scope.summ.architecture=[];
  $scope.summ.architectureC=[];
  $scope.summ.hpc={'runs':0,'partition':0,'time':0,'numarte':0,'sizearte':0};
  $scope.summ.cloud={'runs':0,'partition':0,'time':0,'numarte':0,'sizearte':0};
  $scope.summ.hardware=[];
  $scope.summ.members=[];
  $scope.summ.deliverables=[];

  /**
  * @ngdoc function
  * @name addIfNotNull
  * @description
  * # addIfNotNull
  * Verify if a value is defined, if not return 0.
  * @param {int} val The value to check.
  */
  function addIfNotNull(val){
    if (val!=null && val!=undefined ){
      return val;
    }
    return 0;
  }

  /**
  * @ngdoc function
  * @name findMember
  * @description
  * # findMember
  * Look for the index of the specified person in the record.summ.members JSON.
  * @param {Object} person The person looked for.
  */
  function findMember(person, where){
    var index=-1;
    var goodIndex =-1;
    angular.forEach(where,function(val2){
      index++;
      if (val2.name==person){
        goodIndex = index;
      }
    })
    return goodIndex;
  }

  /**
  * @ngdoc function
  * @name refresh
  * @description
  * # refresh
  * Calculate and set all the values for the summary.
  */
  function refresh(){
    angular.forEach($scope.record.deliverables,function(val){
      var temp ={};
      temp.softdev=[];
      temp.datatransfer=[];
      temp.virtualization=[];
      temp.devenv=[];
      temp.collabs=[];
      temp.architecture=[];
      temp.architectureC=[];
      temp.hpc={'runs':0,'partition':0,'time':0,'numarte':0,'sizearte':0};
      temp.cloud={'runs':0,'partition':0,'time':0,'numarte':0,'sizearte':0};
      temp.hardware=[];
      temp.members=[];
      temp.name=val.name;
      temp.date=val.date;
      temp.risks=val.risks;
      temp.desc=val.description;
      temp.dependency=val.dependency;


      $scope.summ.hpcRessource = ($scope.summ.hpcRessource || val.hpcRessource);
      temp.hpcRessource = val.hpcRessource;
      $scope.summ.cloudRessource = ($scope.summ.cloudRessource || val.cloudRessource);
      temp.cloudRessource = val.cloudRessource;

      /**
      * @ngdoc function
      * @name add
      * @description
      * # add
      * Verify if a value is present in the two arrays and if not add it into it.
      * @param {Object} origin The object to add.
      * @param {Object} summ First array.
      * @param {Object} tempo Second array.
      */
      function add(origin,summ,tempo){
        angular.forEach(origin,function(val2){
          if (summ.indexOf(val2)==-1){
            summ.push(val2);
          }
          if (tempo.indexOf(val2)==-1){
            tempo.push(val2);
          }
        })
      }

      /**
      * @ngdoc function
      * @name add
      * @description
      * # add
      * Verify if a value is present in the two arrays and if not add it into it.
      * @param {Object} origin The object to add.
      * @param {Object} summ First array.
      * @param {Object} tempo Second array.
      */
      function add(origin,summ,tempo){
        angular.forEach(origin,function(val2){
          if (summ.indexOf(val2)==-1){
            summ.push(val2);
          }
          if (tempo.indexOf(val2)==-1){
            tempo.push(val2);
          }
        })
      }

      // Filling the arrays
      add(val.softdev,$scope.summ.softdev,temp.softdev);
      add(val.datatransfer,$scope.summ.datatransfer,temp.datatransfer);
      add(val.virtualization,$scope.summ.virtualization,temp.virtualization);
      add(val.devenv,$scope.summ.devenv,temp.devenv);
      add(val.hardware,$scope.summ.hardware,temp.hardware);
      add(val.collabs,$scope.summ.collabs,temp.collabs);

      // Filling the members arrays
      angular.forEach(val.members,function(val2){
        var tempM = {'name':'','pm':''};
        tempM.name=val2.name;
        tempM.pm=val2.pm;
        var index = findMember(val2.name,$scope.summ.members);
        if (index==-1){
          $scope.summ.members.push(tempM);
        } else {
          $scope.summ.members[index].pm = parseInt($scope.summ.members[index].pm) + parseInt(val2.pm);
        }
        var indexD = findMember(val2.name,temp.members);
        if (indexD==-1){
          temp.members.push(tempM);
        } else {
          temp.members[index].pm = parseInt(temp.members[index].pm) + parseInt(val2.pm);
        }
      })

      // Filling the HPC arrays
      angular.forEach(val.hpc,function(val2){
        if ($scope.summ.architecture.indexOf(val2.type)==-1){
          $scope.summ.architecture.push(val2.type);
        }
        $scope.summ.hpc.runs+= addIfNotNull(val2.runs);
        $scope.summ.hpc.partition+= addIfNotNull(val2.part);
        $scope.summ.hpc.time+= addIfNotNull(val2.time);
        $scope.summ.hpc.numarte+= addIfNotNull(val2.arte);
        $scope.summ.hpc.sizearte+= addIfNotNull(val2.size)*addIfNotNull(val2.arte);

        if (temp.architecture.indexOf(val2.type)==-1){
          temp.architecture.push(val2.type);
        }
        temp.hpc.runs+= addIfNotNull(val2.runs);
        temp.hpc.partition+= addIfNotNull(val2.part);
        temp.hpc.time+= addIfNotNull(val2.time);
        temp.hpc.numarte+= addIfNotNull(val2.arte);
        temp.hpc.sizearte+= addIfNotNull(val2.size)*addIfNotNull(val2.arte);
      })

      // Filling the Cloud arrays
      angular.forEach(val.cloud,function(val2){
        if ($scope.summ.architectureC.indexOf(val2.type)==-1){
          $scope.summ.architectureC.push(val2.type);
        }
        $scope.summ.cloud.runs+= addIfNotNull(val2.runs);
        $scope.summ.cloud.partition+= addIfNotNull(val2.part);
        $scope.summ.cloud.time+= addIfNotNull(val2.time);
        $scope.summ.cloud.numarte+= addIfNotNull(val2.arte);
        $scope.summ.cloud.sizearte+= addIfNotNull(val2.size)*addIfNotNull(val2.arte);

        if (temp.architectureC.indexOf(val2.type)==-1){
          temp.architectureC.push(val2.type);
        }
        temp.cloud.runs+= addIfNotNull(val2.runs);
        temp.cloud.partition+= addIfNotNull(val2.part);
        temp.cloud.time+= addIfNotNull(val2.time);
        temp.cloud.numarte+= addIfNotNull(val2.arte);
        temp.cloud.sizearte+= addIfNotNull(val2.size)*addIfNotNull(val2.arte);
      })

      //Compute the averages for the deliverables
      temp.cloud.sizearte = temp.cloud.sizearte/temp.cloud.numarte;
      temp.hpc.sizearte = temp.hpc.sizearte/temp.hpc.numarte;
      $scope.summ.deliverables.push(temp);
    });

    //Compute the averages for the project
    $scope.summ.cloud.sizearte = $scope.summ.cloud.sizearte/$scope.summ.cloud.numarte;
    $scope.summ.hpc.sizearte = $scope.summ.hpc.sizearte/$scope.summ.hpc.numarte;
  }
  refresh();
});
