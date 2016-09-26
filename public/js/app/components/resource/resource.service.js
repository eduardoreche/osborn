(function() {

  'use strict';

  angular
    .module('osborn.resource')
    .factory('resourceService', resourceService);

  angular.$inject = ['$resource', '$http'];

  function resourceService($resource, $http) {

    $http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('id_token')}`;

    var service = $resource('/api/v1/resources/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });

    return service;
  }
})();