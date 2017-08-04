(function () {

  'use strict';

  angular
    .module('osborn.user')
    .controller('UserController', UserController);

  UserController.$inject = ['$scope', '$state', '$stateParams', 'UserService'];

  function UserController($scope, $state, $stateParams, UserService) {
    const vm = this;
    vm.users = [];
    vm.user = $stateParams.id ? UserService.get({id: $stateParams.id}) : new UserService({active: true});
    vm.save = save;
    vm.delete = remove;
    vm.edit = edit;

    _loadUsers();

    // ******************************************************

    function save() {
      if (vm.user._id) {
        _update();
      } else {
        _add();
      }

      _loadUsers();
      $state.go('users.list');
    }

    function edit(id) {
      $state.go('users.edit', {id});
    }

    function remove(user) {
      user.$delete({id: user._id});
      _loadUsers();
    }

    const _add = function () {
      return vm.user.$save();
    };

    const _update = function () {
      vm.user.$update({id: vm.user._id});
    };

    function _loadUsers() {
      vm.users = UserService.query();
    }
  }

})();
