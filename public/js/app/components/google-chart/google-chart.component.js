const googleChart = {
  bindings: {
    data: '<',
    lines: '@'
  },
  templateUrl: 'js/app/components/google-chart/google-chart.template.html', 
  controller($document, googleChartLoaderService) {
    
    var vm = angular.extend(this, {
        wrapper: null,
        dat: this.data,
        height: 0
    });

    this.$onInit = () => {

        if (vm.dat == null) {
            vm.dat = vm.data;
        }
        googleChartLoaderService.load(this.dat.chartType).then(function(response) {
            if (vm.wrapper == null) {
                vm.wrapper = new google.visualization.ChartWrapper(vm.dat);
            }
        }, function(error) {
            console.log(error);
        });
    }

    this.$onChanges = (changesObj) => {
        vm.dat = this.data;
        vm.height= (vm.data.length * 42) + 42;
        if (!(vm.wrapper === null)) {
            vm.wrapper.setDataTable(vm.dat.dataTable);
            vm.wrapper.setOptions(vm.dat.options);
            vm.wrapper.draw(document.querySelector('#googleChartDiv'));
        }
    }

  }
}

googleChart.$inject = ['$document', 'googleChartLoaderService'];

angular.module('osborn').component('googleChart', googleChart);