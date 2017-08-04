(function () {
  'use strict';

  angular
    .module('appServices')
    .factory('StatusService', statusService);

  statusService.inject = ['$resource', '$http', 'SERVER_DATA'];

  function statusService($resource, $http, SERVER_DATA) {

    $http.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('id_token')}`;

    const service = $resource(`http://${SERVER_DATA.ip}:${SERVER_DATA.port}/api/v1/status`);

    return service;
  }
})();
