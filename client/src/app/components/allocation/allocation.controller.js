(function() {
  'use strict';

  angular
    .module('osborn.allocation')
    .controller('AllocationController', allocationController);

  allocationController.$inject = [
    '$scope', 
    '$state', 
    '$stateParams', 
    'ProjectService',
    'ResourceService',
    'AllocationService'];

  function allocationController($scope, $state, $stateParams, ProjectService, ResourceService, AllocationService) {
    const vm = this;

    vm.data = {};
    vm.resources = [];
    vm.allocations = [];

    ProjectService.get({id: $stateParams.id}, project => {
      vm.data.project = project;
      vm.allocations = project.allocations;
    });

    vm._loadResources = () => {
      vm.resources = ResourceService.query();
    };

    vm._loadResources();

    vm._resetAllocationData = () => {
      delete vm.data.selectedResource; 
      delete vm.data.initialDate;
      delete vm.data.finalDate;
      delete vm.data.hours;
    };

    vm.delete = (id, index) => {
      AllocationService.delete({id}, () => {
        vm.allocations.splice(index, 1);
      });
    };

    vm.allocate = () => {
      const allocationService = new AllocationService();
      allocationService.resource = vm.data.selectedResource._id; 
      allocationService.project = vm.data.project._id;
      allocationService.start_date = vm.data.initialDate;
      allocationService.end_date = vm.data.finalDate;
      allocationService.hours = vm.data.hours;
      allocationService.$save(() => {
        vm.allocations.push(vm._createLocalAllocation());
        vm._resetAllocationData();
      });
    };

    vm._createLocalAllocation = () => {
      return {
        resource: vm._createLocalResource(vm.data.selectedResource),
        start_date: vm.data.initialDate,
        end_date: vm.data.finalDate,
        hours: vm.data.hours
      };
    };

    vm._createLocalResource = selectedResource => {
      return {
        _id: selectedResource._id,
        name: selectedResource.name
      };
    };
  }
})();