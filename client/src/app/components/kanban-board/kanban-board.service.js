(function() {
'use strict';

    angular
        .module('osborn')
        .factory('KanbanBoardService', kanbanBoardService);

    kanbanBoardService.inject = ['$http', '$q', '$rootScope', 'StatusService'];

    function kanbanBoardService($http, $q, $rootScope, StatusService) {

        const service = {
            initialize,
            sendRequest,
            canMoveTask,
            moveTask
        };
        
        return service;

        function initialize() {
            $rootScope.$broadcast('refreshBoard');

        }

        function sendRequest() {
            $rootScope.$broadcast('refreshBoard');
            
        }

        function canMoveTask(sourceColIdVal, targetColIdVal) {
            let s = '';
            return $q((resolve, reject) => {
                StatusService.query(status => {
                    s = status.filter(s => {
                        return s.desc === sourceColIdVal;
                    })[0];
                    if (s.step < targetColIdVal) {
                        resolve(true);
                    } else {
                        reject(false);
                    }
                });
            });
        }

        function moveTask(task, targetColIdVal) {
            return $q(resolve => {
                StatusService.query(status => {
                    status = status.filter(s => {
                        return s.step === targetColIdVal;
                    })[0];
                    task.status = status.desc;
                    resolve(task);
                });
            });
        }
    }
})();