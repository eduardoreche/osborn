(function() {
    'use strict';

    angular
        .module('osborn')
        .directive('kanbanBoardDragg', kanbanBoardDragg);

    kanbanBoardDragg.inject = [''];
    function kanbanBoardDragg() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            link: link
        };

        return directive;
        
        function link($scope, element, attrs) {
            var dragData = "";

            $scope.$watch(attrs.kanbanBoardDragg, function (newValue) {
                dragData = newValue;
            });

            element.bind('dragstart', function (event) {
                event.originalEvent.dataTransfer.setData("Text", JSON.stringify(dragData));
            });
        }
    }
})();