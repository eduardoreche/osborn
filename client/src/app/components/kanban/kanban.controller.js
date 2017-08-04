(function() {
  'use strict';

  angular
    .module('osborn.kanban')
    .controller('KanbanController', kanbanController);

  angular.$inject = ['ProjectService', 'TeamService', 'StatusService'];

  function kanbanController(ProjectService, TeamService, StatusService) {
    const vm = this;

    vm.projects = [];
    vm.kanbanData = [];
    vm.status = StatusService.query();

    init();
    function init() {
      vm.projects = ProjectService.query(projects => {
        angular.forEach(projects, item => {
          item.start_date = new Date(item.start_date);
          item.end_date = new Date(item.end_date);
          item.planned_start_date = new Date(item.planned_start_date);
          item.planned_end_date = new Date(item.planned_end_date);
        });
        _prepareKanbanData(projects);
      });
    }

    const _prepareKanbanData = projects => {

      angular.forEach(projects, project => {

        const task = {
          id: project._id,
          title: project.nickname,
          desc: project.name,
          status: project.status,
          color: ''
        };

        if (project.team) {
          TeamService.get({id: project.team}, team => {
            task.color = team.color;
            return;
          });

        }
        vm.kanbanData.push(task);
      });
    };

    vm.updateProject = $event => {
      angular.forEach(vm.projects, project => {
        if (project.id === $event.task.id) {
          project.status = $event.task.status;
          project.$update({id: $event.task.id});
        }
      });
    };
  }
})();
