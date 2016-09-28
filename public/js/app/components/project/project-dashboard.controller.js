(function() {

  'use strict';

  angular
    .module('osborn.project')
    .controller('projectDashboardController', projectDashboardController);

  projectDashboardController.$inject = ['$scope', '$state', '$stateParams', 'projectService', 'allocationService'];

  function projectDashboardController($scope, $state, $stateParams, projectService, allocationService) {

    var vm = angular.extend(this, {
      project: {},

      statusLabel: statusLabel,

      allocationChartLabels: [],
      allocationChartData: [], 

      totalAllocationHours: totalAllocationHours

    });

    _initialize();

    function statusLabel() {
      var label = 'label-';

      switch (vm.project.status) {
        case 'open':
          label += 'primary';
          break;
        case 'closed':
          label += 'success';
          break;
        case 'prospect':
          label += 'warning';
          break;
        default:
          label += 'danger';
          break;
      } 

      return label;
    }

    function totalAllocationHours() {
      var total = 0;
      angular.forEach(vm.project.allocations, (item) => {
        total += item.hours;
      });

      return total;
    }


    function _initialize() {
      vm.project = $stateParams.id ? projectService.get({id: $stateParams.id}, (project)=> {
        project.start_date = new Date(project.start_date);
        project.end_date = new Date(project.end_date);

        var alloc = _loadChartData();
        vm.allocationChartLabels = Object.keys(alloc);
        vm.allocationChartData = vm.allocationChartLabels.map( (v) => { return alloc[v] } );

        return project;
        
      }) : new projectService();
      
    }

    function _loadChartData() {
      var alloc = {};
      vm.project.allocations.map( (item)=> {
        alloc[item.resource.position] = (alloc[item.resource.position] ? 
                alloc[item.resource.position]+1 : 1 ); 
      } )

      return alloc;
    }    
  }
})(); 