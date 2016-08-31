(function() {

  'use strict';

  angular
    .module('osborn.project')
    .factory('resourceService', resourceService);

  angular.$inject = ['$resource'];

  function resourceService($resource) {

    var service = $resource('/api/v1/resources/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });

    return service;
  }
})();