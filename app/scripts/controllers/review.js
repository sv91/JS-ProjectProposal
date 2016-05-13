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


      angular.forEach(val.softdev,function(val2){
        if ($scope.summ.softdev.indexOf(val2)==-1){
          $scope.summ.softdev.push(val2);
        }
          if (temp.softdev.indexOf(val2)==-1){
            temp.softdev.push(val2);
          }
      })
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
      angular.forEach(val.collabs,function(val2){
        if ($scope.summ.collabs.indexOf(val2)==-1){
          $scope.summ.collabs.push(val2);
        }
          if (temp.collabs.indexOf(val2)==-1){
            temp.collabs.push(val2);
          }
      })
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

      angular.forEach(val.hardware,function(val2){
        if(val2.name!=""){
        if ($scope.summ.hardware.indexOf(val2)==-1){
          $scope.summ.hardware.push(val2);
        }
        if (temp.hardware.indexOf(val2)==-1){
          temp.hardware.push(val2);
        }}
      })


          temp.cloud.sizearte = temp.cloud.sizearte/temp.cloud.numarte;
          temp.hpc.sizearte = temp.hpc.sizearte/temp.hpc.numarte;
    $scope.summ.deliverables.push(temp);
    });

        $scope.summ.cloud.sizearte = $scope.summ.cloud.sizearte/$scope.summ.cloud.numarte;
        $scope.summ.hpc.sizearte = $scope.summ.hpc.sizearte/$scope.summ.hpc.numarte;
  }
  refresh();
});
