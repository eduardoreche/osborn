(function() {
  'use strict';

  LoginService.$inject = ['$http', '$window'];

  function LoginService($http, $window) {

    const getToken = () => {
      return $window.localStorage['osborn-token'];
    }

    const saveToken = (token) => {
      $window.localStorage['osborn-token'] = token;
    }

    const logout = () => {
      $window.localStorage.removeItem('osborn-token');
    }

    const isLoggedIn = () => {
      var token = getToken();

      if (token) {
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        return payload.exp > Date.now() / 1000;
      } 
     
      return false;
    }

    const currentUser = () => {
      if (isLoggedIn()) {
        var token = getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        return {
          _id:    payload._id,
          email:  payload.email,
          name:   payload.name
        }
      }
    }

    const login = (user) => {
      return $http
        .post(RESOURCES.LOGIN, user)
        .then(response => {
          saveToken(response.data.token);
        });
    }

    return {
      currentUser:  currentUser,
      getToken:     getToken,
      isLoggedIn:   isLoggedIn,
      login:        login,
      logout:       logout,
      saveToken:    saveToken
    }

  }

  angular
    .module('osborn.login')
    .service('LoginService', LoginService);

})();
