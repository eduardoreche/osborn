export class RiskService {
  constructor($resource, SERVER_DATA) {
    'ngInject';
    this.$resource = $resource(`http://${SERVER_DATA.ip}:${SERVER_DATA.port}/api/v1/risks/:id`, {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
    return this.$resource;
  }
  getRisks() {
    return this.$resource.query();
  }
}