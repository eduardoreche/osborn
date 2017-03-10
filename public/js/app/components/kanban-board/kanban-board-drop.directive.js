(function() {
    'use strict';

    angular
        .module('osborn')
        .directive('kanbanBoardDrop', kanbanBoardDrop);

    kanbanBoardDrop.inject = [];

    function kanbanBoardDrop() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A'
        };

        return directive;
        
        function link(scope, element, attrs) {

            var dragOverClass = attrs.kanbanBoardDrop;

            var cancel = (event) => {
                if (event.preventDefault) {
                    event.preventDefault();
                }

                if (event.stopPropigation) {
                    event.stopPropigation();
                }

                return false;
            }

            element.bind('dragover', function (event) {
                cancel(event);
                event.originalEvent.dataTransfer.dropEffect = 'move';
                element.addClass(dragOverClass);
            });

            element.bind('drop', function (event) {
                cancel(event);
                element.removeClass(dragOverClass);
                var droppedData = JSON.parse(event.originalEvent.dataTransfer.getData('Text'));
                scope.onDrop(droppedData, element.attr('id'));
            });

            element.bind('dragleave', function (event) {
                element.removeClass(dragOverClass);
            })
        }
    }
})();