(function() {

  'use strict';

  angular
    .module('osborn.project')
    .factory('ProjectService', projectService);

  angular.$inject = ['$resource'];

  function projectService($resource) {

    const service = $resource('http://localhost:3000/api/v1/projects/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });

    return service;
  }
})();