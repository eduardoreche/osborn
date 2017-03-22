(function() {
  'use strict';

  angular
    .module('osborn.allocation')
    .factory('allocationService', allocationService);

  angular.$inject = ['$resource', '$http'];

  function allocationService($resource, $http) {

    var service = $resource('/api/v1/allocations/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });

    return service;
  }
})();