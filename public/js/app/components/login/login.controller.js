(function() {
  'use strict';

  LoginController.$inject = ['$state'];

  function LoginController($state) {
    var error = {};
    var credentials = {};

    const doLogin = () => {
      console.log('doLogin', this.credentials);
      this.error = {};
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
