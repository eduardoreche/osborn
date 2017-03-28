(function() {
    'use strict';

    angular
        .module('osborn')
        .factory('EntityService', entityService);

    entityService.inject = ['$resource', '$http'];

    function entityService($resource, $http) {
        
        $http.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('id_token')}`;

        const service = $resource('/api/v1/entities');
        
        return service;
    }
})();