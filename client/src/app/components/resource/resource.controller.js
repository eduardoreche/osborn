(function() {

  'use strict';

  angular
    .module('osborn.resource')
    .controller('ResourceController', resourceController);

  resourceController.$inject = [
    '$scope', 
    '$state', 
    '$stateParams', 
    'ResourceService', 
    'PositionService',
    'TeamService'
  ];

  function resourceController(
    $scope, 
    $state, 
    $stateParams, 
    ResourceService, 
    PositionService,
    TeamService
  ) {

    const vm = this;
    vm.resources = [];
    vm.resource = $stateParams.id ? ResourceService.get({id: $stateParams.id}) : new ResourceService();
    vm.positions = [];
    vm.teams = [];
    vm.leaders = [];
    vm.save = save;
    vm.delete = remove; 
    vm.edit = edit;

    _loadResources();

    // ******************************************************

    function save() {
      if (vm.resource._id) {
        _update();
      } else {
        _add();
      }

      _loadResources();  
      $state.go('resources.list');
    }

    function edit(id) {
      $state.go('resources.edit', {id});
    }

    function remove(resource) {
      vm.resources.splice(vm.resources.indexOf(resource), 1);

      resource.$delete({id: resource._id});
    }
  
    const _add = function() {
      return vm.resource.$save();
    };

    const _update = function() {
      vm.resource.$update({id: vm.resource._id});
    };

    function _loadResources() {
      vm.resources = ResourceService.query();
      vm.positions = PositionService.query();
      vm.teams = TeamService.query();
      vm.leaders = ResourceService.query();
    }
  }

})();