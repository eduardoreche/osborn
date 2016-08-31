(function() {
	'use strict';

	angular
		.module('osborn.home', [])
    .config(function($stateProvider) {
      
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'js/app/components/home/home.template.html',
          controller: 'homeController as home'
        })
    })
})();