const statusTimeline = {
  bindings: {
    'current': '@',
    'statuslist': '<'
  }, 
  templateUrl: 'js/app/components/status-timeline/status-timeline.template.html',
  controller() {

    let currentStatusItem = null;

    this.$onChanges = (changesObj) => {
      this.statusList =  this.statuslist;
      currentStatusItem = changesObj.current.currentValue;
      
      if (!changesObj.statuslist.isFirstChange()) {
        let activeStep = 0;

        this.statusList.$promise.then(function(response){
          activeStep = response.length;

          angular.forEach(response, (item, index) => {
            if(item.desc == currentStatusItem ) {
              item.active = true;
              activeStep = item.step;
            } else {
              item.active = false;
              item.former = item.step < activeStep;
            }
          });

        });
      } 
    }
  }
}

angular.module('osborn').component('statusTimeline', statusTimeline);