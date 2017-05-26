export class RiskService {
  constructor($resource, SERVER_DATA) {
    'ngInject';
    return $resource(`http://${SERVER_DATA.ip}:${SERVER_DATA.port}/api/v1/risks/:id`, {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }

  static activate($resource, SERVER_DATA) {
    RiskService.instance = new RiskService($resource, SERVER_DATA);
    return RiskService.instance;
  }
}