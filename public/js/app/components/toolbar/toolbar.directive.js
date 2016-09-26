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

  toolbarController.$inject = ['$rootScope', '$state', 'authService', 'authManager'];

  function toolbarController($rootScope, $state, authService, authManager) {
    
    var vm = angular.extend(this, {
      login: login,
      logout: logout,
      userProfile: authService.userProfile,
      isAuthenticated: $rootScope.isAuthenticated
    });

    function login() {
      authService.login();
    }

    function logout() {
      authService.logout();
      $state.go('home');
    }

  }

})();