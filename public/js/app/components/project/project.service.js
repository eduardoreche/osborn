(function() {

  'use strict';

  angular
    .module('osborn.project')
    .factory('projectService', projectService);

  angular.$inject = ['$resource', '$auth', '$http'];

  function projectService($resource, $auth, $http) {

    $http.defaults.headers.common['x-access-token'] = 
                        $auth.persistData().auth_headers['x-access-token'];

    var service = $resource('/api/v1/projects/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });

    return service;
  }
})();