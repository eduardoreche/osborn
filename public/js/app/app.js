'use strict'

angular
  .module('osborn', [
    'ngResource',
    'ui.router', 
    'ngConfirm',
    'ng-token-auth',

    'osborn.home',
    'osborn.project',
    'osborn.resource',
    'osborn.auth'
  ])

  .config(function($urlRouterProvider, $httpProvider, $authProvider){
    $urlRouterProvider.otherwise('/');
    
    $httpProvider.defaults.headers.common = function($auth) {
      return {
        'x-access-header' : $auth.persistData().auth_headers['x-access-token']
      } 
    } 

    $httpProvider.defaults.useXDomain = true;

    $authProvider.configure({
      apiUrl: 'http://localhost:3000/api/v1',
      emailSignInPath: '/auth',
      forceValidateToken: false,
      storage: 'cookies',
      handleLoginResponse: function(resp, $auth, $http) {
        $auth.persistData('auth_headers', {
          'x-access-token': resp['token']
        });

        return {
          'user': resp['user']
        }
      },
      tokenFormat: function() {
        return {
          'x-access-token': token
        }
      }
    });
  })
  .run(function(){
    $('a[data-confirm]').on('click', function(e) {
      if( !confirm( $(this)[0].dataset['confirm']  ) )
        e.preventDefault();
    });
  });