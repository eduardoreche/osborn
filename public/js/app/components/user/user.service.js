(function() {

  'use strict';

  angular
    .module('osborn.user')
    .factory('userService', userService);

  angular.$inject = ['$resource', '$http'];

  function userService($resource, $http) {

    var service = $resource('/api/v1/users/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });

    return service;
  }
})();