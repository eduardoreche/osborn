(function() {

  'use strict';

  angular
    .module('osborn')
    .controller('homeController', homeController);

  angular.$inject = ['projectService'];

  function homeController(projectService) {
    var home = angular.extend(this, {
      projects: [],
      resources: [],
      ganttChartOptions: null
    });

    _loadProjects();

    function _loadProjects() {
      home.projects = projectService.query(function(projects) {
        home.ganttChartOptions = {
          chartType: 'Gantt',
          dataTable: [[
            'Task ID', 
            'TaskName', 
            'Resource', 
            'Start Date', 
            'End Date', 
            'Duration', 
            'Percent Complete', 
            'Dependencies'
          ]]
        }

        angular.forEach(projects, function(item) {
          item.start_date = new Date(item.start_date);
          item.end_date = new Date(item.end_date);
          item.planned_start_date = new Date(item.planned_start_date);
          item.planned_end_date = new Date(item.planned_end_date);

          home.ganttChartOptions.dataTable.push(
            [
              item.nickname,
              item.nickname,
              item.team,
              item.start_date,
              item.end_date,
              80, 50, null
            ]
          );
        });
      });
    }
  }
})();