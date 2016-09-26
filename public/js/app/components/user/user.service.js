(function() {

  'use strict';

  angular
    .module('osborn.user')
    .factory('userService', userService);

  angular.$inject = ['$resource', '$http'];

  function userService($resource, $http) {

    $http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('id_token')}`;

    var service = $resource('/api/v1/users/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });

    return service;
  }
})();