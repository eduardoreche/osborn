'use strict'

angular
  .module('osborn', [
    'ngResource',
    'ui.router', 
    'ngConfirm',
    'ui.select',
    'ngSanitize',
    'angular-jwt',
    'chart.js',

    'osborn.home',
    'osborn.project',
    'osborn.resource',
    'osborn.allocation',
    'osborn.user',
    'ngGoogleCharts',
    'osborn.team'
  ])
  .value('_', window._)
  .config(function($urlRouterProvider, $httpProvider, jwtOptionsProvider, jwtInterceptorProvider, ChartJsProvider){

    $urlRouterProvider.otherwise('/');
    
    $httpProvider.defaults.useXDomain = true;

    ChartJsProvider.setOptions({ colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });

  });