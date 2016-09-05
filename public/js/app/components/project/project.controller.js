(function() {

  'use strict';

  angular
    .module('osborn.project')
    .controller('projectController', projectController);

  projectController.$inject = ['$scope', '$state', '$stateParams', 'projectService'];

  function projectController($scope, $state, $stateParams, projectService) {

    var vm = angular.extend(this, {
      projects: [],
      project: $stateParams.id ? projectService.get({id: $stateParams.id}, function(project){
        project.start_date = new Date(project.start_date);
        project.end_date = new Date(project.end_date);

        return project;
        
      }) : new projectService(),
      
      save: save, 
      delete: remove, 
      edit: edit

    });

    _loadProjects();

    // ******************************************************

    function save() {
      if( vm.project._id != null )
        _update();
      else
        _add();

      $state.go('projects.list');
    }

    function edit(id) {
      $state.go('projects.edit', {id: id});
    }

    function remove(project) {
      project.$delete({id: project._id});
      _loadProjects();
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
    }


  }

})();