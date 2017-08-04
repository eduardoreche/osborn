export const KanbanBoardComponent = {
    bindings: {
        tasks: '<',
        columns: '<',
        onUpdate: '&'
    },
    templateUrl: './app/components/kanban-board/kanban-board.template.html',
    controller: class KanbanBoardComponent {
        constructor($log, KanbanBoardService) {
            'ngInject';
            this.$log = $log;
            this.KanbanBoardService = KanbanBoardService;
        }
        $onChanges(changes) {
            if (changes.task) {
                this.task = angular.copy(changes.task.currentValue);
            }
        }
        saveTask(taskToSave) {
            this.onUpdate(
                {
                    $event: {
                        task: taskToSave
                    }
                }
            );
        }
        onDrop(data, targetColId) {
            this.KanbanBoardService.moveTask(data, targetColId).then(taskMoved => {
                angular.forEach(this.tasks, item => {
                    if (item.id === taskMoved.id) {
                        item.status = taskMoved.status;
                        this.saveTask(angular.copy(item));
                    }
                });
            }, this.onError);
        }
        onError(errorMessage) {
            this.$log(errorMessage);
        }
    }
};