import {RiskComponent} from './risk.component';
import {RiskService} from './risk.service';
import {RiskController} from './risk.controller';

export const RiskModule = angular
  .module('osborn.risk', [])
  .component('risk', RiskComponent)
  .service('RiskService', RiskService)
  .constant('TYPE_MAPPER', {
    list: 'risk-list.template.html',
    form: 'risk-form.template.html'
  })
  .controller('RiskController', RiskController)
  .config($stateProvider => {
    'ngInject';
    $stateProvider
      .state('risks', {
        abstract: true,
        url: '/risks',
        views: {
          '@': {
            template: '<ui-view/>'
          }
        }
      })
      .state('risks.list', {
        url: '/list',
        component: 'risk',
        resolve: {
          type: () => {
            return 'list';
          },
          risks: RiskService => RiskService.getRisks()
        }
      })
      .state('risks.new', {
        url: '/new',
        component: 'risk',
        resolve: {
          type: () => {
            return 'form';
          }
        }
      });
  })
  .name;
