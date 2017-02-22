(function() {

  'use strict';

  angular
    .module('osborn.project')
    .controller('projectController', projectController);

  projectController.$inject = ['$scope', '$state', '$stateParams', 'projectService', 'statusService', 'entityService', 'teamService', 'positionService'];

  function projectController($scope, $state, $stateParams, projectService, statusService, entityService, teamService, positionService) {

    var vm = angular.extend(this, { 
      projects: [],
      status: [],
      entities: [],
      teams: [],
      positions: [],

      profilesToAdd: [{
        profile: '',
        total: 0
      }],

      project: $stateParams.id ? projectService.get({id: $stateParams.id}, function(project){
        project.start_date = new Date(project.start_date);
        project.end_date = new Date(project.end_date);

        return project;
        
      }) : new projectService(),
      
      save: save, 
      delete: remove, 
      edit: edit,

      addNewProfile: addNewProfile,
      addProfile: addProfile,
      removeProfile: removeProfile,

      statusLabel: statusLabel

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
        })
      });
      vm.status = statusService.query();
      vm.entities = entityService.query();
      vm.teams = teamService.query();
      vm.positions = positionService.query();
    }

  }

})();