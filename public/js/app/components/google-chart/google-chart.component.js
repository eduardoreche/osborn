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
        height: (this.lines * 42) + 42
    });

    this.$onInit = () => {

        if (vm.dat == null) {
            vm.dat = vm.data;
        }
        googleChartLoaderService.load(this.dat.chartType).then(function(response) {
            if (vm.wrapper == null) {
                vm.wrapper = new google.visualization.ChartWrapper(vm.dat);
            } else {
                vm.wrapper.setDataTable(this.dat.dataTable);
                vm.wrapper.setOptions(this.dat.options);
            }
            vm.wrapper.draw(this.googleChartDiv);
        }, function(error) {
            console.log(error);
        });
    }

    this.$onChanges = (changesObj) => {
        this.dat = this.data;
    }

  }
}

googleChart.$inject = ['$document', 'googleChartLoaderService'];

angular.module('osborn').component('googleChart', googleChart);