const kanbanBoard = {
    bindings: {
        tasks: '<',
        columns: '<',
        onUpdate: '&'
    },

  templateUrl: 'js/app/components/kanban-board/kanban-board.template.html', 
  controller($scope, $log, KanbanBoardService) {

    $scope.columns = [];
    $scope.tasks = [];
    $scope.isLoading = false;

    $scope.saveTask = taskToSave => {
        this.onUpdate({
            $event: {
                task: taskToSave
            }
        });
    };

    this.$onInit = () => {
        $scope.isLoading = true;
        $scope.refreshBoard();
    };

    this.$onChanges = changes => {
         if (changes.task) {
             this.task = angular.copy(changes.task.currentValue);
         }
    };

    $scope.refreshBoard = () => {
        $scope.columns = this.columns;
        $scope.tasks = this.tasks;
    };

    $scope.onDrop = (data, targetColId) => {
        KanbanBoardService.moveTask(data, targetColId).then(taskMoved => {
            angular.forEach($scope.tasks, item => {
                if (item._id === taskMoved._id) {
                    item.status = taskMoved.status;
                    $scope.saveTask(angular.copy(item));
                }
            });
        }, onError);
   };

    $scope.$parent.$on('refreshBoard', () => {
        $scope.refreshBoard();
    });

    const onError = errorMessage => {
        $scope.isLoading = false;
        $log(errorMessage);
    };
  }
};

kanbanBoard.$inject = ['$scope', 'KanbanBoardService'];

angular.module('osborn').component('kanbanBoard', kanbanBoard);
