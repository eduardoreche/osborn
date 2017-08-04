export const KanbanBoardDrag = () => {
    'ngInject';
    return {
        link($scope, $element, $attrs) {
            let dragData = '';

            $scope.$watch($attrs.kanbanBoardDrag, newValue => {
                dragData = newValue;
            });

            $element.on('dragstart', event => {
                event.dataTransfer.setData('Text', angular.toJson(dragData));
            });
        }
    };
};