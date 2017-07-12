(function () {
  'use strict';

  angular
    .module('osborn.home')
    .controller('HomeController', homeController);

  angular.$inject = [
    'ResourceService', 
    'ProjectService', 
    'StatusService', 
    'EntityService', 
    'TeamService'
  ];

  function homeController(
    ResourceService, 
    ProjectService, 
    StatusService, 
    EntityService, 
    TeamService
  ) {
    const vm = this;
    vm.projects = [];
    vm.resources = [];
    vm.status = [];
    vm.teams = [];
    vm.ganttChartOptions = null;
    vm.issuesChartOptions = null;

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
      vm.resources = ResourceService.query();
    }

    function _loadProjects() {
      vm.projects = ProjectService.query(projects => {
        angular.forEach(projects, item => {
          item.start_date = new Date(item.start_date);
          item.end_date = new Date(item.end_date);
          item.planned_start_date = new Date(item.planned_start_date);
          item.planned_end_date = new Date(item.planned_end_date);
        });
        _prepareGanttData(projects);
      });
    }

    function _loadIssues() {
      vm.issuesChartOptions = {
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
      };
    }

    function _loadStatus() {
      vm.status = StatusService.query();
    }

    function _loadEntities() {
      vm.entities = EntityService.query();
    }

    function _loadTeams() {
      vm.teams = TeamService.query();
    }

    function _prepareGanttData(projects) {
      vm.ganttChartOptions = {
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
      };

      angular.forEach(projects, (project, key) => {
        if (key > 0) {
          const ganttProject = [
            project.nickname,
            project.nickname,
            '',
            project.start_date,
            project.end_date,
            80, 50, null
          ];

          if (project.team) {
            TeamService.get({id: project.team}, team => {
              vm.ganttChartOptions.dataTable[key][2] = team.name;
            });
          }
          vm.ganttChartOptions.dataTable.push(ganttProject);
        }
      });
    }
  }
})();
