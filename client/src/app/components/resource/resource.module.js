(function () {
  'use strict';

  angular
		.module('osborn.resource', [])
    .config($stateProvider => {
      $stateProvider
        .state('resources', {
          abstract: true,
          url: '/resources',
          views: {
            '@': {
              template: '<ui-view/>'
            }
          }
        })
        .state('resources.list', {
          url: '/list',
          templateUrl: './app/components/resource/resources.template.html',
          controller: 'ResourceController as rc'
        })
        .state('resources.new', {
          url: '/new',
          templateUrl: './app/components/resource/resources-form.template.html',
          controller: 'ResourceController as rc'
        })
        .state('resources.edit', {
          url: '/edit/:id',
          templateUrl: './app/components/resource/resources-form.template.html',
          controller: 'ResourceController as rc'
        })
        .state('resources.dashboard', {
          url: '/dashboard/:id',
          templateUrl: './app/components/resource/resource-dashboard.template.html',
          controller: 'ResourceDashboardController as rd'
        });
    });
})();
