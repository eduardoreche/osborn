(function () {
  'use strict';

  angular
		.module('osborn.home', [])
    .config($stateProvider => {
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'app/components/home/home.template.html',
          controller: 'HomeController as home'
        });
    });
})();
