(function() {

  'use strict';

  angular
    .module('osborn.user')
    .factory('UserService', userService);

  angular.$inject = ['$resource'];

  function userService($resource) {

    const service = $resource('http://localhost:3000/api/v1/users/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });

    return service;
  }
})();