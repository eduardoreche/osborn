(function() {

  'use strict';

  angular
    .module('osborn')
    .controller('homeController', homeController);

  angular.$inject = ['projectService', 'resourceService'];

  function homeController(projectService, resourceService) {
    var home = angular.extend(this, {
      projects: [],
      resources: [],
      ganttChartOptions: null,
      issuesChartOptions: null
    });

    home.$onInit = () => {
      _loadProjects();
      _loadResouces();
      _loadIssues();
    }

    function _loadResouces() {
      home.resources = resourceService.query();
    }

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
          ]],
          options: {
            height: (projects.length * 42)
          }
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

    function _loadIssues() {
      home.issuesChartOptions = {
        chartType: 'PieChart',
        dataTable: [
          ['Status', 'Issues'],
          ['Open', 11],
          ['Resolved', 2],
          ['Active', 2]
        ],
        options: {
          is3D: true
        }
      }
    }
  }
})();