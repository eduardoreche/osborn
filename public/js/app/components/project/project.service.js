(function() {

  'use strict';

  angular
    .module('osborn.project')
    .factory('projectService', projectService);

  angular.$inject = ['$resource', '$http'];

  function projectService($resource, $http) {

    var service = $resource('/api/v1/projects/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });

    return service;
  }
})();