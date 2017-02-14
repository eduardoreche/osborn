(function() {
    'use strict';

    angular
        .module('osborn')
        .factory('appService', appService);

    appService.inject = ['$resource', '$http'];
    function appService($resource, $http) {
        
        $http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('id_token')}`;

        var service = $resource('/api/v1/positions');
        
        return service;
    }
})();