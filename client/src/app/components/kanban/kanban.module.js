(function () {
  'use strict';

  angular
    .module('osborn.kanban', [])
    .config($stateProvider => {
      $stateProvider
        .state('kanban', {
          url: '/kanban',
          templateUrl: 'app/components/kanban/kanban.template.html',
          controller: 'KanbanController as pc'
        });
    });
})();
