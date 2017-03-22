(function() {

  'use strict';

  angular
    .module('osborn')
    .directive('toolbar', toolbar);

  function toolbar() {
    return {
      templateUrl: 'js/app/components/toolbar/toolbar.template.html',
      controller: toolbarController,
      controllerAs: 'toolbar'
    }
  }

  toolbarController.$inject = ['$rootScope', '$state'];

  function toolbarController($rootScope, $state) {
    
    var vm = angular.extend(this, {
      login: login,
      logout: logout
    });

    function login() {
      $state.go('home');
    }

    function logout() {
      $state.go('home');
    }

  }

})();