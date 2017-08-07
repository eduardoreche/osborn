import {KanbanBoardComponent} from './kanban-board.component';
import {KanbanBoardDrag} from './kanban-board-drag.directive';
import {KanbanBoardDrop} from './kanban-board-drop.directive';
import {KanbanBoardService} from './kanban-board.service';

export const KanbanBoardModule = angular
  .module('kanbanBoard', [])
  .component('kanbanBoard', KanbanBoardComponent)
  .directive('kanbanBoardDrag', KanbanBoardDrag)
  .directive('kanbanBoardDrop', KanbanBoardDrop)
  .service('KanbanBoardService', KanbanBoardService)
  .name;
