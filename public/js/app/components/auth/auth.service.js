(function() {

  'use strict';

  angular
    .module('osborn.auth')
    .factory('authService', authService);

  angular.$inject = ['$auth'];

  function authService($auth) {

    var service = {
      getUserData: getUserData, 
      signOut: signOut
    }

    return service;

    function getUserData() {
      var user = $auth.retrieveData('user');
      
      return user;
    }

    function signOut() {
      $auth.persistData('user') == null;
      $auth.signOut();
    }
  }
})();