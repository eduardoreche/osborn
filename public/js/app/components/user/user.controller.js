(function() {

  'use strict';

  angular
    .module('osborn.user')
    .controller('userController', userController);

  userController.$inject = ['$scope', '$state', '$stateParams', 'userService'];

  function userController($scope, $state, $stateParams, userService) {

    var vm = angular.extend(this, {
      users: [],
      user: $stateParams.id ? userService.get({id: $stateParams.id}) : new userService({active: true}),

      save: save, 
      delete: remove, 
      edit: edit

    });

    _loadUsers();

    // ******************************************************

    function save() {
      if( vm.user._id != null )
        _update();
      else
        _add();

      _loadUsers();  
      $state.go('users.list');
    }

    function edit(id) {
      $state.go('users.edit', {id: id});
    }

    function remove(user) {
      user.$delete({id: user._id});
      _loadUsers();
    }
  
    var _add = function() {      
      return vm.user.$save();
    }

    var _update = function() {
      vm.user.$update({id: vm.user._id});
    }

    function _loadUsers() {
      vm.users = userService.query();
    }


  }

})();