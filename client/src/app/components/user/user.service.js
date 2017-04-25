(function() {

  'use strict';

  angular
    .module('osborn.user')
    .factory('UserService', userService);

  angular.$inject = ['$resource', 'SERVER_DATA'];

  function userService($resource, SERVER_DATA) {

    const service = $resource(`http://${SERVER_DATA.ip}:${SERVER_DATA.port}/api/v1/users/:id`, {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });

    return service;
  }
})();