import {KanbanBoardComponent} from './kanban-board.component';
import {KanbanBoardDrag} from './kanban-board-drag.directive';
import {KanbanBoardDrop} from './kanban-board-drop.directive';

export const KanbanBoardModule = angular
  .module('kanbanBoard', [])
  .component('kanbanBoard', KanbanBoardComponent)
  .directive('kanbanBoardDrag', KanbanBoardDrag)
  .directive('kanbanBoardDrop', KanbanBoardDrop)
  .name;