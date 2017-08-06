export class KanbanBoardService {
  constructor($q, StatusService) {
    'ngInject';
    this.$q = $q;
    this.statusService = StatusService;
  }
  canMoveTask(sourceColIdVal, targetColIdVal) {
    let s = '';
    return this.$q((resolve, reject) => {
      this.statusService.query(status => {
        s = status.filter(s => {
          return s.desc === sourceColIdVal;
        })[0];
        if (s.step < targetColIdVal) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  }
  moveTask(task, targetColIdVal) {
    return this.$q(resolve => {
      this.statusService.query(status => {
        status = status.filter(s => s.step.toString() === targetColIdVal)[0];
        task.status = status.desc;
        resolve(task);
      });
    });
  }
}

