(function() {
  'use strict';

  Config.$inject = ['$stateProvider'];

  function Config($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'js/app/components/login/login.template.html',
        controller: 'LoginController as lc'
        });
    }

  angular
    .module('osborn.login', [])
    .config(Config);
})();
