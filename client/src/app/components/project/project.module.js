(function () {
  'use strict';

  angular
		.module('osborn.project', ['kanbanBoard'])
    .config($stateProvider => {
      $stateProvider
        .state('projects', {
          abstract: true,
          url: '/projects',
          views: {
            '@': {
              template: '<ui-view/>'
            }
          }
        })
        .state('projects.list', {
          url: '/list',
          templateUrl: './app/components/project/projects.template.html',
          controller: 'ProjectController as pc'
        })
        .state('projects.new', {
          url: '/new',
          templateUrl: './app/components/project/projects-form.template.html',
          controller: 'ProjectController as pc'
        })
        .state('projects.edit', {
          url: '/edit/:id',
          templateUrl: './app/components/project/projects-form.template.html',
          controller: 'ProjectController as pc'
        })
        .state('projects.allocate', {
          url: '/allocate/:id',
          templateUrl: './app/components/allocation/allocations.template.html',
          controller: 'AllocationController as ac'
        })
        .state('projects.dashboard', {
          url: '/dashboard/:id',
          templateUrl: './app/components/project/project-dashboard.template.html',
          controller: 'ProjectDashboardController as pd'
        });
    });
})();
