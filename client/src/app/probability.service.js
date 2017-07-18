(function () {
  'use strict';

  angular
      .module('appServices')
      .factory('ProbabilityService', probabilityService);

  probabilityService.inject = ['$resource', '$http', 'SERVER_DATA'];

  function probabilityService($resource, $http, SERVER_DATA) {

    $http.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('id_token')}`;

    const service = $resource(`http://${SERVER_DATA.ip}:${SERVER_DATA.port}/api/v1/probability`);

    return service;
  }
})();
