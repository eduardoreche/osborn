export class KanbanBoardService {
  constructor($q) {
    'ngInject';
    this.$q = $q;
  }
  canMoveTask(sourceColIdVal, targetColIdVal, statusList) {
    let s = '';
    return this.$q((resolve, reject) => {
      s = statusList.filter(s => {
        return s.desc === sourceColIdVal;
      })[0];
      if (s.step < targetColIdVal) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  }
  moveTask(task, targetColIdVal, statusList) {
    return this.$q(resolve => {
      task.status = statusList.filter(s => s.step.toString() === targetColIdVal)[0].desc;
      resolve(task);
    });
  }
}
