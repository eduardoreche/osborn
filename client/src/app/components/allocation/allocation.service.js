(function() {
  'use strict';

  angular
    .module('osborn.allocation')
    .factory('AllocationService', allocationService);

  angular.$inject = ['$resource', 'SERVER_DATA'];

  function allocationService($resource, SERVER_DATA) {

    const service = $resource(`http://${SERVER_DATA.ip}:${SERVER_DATA.port}/api/v1/allocations/:id`, {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });

    return service;
  }
})();