(function() {
  'use strict';

  LoginController.$inject = ['$state', 'LoginService'];

  function LoginController($state, LoginService) {
    var error = {};
    var credentials = {};

    const doLogin = () => {
      console.log('doLogin', this.credentials);
      this.error = {};
      LoginService.login(this.credentials)
        .then(() => {
          $state
            .go('home')
            .then(() => {
              $state.reload();
            });
        })
        .catch(response => {
          this.error = {
            hasMessage: true,
            isError: true,
            message: response.data.message
          };
        });
    }

    angular.extend(this, {
      credentials: credentials,
      doLogin: doLogin
    });
  }

  angular
    .module('osborn.login')
    .controller('LoginController', LoginController);

})();
