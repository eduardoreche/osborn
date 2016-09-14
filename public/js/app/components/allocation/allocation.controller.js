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

    projectService.get({id: $stateParams.id}, (project) => {
      vm.data.projectName = project.name;
    });

    _loadResources();

    function _loadResources() {
      vm.resources = resourceService.query();
    }
  }
})();