(function() {
  'use strict';

  angular
    .module('osborn.allocation')
    .controller('allocationController', allocationController);

  allocationController.$inject = [
    '$scope', 
    '$state', 
    '$stateParams', 
    'projectService',
    'resourceService',
    'AllocationService'];

  function allocationController($scope, $state, $stateParams, projectService, resourceService, AllocationService) {
    var vm = this;

    vm.data = {};
    vm.resources = [];
    vm.allocations = [];

    projectService.get({id: $stateParams.id}, (project) => {
      vm.data.project  = project;
      vm.allocations = project.allocations;
    });

    vm._loadResources = () => {
      vm.resources = resourceService.query();
    }

    vm._loadResources();

    vm._resetAllocationData = () => {
      delete vm.data['selectedResource']; 
      delete vm.data['initialDate'];
      delete vm.data['finalDate'];
      delete vm.data['hours'];
    }

    vm.delete = (id, index) => {
      AllocationService.delete({id: id}, () => {
        vm.allocations.splice(index, 1);
      });
    }

    vm.allocate = () => {
      var as = new AllocationService();
      as.resource = vm.data.selectedResource._id; 
      as.project = vm.data.project._id;
      as.start_date = vm.data.initialDate;
      as.end_date = vm.data.finalDate;
      as.hours = vm.data.hours;
      as.$save((result) => {
        vm.allocations.push(vm._createLocalAllocation());
        vm._resetAllocationData();
      });
    }

    vm._createLocalAllocation = () => {
      return {
        resource:   vm._createLocalResource(vm.data.selectedResource),
        start_date: vm.data.initialDate,
        end_date:   vm.data.finalDate,
        hours:      vm.data.hours
      };
    }

    vm._createLocalResource = (selectedResource) => {
      return {
        _id: selectedResource._id,
        name: selectedResource.name
      };
    }
  }
})();