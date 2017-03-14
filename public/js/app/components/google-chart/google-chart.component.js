const googleChart = {
  bindings: {
    data: '<'
  },
  templateUrl: 'js/app/components/google-chart/google-chart.template.html', 
  controller(googleChartLoaderService) {
    
    var vm = angular.extend(this, {
        wrapper: null,
        dat: this.data,
        height: 0
    });

    this.$onChanges = (changesObj) => {
        if (vm.data != null) {
            vm.dat = vm.data;
        }
        if (vm.dat != null) {
        
            googleChartLoaderService.load(this.dat.chartType).then(function(response) {
                if (vm.wrapper == null) {
                    vm.wrapper = new google.visualization.ChartWrapper(vm.dat);
                    vm.wrapper.setDataTable(vm.dat.dataTable);
                    vm.wrapper.setOptions(vm.dat.options);
                    vm.wrapper.draw(document.querySelector('#googleChartDiv'));
                }
            }, function(error) {
                console.log(error);
            });
        }
    }
  }
}

googleChart.$inject = ['googleChartLoaderService'];

angular.module('osborn').component('googleChart', googleChart);