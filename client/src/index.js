'use strict';

import angular from 'angular';
import ngresource from 'angular-resource';
import uirouter from 'angular-ui-router';
import ngsanitize from 'angular-sanitize';
import angularjwt from 'angular-jwt';
// import nggooglecharts from 'ng-google-charts';

require('./app/components/home/home.module');
require('./app/components/home/home.controller');

require('./app/components/project/project.module');
require('./app/components/project/project.service');
require('./app/components/project/project.controller');
require('./app/components/project/project-dashboard.controller');

require('./app/components/resource/resource.module');
require('./app/components/resource/resource.service');
require('./app/components/resource/resource.controller');
require('./app/components/resource/resource-dashboard.controller');

require('./app/components/team/team.module');
require('./app/components/team/team.service');
require('./app/components/team/team.controller');

require('./app/components/user/user.module');
require('./app/components/user/user.service');
require('./app/components/user/user.controller');

require('./app/components/allocation/allocation.module');
require('./app/components/allocation/allocation.controller');
require('./app/components/allocation/allocation.service');

require('./app/components/kanban-board/kanban-board.module');
require('./app/components/kanban-board/kanban-board-drag.directive');
require('./app/components/kanban-board/kanban-board-drop.directive');
require('./app/components/kanban-board/kanban-board.component');
require('./app/components/kanban-board/kanban-board.service');

require('./app/components/toolbar/toolbar.module');
require('./app/components/toolbar/toolbar.directive');

require('./app/components/status-badge/status-badge.module');
require('./app/components/status-badge/status-badge.component');

require('./app/components/status-timeline/status-timeline.module');
require('./app/components/status-timeline/status-timeline.component');

require('./app/app-services.module');
require('./app/entity.service');
require('./app/position.service');
require('./app/project-types.service');
require('./app/status.service');

angular
  .module('osborn', [
    ngresource,
    uirouter,
    ngsanitize,
    angularjwt, /* 
    nggooglecharts, */

    'osborn.home',
    'osborn.project',
    'osborn.resource',
    'osborn.allocation',
    'osborn.user',
    'osborn.team'
  ])
  .value('_', window._)
  .config(($urlRouterProvider, $httpProvider) => {
    $urlRouterProvider.otherwise('/');
    $httpProvider.defaults.useXDomain = true;
  });
