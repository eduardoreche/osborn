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
    })
})();