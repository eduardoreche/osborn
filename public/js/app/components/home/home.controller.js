(function() {

  'use strict';

  angular
    .module('osborn')
    .controller('homeController', homeController);

  angular.$inject = [
    'projectService', 
    'resourceService', 
    'entityService', 
    'statusService', 
    'teamService'
  ];

  function homeController(projectService, resourceService, entityService, statusService, teamService) {
    var home = angular.extend(this, {
      projects: [],
      resources: [],
      status: [],
      teams: [],
      ganttChartOptions: null,
      issuesChartOptions: null
    });

    init();

    function init() {
      _loadProjects();
      _loadResouces();
      _loadIssues();
      _loadEntities();
      _loadStatus();
      _loadTeams();
    }

    function _loadResouces() {
      home.resources = resourceService.query();
    }

    function _loadProjects() {
      home.projects = projectService.query(function(projects) {

        angular.forEach(projects, function(item) {
          item.start_date = new Date(item.start_date);
          item.end_date = new Date(item.end_date);
          item.planned_start_date = new Date(item.planned_start_date);
          item.planned_end_date = new Date(item.planned_end_date);
        });
        
        _prepareGanttData(projects);
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

    function _loadStatus() {
      home.status = statusService.query();
    }

    function _loadEntities() {
      home.entities = entityService.query();
    }

    function _loadTeams() {
      home.teams = teamService.query();
    }

    function _prepareGanttData(projects) {
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

        angular.forEach(projects, function(project, key) {

          if (key > 0) {
            var ganttProject = [
              project.nickname,
              project.nickname,
              '',
              project.start_date,
              project.end_date,
              80, 50, null
            ]

            if (project.team) {
              var team = teamService.get({id: project.team}, function (team) {
                home.ganttChartOptions.dataTable[key][2] = team.name;
              });

            }
            home.ganttChartOptions.dataTable.push(ganttProject);
          }
        });
    }
  }
})();