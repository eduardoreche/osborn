(function () {
  'use strict';

  angular
		.module('osborn.user', [])
    .config($stateProvider => {
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
          templateUrl: './app/components/user/users.template.html',
          controller: 'UserController as uc'
        })
        .state('users.new', {
          url: '/new',
          templateUrl: './app/components/user/users-form.template.html',
          controller: 'UserController as uc'
        })
        .state('users.edit', {
          url: '/edit/:id',
          templateUrl: './app/components/user/users-form.template.html',
          controller: 'UserController as uc'
        });
    });
})();
