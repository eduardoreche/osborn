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
    'allocationService'];

  function allocationController($scope, $state, $stateParams, projectService, resourceService, allocationService) {
    var vm = this;

    vm.data = {};
    vm.resources = [];
    vm.allocations = [];

    projectService.get({id: $stateParams.id}, (project) => {
      vm.data.project  = project;
      vm._loadAllocations(project._id);
    });

    vm._loadResources = () => {
      vm.resources = resourceService.query();
    }

    vm._loadResources();

    vm._loadAllocations= (param) => {
      vm.allocations = allocationService.byProject({ id: param});
    }

    vm._reset = () => {
      vm.data = {};
    }

    vm.allocate = () => {
      var as = new allocationService();
      as.resource_id = vm.data.selectedResource._id; 
      as.project_id = vm.data.project._id;
      as.start_date = vm.data.initialDate;
      as.end_date = vm.data.finalDate;
      as.hours = vm.data.hours;
      as.$save((result) => {
        vm._reset();
      });
    }
  }
})();