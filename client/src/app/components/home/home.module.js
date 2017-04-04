(function () {
  'use strict';

  angular
		.module('osborn.home', ['appServices'])
    .config($stateProvider => {
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'app/components/home/home.template.html',
          controller: 'HomeController as home'
        });
    });
})();
