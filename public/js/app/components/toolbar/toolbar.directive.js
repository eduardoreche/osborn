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

  toolbarController.$inject = ['$state', 'authService'];

  function toolbarController($state, authService) {
    var vm = angular.extend(this, {
      user: authService.getUserData(),
      signOut: signOut
    });

    function signOut() {
      authService.signOut();
      $state.go('auth');
    }

  }

})();