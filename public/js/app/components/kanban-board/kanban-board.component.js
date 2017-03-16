const kanbanBoard = {
    bindings: {
        tasks: '<',
        columns: '<',
        onUpdate: '&'
    },

  templateUrl: 'js/app/components/kanban-board/kanban-board.template.html', 
  controller($scope, kanbanBoardService) {

    $scope.columns = [];
    $scope.tasks = [];
    $scope.isLoading = false;


    this.$onInit = ()=> {

        $scope.isLoading = true;
        $scope.refreshBoard();
    }

    this.$onChanges = (changes) => {
         if (changes.task) {
             this.task = angular.copy(changes.task.currentValue);
         }
    }

    $scope.refreshBoard = () => {
        $scope.columns = this.columns;
        $scope.tasks = this.tasks;
    }

    $scope.onDrop = (data, targetColId) => {
        kanbanBoardService.moveTask(data, targetColId).then(function (taskMoved) {
            angular.forEach($scope.tasks, function(item) {
                if (item._id == taskMoved._id) {
                    item.status = taskMoved.status;
                }
            });
        }, onError);
   }

    $scope.$parent.$on("refreshBoard", function (e) {
        $scope.refreshBoard();
    });

    var onError = function (errorMessage) {
        $scope.isLoading = false;
        console.log(errorMessage);
    }
  }
}

kanbanBoard.$inject = ['$scope', 'kanbanBoardService'];

angular.module('osborn').component('kanbanBoard', kanbanBoard);