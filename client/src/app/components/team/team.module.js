(function () {
  'use strict';

  angular
    .module('osborn.team', [])
    .config($stateProvider => {
      $stateProvider
        .state('teams', {
          abstract: true,
          url: '/teams',
          views: {
            '@': {
              template: '<ui-view/>'
            }
          }
        })
        .state('teams.list', {
          url: '/list',
          templateUrl: 'js/app/components/team/teams.template.html',
          controller: 'TeamController as tm'
        })
        .state('teams.new', {
          url: '/new',
          templateUrl: 'js/app/components/team/teams-form.template.html',
          controller: 'TeamController as tm'
        })
        .state('teams.edit', {
          url: '/edit/:id',
          templateUrl: 'js/app/components/team/teams-form.template.html',
          controller: 'TeamController as tm'
        });
    });
})();
