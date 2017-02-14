(function() {
    'use strict';

    angular
        .module('osborn')
        .factory('entityService', entityService);

    entityService.inject = ['$resource', '$http'];

    function entityService($resource, $http) {
        
        $http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('id_token')}`;

        var service = $resource('/api/v1/entities');
        
        return service;
    }
})();