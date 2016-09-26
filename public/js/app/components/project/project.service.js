(function() {

  'use strict';

  angular
    .module('osborn.project')
    .factory('projectService', projectService);

  angular.$inject = ['$resource', '$http'];

  function projectService($resource, $http) {

    $http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('id_token')}`;

    var service = $resource('/api/v1/projects/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });

    return service;
  }
})();