(function() {

  'use strict';

  angular
    .module('osborn.user')
    .factory('userService', userService);

  angular.$inject = ['$resource', '$http', '$auth'];

  function userService($resource, $http, $auth) {

    $http.defaults.headers.common['x-access-token'] = 
                        $auth.persistData().auth_headers['x-access-token'];

    var service = $resource('/api/v1/users/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });

    return service;
  }
})();