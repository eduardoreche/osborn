(function() {

  'use strict';

  angular
    .module('osborn.resource')
    .controller('resourceController', resourceController);

  resourceController.$inject = ['$scope', '$state', '$stateParams', 'resourceService', 'appService'];

  function resourceController($scope, $state, $stateParams, resourceService, appService) {

    var vm = angular.extend(this, {
      resources: [],
      resource: $stateParams.id ? resourceService.get({id: $stateParams.id}) : new resourceService(),
      
      positions: [],

      save: save, 
      delete: remove, 
      edit: edit

    });

    _loadResources();

    // ******************************************************

    function save() {
      if( vm.resource._id != null )
        _update();
      else
        _add();

      _loadResources();  
      $state.go('resources.list');
    }

    function edit(id) {
      $state.go('resources.edit', {id: id});
    }

    function remove(resource) {
      resource.$delete({id: resource._id});
      _loadResources();
    }
  
    var _add = function() {
      return vm.resource.$save();
    }

    var _update = function() {
      vm.resource.$update({id: vm.resource._id});
    }

    function _loadResources() {
      vm.resources = resourceService.query();
      vm.positions = appService.query();
    }


  }

})();