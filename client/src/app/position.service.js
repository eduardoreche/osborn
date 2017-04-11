(function() {
    'use strict';

    angular
        .module('appServices')
        .factory('PositionService', positionService);

    positionService.inject = ['$resource', '$http'];

    function positionService($resource, $http) {
        
        $http.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('id_token')}`;

        const service = $resource('http://localhost:3000/api/v1/positions');
        
        return service;
    }
})();