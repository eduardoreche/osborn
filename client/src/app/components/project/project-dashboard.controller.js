(function() {

  'use strict';

  angular
    .module('osborn.project')
    .controller('ProjectDashboardController', projectDashboardController);

  projectDashboardController.$inject = ['$scope', '$state', '$stateParams', 'ProjectService', 'StatusService'];

  function projectDashboardController($scope, $state, $stateParams, ProjectService, StatusService) {
    const vm = this;
    vm.project = {};
    vm.statusLabel = statusLabel;
    vm.allocationChartLabels = [];
    vm.allocationChartData = [];
    vm.statuslist = [];
    vm.ragChartOptions = null;
    vm.ragScopeCostTimeChartOptions = null;
    vm.ganttChartOptions = null;
    vm.donutChartOptions = null;
    vm.totalAllocationHours = totalAllocationHours;

    _initialize();

    function statusLabel() {
      let label = 'label-';

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
      let total = 0;
      angular.forEach(vm.project.allocations, item => {
        total += item.hours;
      });

      return total;
    }

    function _initialize() {
      vm.project = $stateParams.id ? ProjectService.get({id: $stateParams.id}, project => {
        project.start_date = new Date(project.start_date);
        project.end_date = new Date(project.end_date);

        const alloc = _loadChartData();
        vm.allocationChartLabels = Object.keys(alloc);
        vm.allocationChartData = vm.allocationChartLabels.map(v => {
          return alloc[v];
        });
        vm.statuslist = StatusService.query();

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
            height: (project.allocations.length * 42) + (42 * 2)
          }
        };

        angular.forEach(alloc, (value, key) => {
          vm.donutChartOptions.dataTable.push([key, value]);
        });

        angular.forEach(project.allocations, item => {

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
        };

        vm.ragScopeCostTimeChartOptions = {
          chartType: 'Gauge',
          dataTable: [
            ['Label', 'Value'],
            ['Scope', 3],
            ['Cost', 3],
            ['Time', 3]
          ],
          options: {
            width: 300,
            height: 100,
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
        };

        return project;
      }) : new ProjectService();
    }

    function _loadChartData() {
      const alloc = {};
      vm.project.allocations.map(item => {
        alloc[item.resource.position] = (alloc[item.resource.position] ?
              alloc[item.resource.position] + 1 : 1);
        return item;
      });

      return alloc;
    }
  }
})();
