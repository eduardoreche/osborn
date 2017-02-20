(function() {
	'use strict';

	angular
		.module('osborn.project', [])
    .config(function($stateProvider) {
      
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
          templateUrl: 'js/app/components/project/projects.template.html',
          controller: 'projectController as pc' 
        })
        .state('projects.new', {
          url: '/new', 
          templateUrl: 'js/app/components/project/projects-form.template.html',
          controller: 'projectController as pc' 
        })
        .state('projects.edit', {
          url: '/edit/:id', 
          templateUrl: 'js/app/components/project/projects-form.template.html',
          controller: 'projectController as pc' 
        })
        .state('projects.allocate', {
          url: '/allocate/:id',
          templateUrl: 'js/app/components/allocation/allocations.template.html',
          controller: 'allocationController as ac'
        })
        .state('projects.dashboard', {
          url: '/dashboard/:id',
          templateUrl: 'js/app/components/project/project-dashboard.template.html',
          controller: 'projectDashboardController as pd',
          })
    })
})();