const statusTimeline = {
  bindings: {
    current: '@',
    statuslist: '<'
  }, 
  templateUrl: './app/components/status-timeline/status-timeline.template.html',
  controller() {

    let currentStatusItem = null;

    this.$onChanges = changesObj => {
      this.statusList = this.statuslist;
      currentStatusItem = changesObj.current.currentValue;
      
      if (!changesObj.statuslist.isFirstChange()) {
        let activeStep = 0;

        this.statusList.$promise.then(response => {
          activeStep = response.length;

          angular.forEach(response, item => {
            if (item.desc === currentStatusItem) {
              item.active = true;
              activeStep = item.step;
            } else {
              item.active = false;
              item.former = item.step < activeStep;
            }
          });

        });
      } 
    };
  }
};

angular.module('statusTimeline').component('statusTimeline', statusTimeline);
