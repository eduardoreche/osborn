(function() {
    'use strict';

    angular
        .module('kanbanBoard')
        .directive('kanbanBoardDragg', kanbanBoardDragg);

    kanbanBoardDragg.inject = [''];
    function kanbanBoardDragg() {
        // Usage:
        //
        // Creates:
        //
        const directive = {
            link
        };

        return directive;
        
        function link($scope, element, attrs) {
            let dragData = '';

            $scope.$watch(attrs.kanbanBoardDragg, newValue => {
                dragData = newValue;
            });

            element.bind('dragstart', event => {
                event.dataTransfer.setData('Text', angular.toJson(dragData));
            });
        }
    }
})();