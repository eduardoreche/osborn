const statusTimeline = {
  bindings: {
    'current': '@'
  }, 
  templateUrl: 'js/app/components/status-timeline/status-timeline.template.html',
  controller() {

    let currentStatusItem = null;

    this.$onInit = () => {
      this.statusList = [
        {step: 1, desc: 'Oportunidade', icon: 'bullhorn'}, 
        {step: 2, desc: 'Pré-venda', icon: 'tasks'},
        {step: 3, desc: 'Em andamento', icon: 'road'},
        {step: 4, desc: 'Garantia', icon: 'wrench'},
        {step: 5, desc: 'Encerrada', icon: 'sunglasses'},
        {step: 6, desc: 'Cancelada', icon: 'thumbs-down'}
      ];
      
      let activeStep = this.statusList.length;

      angular.forEach(this.statusList, (item, index) => {
        if( item.desc == this.current ) {
          item.active = true;
          activeStep = item.step;
        } else {
          item.active = false;
          item.former = item.step < activeStep;
        }
      });
    }
  }
}

angular.module('osborn').component('statusTimeline', statusTimeline);