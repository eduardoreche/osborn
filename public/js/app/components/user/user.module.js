(function() {
	'use strict';

	angular
		.module('osborn.user', [])
    .config(function($stateProvider) {
      
      $stateProvider
        .state('users', {
          abstract: true,
          url: '/users',
          views: {
            '@': {
              template: '<ui-view/>' 
            }
          }
        })
        .state('users.list', {
          url: '/list', 
          templateUrl: 'js/app/components/user/users.template.html',
          controller: 'userController as uc' 
        })
        .state('users.new', {
          url: '/new', 
          templateUrl: 'js/app/components/user/users-form.template.html',
          controller: 'userController as uc' 
        })
        .state('users.edit', {
          url: '/edit/:id', 
          templateUrl: 'js/app/components/user/users-form.template.html',
          controller: 'userController as uc' 
        })
    })
})();