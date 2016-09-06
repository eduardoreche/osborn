(function() {

  'use strict';

  angular
    .module('osborn.project')
    .factory('resourceService', resourceService);

  angular.$inject = ['$resource', '$http', '$auth'];

  function resourceService($resource, $http, $auth) {

    $http.defaults.headers.common['x-access-token'] = 
                        $auth.persistData().auth_headers['x-access-token'];

    var service = $resource('/api/v1/resources/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });

    return service;
  }
})();