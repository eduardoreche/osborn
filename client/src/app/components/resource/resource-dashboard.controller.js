(function () {
  'use strict';

  angular
    .module('osborn.resource')
    .controller('ResourceDashboardController', ResourceDashboardController);

  ResourceDashboardController.inject = ['$scope', '$stateParams', 'ResourceService'];

  function ResourceDashboardController($scope, $stateParams, ResourceService) {
    const vm = this;
    vm.resource = {};
    vm.activeLabel = 'Inactive';
    vm.allocated = false;
    vm.allocatedLabel = 'Available';
    vm.timelineChartOptions = null;

    _initialize();

    function _initialize() {
      vm.resource = $stateParams.id ? ResourceService.get({id: $stateParams.id}, resource => {
        vm.timelineChartOptions = {
          chartType: 'Timeline',
          dataTable: [
            ['Project', 'Start', 'End'],
            ['Today', new Date(), new Date()]
          ]
        };

        angular.forEach(resource.allocations, item => {
          if (item.project) {
            vm.timelineChartOptions.dataTable.push(
              [
                item.project.nickname,
                new Date(item.project.start_date),
                new Date(item.project.end_date)
              ]
            );

            if ((new Date(item.project.start_date) <= new Date()) &&
                (new Date(item.project.end_date) >= new Date()) &&
                 !vm.allocated) {
              vm.allocated = true;
              vm.allocatedLabel = 'Allocated';
            }
          }
        });
        if (vm.resource.active) {
          vm.activeLabel = 'Active';
        }
      }) : new ResourceService();
    }
  }
})();
