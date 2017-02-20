const statusBadge = {
  bindings: {
    status: '<'
  },
  templateUrl: 'js/app/components/status-badge/status-badge.template.html', 
  controller() {
    
    this.$onInit = ()=> {
      console.log(this.status);
    }

  }
}

angular.module('osborn').component('statusBadge', statusBadge);