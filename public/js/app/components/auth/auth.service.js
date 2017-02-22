(function() {
  'use-strict';

  angular
    .module('osborn.auth')
    .service('authService', authService);

    authService.$inject = ['$rootScope', 'lock', 'authManager'];

    function authService($rootScope, lock, authManager) {
      var profile = localStorage.getItem('profile');
      var userProfile = {};
      if (profile != "undefined") {
        userProfile = JSON.parse(localStorage.getItem('profile')) || {};
      }

      function login() {
        
        lock.show();
      }

      function logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        authManager.unauthenticate();
        userProfile = {};
      }

      function registerAuthenticationListener() {
        lock.on('show', ()=> {
          console.log('lock show');
        });

        lock.on('hide', ()=> {
          console.log('lock hide');
        });

        lock.on('unrecoverable_error', (error)=> {
          console.log(`lock error: ${error}`);
        });

        lock.on('authenticated', (authResult) => {
          console.log(`lock authenticated: ${authResult}`);
          
          localStorage.setItem('id_token', authResult.idToken);
          authManager.authenticate();

          lock.getProfile(authResult.idToken, function(error, profile){
            if(error) 
              console.log(error);

            localStorage.setItem('profile', JSON.stringify(profile));
            $rootScope.$broadcast('userProfileSet', profile);
          });
        });
      }

      return {
        userProfile: userProfile,
        login: login, 
        logout: logout,
        registerAuthenticationListener: registerAuthenticationListener
      }
    }
})();