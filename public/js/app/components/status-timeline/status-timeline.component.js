const statusTimeline = {
  bindings: {
    'current': '@'
  }, 
  templateUrl: 'js/app/components/status-timeline/status-timeline.template.html',
  controller() {
    this.$onInit = () => {
      this.possibleStatus = [
        {id: 1, desc: 'Oportunidade', icon: 'bullhorn'}, 
        {id: 2, desc: 'Pré-venda', icon: 'tasks'},
        {id: 3, desc: 'Em andamento', icon: 'road'},
        {id: 4, desc: 'Garantia', icon: 'wrench'},
        {id: 5, desc: 'Encerrada', icon: 'sunglasses'},
        {id: 6, desc: 'Cancelada', icon: 'thumbs-down'}
      ];
      console.log(`status: ${this.current}`);
    }
  }
}

angular.module('osborn').component('statusTimeline', statusTimeline);