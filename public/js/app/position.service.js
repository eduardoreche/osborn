(function() {
    'use strict';

    angular
        .module('osborn')
        .factory('positionService', positionService);

    positionService.inject = ['$resource', '$http'];

    function positionService($resource, $http) {
        
        $http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('id_token')}`;

        var service = $resource('/api/v1/positions');
        
        return service;
    }
})();