(function() {
	'use strict';

	angular
		.module('osborn.auth', [])
    .config(function($stateProvider) {
      
      $stateProvider
        .state('auth', {
          url: '/auth',
          templateUrl: 'js/app/components/auth/auth.template.html',
          controller: 'authController as auth'
        })
    })
})();