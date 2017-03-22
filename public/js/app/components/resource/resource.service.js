(function() {

  'use strict';

  angular
    .module('osborn.resource')
    .factory('resourceService', resourceService);

  angular.$inject = ['$resource', '$http'];

  function resourceService($resource, $http) {

    var service = $resource('/api/v1/resources/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });

    return service;
  }
})();