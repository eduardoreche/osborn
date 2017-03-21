(function() {
'use strict';

    angular
        .module('osborn')
        .factory('kanbanBoardService', kanbanBoardService);

    kanbanBoardService.inject = ['$http', '$q', '$rootScope', 'statusService', 'projectService', 'teamService'];

    function kanbanBoardService($http, $q, $rootScope, statusService, projectService, teamService) {

        var prj = {};

        var service = {
            initialize: initialize,
            sendRequest: sendRequest,
            canMoveTask: canMoveTask,
            moveTask: moveTask
        };
        
        return service;

        function initialize() {
            $rootScope.$broadcast('refreshBoard');

        }

        function sendRequest() {
            $rootScope.$broadcast('refreshBoard');
            
        }

        function canMoveTask(sourceColIdVal, targetColIdVal) {
            var s = "";
            return $q(function (resolve, reject) {
                statusService.query((status) => {
                    s = status.filter(function (s) {
                        return s.desc === sourceColIdVal;
                    })[0];
                    if (s.step < targetColIdVal) {
                        resolve(true);
                    } else {
                        reject(false);
                    }
                });
            })
        }

        function moveTask(task, targetColIdVal) {
            return $q(function (resolve) {
                statusService.query((status) => {
                    var status = status.filter(function (s) {
                        return s.step == targetColIdVal;
                    })[0];
                    task.status = status.desc;
                    resolve(task);
                });
            })
        }
    }
})();