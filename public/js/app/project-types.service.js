(function() {
    'use strict';

    angular
        .module('osborn')
        .factory('projectTypesService', projectTypesService);

    projectTypesService.inject = ['$resource', '$http'];

    function projectTypesService($resource, $http) {
        
        $http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('id_token')}`;

        var service = $resource('/api/v1/project-types');
        
        return service;
    }
})();