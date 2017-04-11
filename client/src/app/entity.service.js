(function() {
    'use strict';

    angular
        .module('appServices')
        .factory('EntityService', entityService);

    entityService.inject = ['$resource', '$http'];

    function entityService($resource, $http) {
        
        $http.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('id_token')}`;

        const service = $resource('http://localhost:3000/api/v1/entities');
        
        return service;
    }
})();