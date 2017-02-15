const statusTimeline = {
  bindings: {
    'current-status': '<'
  }, 
  template: '<div>{{ $ctrl.test }}</div>',
  controller() {
    this.$onInit = () => {
      this.test = 'test';
      console.log('component initiated');
    }
  }
}

angular.module('osborn').component('statusTimeline', statusTimeline);