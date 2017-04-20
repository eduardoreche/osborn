(function() {

  'use strict';

  angular
    .module('osborn.project')
    .controller('ProjectController', projectController);

  projectController.$inject = [
    '$scope', 
    '$state', 
    '$stateParams', 
    'ProjectService', 
    'StatusService', 
    'EntityService', 
    'TeamService', 
    'PositionService',
    'ResourceService',
    'ProjectTypesService'
  ];

  function projectController(
    $scope, 
    $state, 
    $stateParams, 
    ProjectService, 
    StatusService, 
    EntityService, 
    TeamService, 
    PositionService,
    ResourceService,
    ProjectTypesService
  ) {

    const vm = this;
    vm.projects = [];
    vm.status = [];
    vm.entities = [];
    vm.teams = [];
    vm.positions = [];
    vm.available_resources = [];
    vm.profilesToAdd = [];
    vm.project_types = [];
    vm.kanbanData = [];
    vm.project = $stateParams.id ? ProjectService.get({id: $stateParams.id}, project => {
      project.start_date = new Date(project.start_date);
      project.end_date = new Date(project.end_date);
      project.planned_start_date = new Date(project.planned_start_date);
      project.planned_end_date = new Date(project.planned_end_date);

      return project;
      
    }) : new ProjectService();
    vm.save = save; 
    vm.delete = remove; 
    vm.edit = edit;
    vm.addNewProfile = addNewProfile;
    vm.addProfile = addProfile;
    vm.removeProfile = removeProfile;
    vm.statusLabel = statusLabel;
    vm.updateProject = updateProject;
    vm.allocate = allocate;

    _loadProjects();

    // ******************************************************

    function save() {
      if (vm.project._id) {
        _update();
      } else {
        _add();
      }

      _loadProjects();  
      $state.go('projects.list');
    }

    function edit(id) {
      $state.go('projects.edit', {id});
    }

    function allocate(id) {
      $state.go('projects.allocate', {id});
    }

    function remove(project) {
      project.$delete({id: project._id});
      _loadProjects();
    }

    function addProfile(profileToAdd) {
      const index = vm.profilesToAdd.indexOf(profileToAdd);

      vm.profilesToAdd.splice(index, 1);
      if (!vm.project.profiles) {
        vm.project.profiles = [];
      }
      vm.project.profiles.push(angular.copy(profileToAdd));
    }

    function addNewProfile() {
      vm.profilesToAdd.push({
        profile: '',
        total: 0
      });
    }

    function removeProfile(profileToRemove) {
      const index = vm.project.profiles.indexOf(profileToRemove);
      vm.project.profiles.splice(index, 1);
    }
    
    function statusLabel(project) {
      let label = 'label-';

      switch (project.status) {
        case 'Em andamento':
          label += 'primary';
          break;
        case 'Encerrada':
          label += 'success';
          break;
        case 'Pré-venda':
          label += 'warning';
          break;
        default:
          label += 'danger';
          break;
      } 

      return label;
    }
  
    const _add = function() {
      return vm.project.$save();
    };

    const _update = function() {
      vm.project.$update({id: vm.project._id});
    };

    function _loadProjects() {

      vm.projects = ProjectService.query(projects => {

        angular.forEach(projects, item => {
          item.start_date = new Date(item.start_date);
          item.end_date = new Date(item.end_date);
          item.planned_start_date = new Date(item.planned_start_date);
          item.planned_end_date = new Date(item.planned_end_date);
          
        });

        _prepareKanbanData(projects);
      });
      vm.status = StatusService.query();
      vm.entities = EntityService.query();
      vm.teams = TeamService.query();
      vm.positions = PositionService.query();
      vm.available_resources = ResourceService.query();
      vm.project_types = ProjectTypesService.query();
    }

    function updateProject(event) {
      vm.project = event.task;
      vm.project.$update({id: vm.project._id});
    }

    const _prepareKanbanData = projects => {

      angular.forEach(projects, project => {

        const task = {
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
  }

})();