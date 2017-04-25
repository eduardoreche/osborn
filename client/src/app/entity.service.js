(function() {
    'use strict';

    angular
        .module('appServices')
        .factory('EntityService', entityService);

    entityService.inject = ['$resource', '$http', 'SERVER_DATA'];

    function entityService($resource, $http, SERVER_DATA) {
        
        $http.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('id_token')}`;

        const service = $resource(`http://${SERVER_DATA.ip}:${SERVER_DATA.port}/api/v1/entities`);
        
        return service;
    }
})();