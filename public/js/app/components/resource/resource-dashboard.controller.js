(function() {
'use strict';

  angular
    .module('osborn.resource')
    .controller('resourceDashboardController', resourceDashboardController);

  resourceDashboardController.inject = ['$scope', '$stateParams', 'resourceService'];

  function resourceDashboardController($scope, $stateParams, resourceService) {

    var vm = angular.extend(this, {
      resource: {},

      activeLabel: 'Inactive',
      allocated: false,
      allocatedLabel: 'Available',
      timelineChartOptions: null,
    });
    

    _initialize();

    function _initialize() {
      vm.resource = $stateParams.id ? resourceService.get({id: $stateParams.id}, (resource) => {
        vm.timelineChartOptions = {
          chartType: 'Timeline',
          dataTable: [
            ['Project', 'Start', 'End'],
            ['Today', new Date(), new Date()]
          ]
        };

        angular.forEach(resource.allocations, function(item) {
          if (item.project) {
            vm.timelineChartOptions.dataTable.push(
              [
                item.project.nickname,
                new Date(item.project.start_date),
                new Date(item.project.end_date)
              ]
            );

            if ((new Date(item.project.start_date) <= new Date()) 
              && (new Date(item.project.end_date) >= new Date())
              && !vm.allocated) {
                vm.allocated = true;
                vm.allocatedLabel = 'Allocated'
              }
          }
        });
        if (vm.resource.active) {
          vm.activeLabel = 'Active';
        }
      }) : new resourceService();
    }
  }
})();