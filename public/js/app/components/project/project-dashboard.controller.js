(function() {

  'use strict';

  angular
    .module('osborn.project')
    .controller('projectDashboardController', projectDashboardController);

  projectDashboardController.$inject = ['$scope', '$state', '$stateParams', 'projectService', 'allocationService'];

  function projectDashboardController($scope, $state, $stateParams, projectService, allocationService) {

    var vm = angular.extend(this, {
      project: $stateParams.id ? projectService.get({id: $stateParams.id}, (project)=> {
        project.start_date = new Date(project.start_date);
        project.end_date = new Date(project.end_date);

        return project;
        
      }) : new projectService(),

    });

  }
})();