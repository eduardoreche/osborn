(function() {

  'use strict';

  angular
    .module('osborn.project')
    .factory('ProjectService', projectService);

  angular.$inject = ['$resource', 'SERVER_DATA'];

  function projectService($resource, SERVER_DATA) {

    const service = $resource(`http://${SERVER_DATA.ip}:${SERVER_DATA.port}/api/v1/projects/:id`, {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });

    return service;
  }
})();