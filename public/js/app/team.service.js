(function() {
    'use strict';

    angular
        .module('osborn')
        .factory('teamService', teamService);

    teamService.inject = ['$resource', '$http'];

    function teamService($resource, $http) {
        
        $http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('id_token')}`;

        var service = $resource('/api/v1/teams');
        
        return service;
    }
})();