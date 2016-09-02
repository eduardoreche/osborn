(function() {

  'use strict';

  angular
    .module('osborn.project')
    .factory('projectService', projectService);

  angular.$inject = ['$resource', '$auth'];

  function projectService($resource, $auth, $http) {

    var service = $resource('/api/v1/projects/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });

    return service;
  }
})();