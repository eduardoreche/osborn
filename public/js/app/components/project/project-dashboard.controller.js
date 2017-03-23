(function() {

  'use strict';

  angular
    .module('osborn.project')
    .controller('projectDashboardController', projectDashboardController);

  projectDashboardController.$inject = ['$scope', '$state', '$stateParams', 'projectService', 'allocationService', 'statusService'];

  function projectDashboardController($scope, $state, $stateParams, projectService, allocationService, statusService) {

    var vm = angular.extend(this, {
      project: {},

      statusLabel: statusLabel,

      allocationChartLabels: [],
      allocationChartData: [], 
      statuslist: [],

      ragChartOptions: null,
      ganttChartOptions: null,
      donutChartOptions: null,

      totalAllocationHours: totalAllocationHours

    });

    _initialize();

    function statusLabel() {
      var label = 'label-';

      switch (vm.project.status) {
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
        vm.statuslist = statusService.query();

        vm.donutChartOptions = {
          chartType: 'PieChart',
          dataTable: [
            ['Profile', 'Total']
          ],
          options: {
            pieHole: 0.4
          }
        };

        vm.ganttChartOptions = {
          chartType: 'Gantt',
          dataTable: [
            ['Task ID', 'Resource Name', 'Position', 'Start Date', 'End Date', 'Duration', 'Percent Complete', 'Dependencies'],
            ['Project', 'Project', '', project.start_date, project.end_date, 0, 0, null]
          ],
          options: {
            height: (project.allocations.length * 42) + (42 *2)
          }
        };

        angular.forEach(alloc, function(value, key) {
          vm.donutChartOptions.dataTable.push([key, value]);
        });

        angular.forEach(project.allocations, function(item) {

          vm.ganttChartOptions.dataTable.push(
            [
              item.resource.name,
              item.resource.name,
              item.resource.position,
              new Date(item.start_date),
              new Date(item.end_date),
              80, 50, null
            ]
          );
        });

        vm.ragChartOptions = {
          chartType: 'Gauge',
          dataTable: [
            ['Label', 'Value'],
            ['RAG', 3]
          ],
          options: {
            width: 110,
            height: 110,
            redFrom: 100,
            redTo: 65,
            yellowFrom: 65,
            yellowTo: 35,
            greenFrom: 35,
            greenTo: 0,
            minorTicks: 20,
            max: 0,
            min: 100,
            majorTicks: ['100', '1']
          }
        }

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