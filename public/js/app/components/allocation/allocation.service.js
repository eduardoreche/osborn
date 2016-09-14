(function() {
  'use strict';

  angular
    .module('osborn.allocation')
    .factory('allocationService', allocationService);

  angular.$inject = ['$resource', '$auth', '$http'];

  function allocationService($resource, $auth, $http) {

    $http.defaults.headers.common['x-access-token'] = $auth.persistData().auth_headers['x-access-token'];

    var service = $resource('/api//v1/allocations/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });

    return service;
  }
})();