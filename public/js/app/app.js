'use strict'

angular
  .module('osborn', [
    'ngResource',
    'ui.router', 
    'ngConfirm',
    'ui.select',
    'ngSanitize',
    'auth0.lock',
    'angular-jwt',

    'osborn.home',
    'osborn.project',
    'osborn.resource',
    'osborn.allocation',
    'osborn.user',
    'osborn.auth'
  ])

  .config(function($urlRouterProvider, $httpProvider, lockProvider, jwtOptionsProvider, jwtInterceptorProvider){

    lockProvider.init({
      clientID: '3u4JGQPmEi90kjHpxH10W62mwX2V9SJ2',
      domain: 'osborn.auth0.com',
      options: {
        auth: {
          redirect: false
        }, 
        autoclose: true
      }
    });

    jwtOptionsProvider.config({
      tokenGetter: function() {
        return localStorage.getItem('id_token');
      }
    });

    $httpProvider.interceptors.push('jwtInterceptor');

    $urlRouterProvider.otherwise('/');
    
    $httpProvider.defaults.useXDomain = true;

  })
  .run(function($rootScope, authService, authManager, lock){
    $rootScope.authService = authService;
    
    authService.registerAuthenticationListener();

    lock.on('hidden', () => {
      console.log( 'hidden') ;
    });

    authManager.checkAuthOnRefresh();
    authManager.redirectWhenUnauthenticated();
  });