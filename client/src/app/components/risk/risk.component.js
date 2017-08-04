import {RiskController} from './risk.controller';

export const RiskComponent = {
  bindings: {
    risks: '<',
    type: '<'
  },
  templateUrl: './app/components/risk/risk.template.html',
  controller: RiskController
};
