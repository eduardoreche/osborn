(function() {
    'use strict';

    angular
        .module('osborn')
        .factory('statusService', statusService);

    statusService.inject = ['$resource', '$http'];

    function statusService($resource, $http) {
        
        $http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('id_token')}`;

        var service = $resource('/api/v1/status');
        
        return service;
    }
})();