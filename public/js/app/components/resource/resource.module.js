(function() {
	'use strict';

	angular
		.module('osborn.resource', [])
    .config(function($stateProvider) {
      
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
          templateUrl: 'js/app/components/resource/resources.template.html',
          controller: 'resourceController as rc' 
        })
        .state('resources.new', {
          url: '/new', 
          templateUrl: 'js/app/components/resource/resources-form.template.html',
          controller: 'resourceController as rc' 
        })
        .state('resources.edit', {
          url: '/edit/:id', 
          templateUrl: 'js/app/components/resource/resources-form.template.html',
          controller: 'resourceController as rc' 
        })
    })
})();