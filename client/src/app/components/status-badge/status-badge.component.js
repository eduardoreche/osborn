const statusBadge = {
  bindings: {
    status: '<'
  },
  templateUrl: 'js/app/components/status-badge/status-badge.template.html', 
  controller() {
    
    this.$onInit = () => {

    };

  }
};

angular.module('statusBadge').component('statusBadge', statusBadge);