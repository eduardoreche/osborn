export class RiskController {
  constructor(TYPE_MAPPER) {
    'ngInject';
    this.TYPE_MAPPER = TYPE_MAPPER;
  }
  $onInit($stateParams, RiskService) {
    this.risk = $stateParams.id ? RiskService.get({id: $stateParams}) : new RiskService();
  }
  $onChanges(changes) {
    if (changes.type && this.type) {
      this.templateUrl = './app/components/risk/' + this.TYPE_MAPPER[this.type];
    }
  }
  update() {
    this.risk.$update({id: this.risk._id});
  }
  add() {
    return this.risk.$save();
  }
  save() {
    if (this.risk._id) {
      update();
    } else {
      add();
    }
    loadRisks();
  }
}
