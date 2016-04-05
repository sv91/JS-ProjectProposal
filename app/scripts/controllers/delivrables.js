'use strict';

/**
 * @ngdoc function
 * @name projectProposalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the projectProposalApp
 */
angular.module('projectProposalApp')
  .controller('DeliverablesCtrl', function ($scope) {
    $scope.record = {
      "deliverables":[
        "name":{},
        "deliveryDate":{},
        "dependencies":[],
        "risks":{},
        "description":{},
        "saas":[

        ],
        "paas":[

        ],
        "iaas":[

        ],
        "haas":[

        ],
        "members":[
          "name":{},
          "tasks":[
            "role":{},
            "pm":{},
            "description":{}
          ]
        ]
      ]
    };
  });
