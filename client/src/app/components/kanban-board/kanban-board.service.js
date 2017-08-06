(function () {
  'use strict';

  angular
    .module('kanbanBoard')
    .factory('KanbanBoardService', KanbanBoardService);

  KanbanBoardService.inject = ['$http', '$q', 'StatusService'];

  function KanbanBoardService($http, $q, StatusService) {

    const service = {
      canMoveTask,
      moveTask
    };

    return service;

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
          status = status.filter(s => s.step.toString() === targetColIdVal)[0];
          task.status = status.desc;
          resolve(task);
        });
      });
    }
  }
})();
