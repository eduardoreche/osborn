(function () {

  'use strict';

  angular
    .module('osborn.resource')
    .factory('ResourceService', resourceService);

  angular.$inject = ['$resource', 'SERVER_DATA'];

  function resourceService($resource, SERVER_DATA) {

    const service = $resource(`http://${SERVER_DATA.ip}:${SERVER_DATA.port}/api/v1/resources/:id`, {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });

    return service;
  }
})();