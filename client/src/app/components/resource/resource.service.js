(function() {

  'use strict';

  angular
    .module('osborn.resource')
    .factory('ResourceService', resourceService);

  angular.$inject = ['$resource'];

  function resourceService($resource) {

    const service = $resource('/api/v1/resources/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });

    return service;
  }
})();