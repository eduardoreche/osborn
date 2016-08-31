'use strict'

angular
  .module('osborn', [
    'ngResource',
    'ui.router', 
    'ngConfirm',

    'osborn.home',
    'osborn.project',
    'osborn.resource'
  ])

  .config(function($urlRouterProvider, $httpProvider){
    $urlRouterProvider.otherwise('/');

    $httpProvider.defaults.useXDomain = true;
  })
  .run(function(){
    $('a[data-confirm]').on('click', function(e) {
      if( !confirm( $(this)[0].dataset['confirm']  ) )
        e.preventDefault();
    });
  });