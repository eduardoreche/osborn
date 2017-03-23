(function() {

  'use strict';

  angular
    .module('osborn.project')
    .controller('projectController', projectController);

  projectController.$inject = [
    '$scope', 
    '$state', 
    '$stateParams', 
    'projectService', 
    'statusService', 
    'entityService', 
    'teamService', 
    'positionService',
    'resourceService',
    'projectTypesService'
  ];

  function projectController(
    $scope, 
    $state, 
    $stateParams, 
    projectService, 
    statusService, 
    entityService, 
    teamService, 
    positionService,
    resourceService,
    projectTypesService
  ) {

    var vm = angular.extend(this, { 
      projects: [],
      status: [],
      entities: [],
      teams: [],
      positions: [],
      available_resources: [],

      profilesToAdd: [],
      project_types: [],
      kanbanData: [],

      project: $stateParams.id ? projectService.get({id: $stateParams.id}, function(project){
        project.start_date = new Date(project.start_date);
        project.end_date = new Date(project.end_date);
        project.planned_start_date = new Date(project.planned_start_date);
        project.planned_end_date = new Date(project.planned_end_date);

        return project;
        
      }) : new projectService(),
      
      save: save, 
      delete: remove, 
      edit: edit,

      addNewProfile: addNewProfile,
      addProfile: addProfile,
      removeProfile: removeProfile,

      statusLabel: statusLabel,

      updateProject: updateProject

    });

    _loadProjects();

    // ******************************************************

    function save() {
      if( vm.project._id != null )
        _update();
      else
        _add();

      _loadProjects();  
      $state.go('projects.list');
    }

    function edit(id) {
      $state.go('projects.edit', {id: id});
    }

    function allocate(id) {
      $state.go('projects.allocate', {id: id});
    }

    function remove(project) {
      project.$delete({id: project._id});
      _loadProjects();
    }

    function addProfile(profileToAdd) {
      var index = vm.profilesToAdd.indexOf(profileToAdd);

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
      var index = vm.project.profiles.indexOf(profileToRemove);
      vm.project.profiles.splice(index, 1);
      console.log(vm.project.profiles);
    }
    
    function statusLabel(project) {
      var label = 'label-';

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
  
    var _add = function() {
      return vm.project.$save();
    }

    var _update = function() {
      vm.project.$update({id: vm.project._id});
    }

    function _loadProjects() {

      vm.projects = projectService.query(function(projects){

        angular.forEach(projects, function(item) {
          item.start_date = new Date(item.start_date);
          item.end_date = new Date(item.end_date);
          item.planned_start_date = new Date(item.planned_start_date);
          item.planned_end_date = new Date(item.planned_end_date);
          
        });

        _prepareKanbanData(projects);
      });
      vm.status = statusService.query();
      vm.entities = entityService.query();
      vm.teams = teamService.query();
      vm.positions = positionService.query();
      vm.available_resources = resourceService.query();
      vm.project_types = projectTypesService.query();
    }

    function daysToMilliseconds(days) {
      return days * 24 * 60 * 60 * 1000;
    }

    function updateProject(event) {
      vm.project = event.task;
      vm.project.$update({id: vm.project._id});
    }

    var _prepareKanbanData = (projects) => {

      angular.forEach(projects, function(project) {

        var task = {
          title: project.nickname,
          desc: project.name,
          status: project.status,
          color: ''
        };

        if (project.team) {
          var teamColor = teamService.get({id: project.team}, function (team) {
            task.color = team.color;
          });

        }
        vm.kanbanData.push(task);
      });
    }
  }

})();