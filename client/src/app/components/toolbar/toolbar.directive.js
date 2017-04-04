(function () {

  'use strict';

  angular
    .module('toolbar')
    .directive('toolbar', toolbar);

  function toolbar() {
    return {
      templateUrl: 'js/app/components/toolbar/toolbar.template.html',
      controller: toolbarController,
      controllerAs: 'toolbar'
    };
  }

  toolbarController.$inject = ['$rootScope', '$state'];

  function toolbarController($rootScope, $state) {
    const vm = this;
    vm.login = login;
    vm.logout = logout;
    
    function login() {
      $state.go('home');
    }

    function logout() {
      $state.go('home');
    }

  }

})();