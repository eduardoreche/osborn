export const KanbanBoardDrop = () => {
  'ngInject';
  return {
    restrict: 'A',
    require: '^kanbanBoard',
    link($scope, $element, $attrs, $ctrl) {
      const dragOverClass = $attrs.kanbanBoardDrop;

      const cancel = event => {
        if (event.preventDefault) {
          event.preventDefault();
        }

        if (event.stopPropigation) {
          event.stopPropigation();
        }

        return false;
      };

      $element.on('dragover', event => {
        cancel(event);
        event.dataTransfer.dropEffect = 'move';
        $element.addClass(dragOverClass);
      });

      $element.on('drop', event => {
        cancel(event);
        $element.removeClass(dragOverClass);
        const droppedData = angular.fromJson(event.dataTransfer.getData('Text'));
        $ctrl.onDrop(droppedData, $element.attr('id'));
      });

      $element.on('dragleave', () => {
        $element.removeClass(dragOverClass);
      });
    }
  };
};
