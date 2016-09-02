(function() {

  'use strict';

  angular
    .module('osborn')
    .controller('authController', authController);

  angular.$inject = ['$auth', '$state'];

  function authController($auth, $state) {
    var vm = angular.extend(this, {
      email: '',
      password: '', 

      message: '',

      login: login
    });

    function login() {
      $auth.submitLogin({
        email: vm.email, 
        password: vm.password
      }).then(function(resp){
        console.log($auth);
        $state.go('home');
      }).catch(function(resp) {
        vm.message = 'Ooops! Wrong credentials';
      })
    }
  }
})();