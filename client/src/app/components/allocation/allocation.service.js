(function() {
  'use strict';

  angular
    .module('osborn.allocation')
    .factory('AllocationService', allocationService);

  angular.$inject = ['$resource'];

  function allocationService($resource) {

    const service = $resource('http://localhost:3000/api/v1/allocations/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });

    return service;
  }
})();