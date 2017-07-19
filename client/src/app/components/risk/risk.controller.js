export class RiskController {
  constructor(
      TYPE_MAPPER,
      SERVER_DATA,
      $stateParams,
      $state,
      $resource,
      RiskService,
      ImpactService,
      ProbabilityService,
      ProjectService
    ) {
    'ngInject';
    this.TYPE_MAPPER = TYPE_MAPPER;
    this.stateParams = $stateParams;
    this.state = $state;
    this.riskService = RiskService;
    this.impactService = ImpactService;
    this.probabilityService = ProbabilityService;
    this.projectService = ProjectService;
    this.risk = this.stateParams.id ? this.riskService.get({id: this.stateParams.id}) : new RiskService($resource, SERVER_DATA);
    this.risks = [];
    this.impactList = [];
    this.probabilityList = [];
    this.projects = [];
  }
  $onInit() {
    this.impactList = this.impactService.query();
    this.probabilityList = this.probabilityService.query();
    this.projects = this.projectService.query();
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
  loadRisks() {
    this.risks = this.riskService.query();
    this.state.go('risks.list');
  }
  save() {
    if (this.risk._id) {
      this.update();
    } else {
      this.add();
    }
    this.loadRisks();
  }
  remove(risk) {
    this.risks.splice(this.risks.indexOf(risk), 1);
    this.risk.$delete({id: risk._id});
  }
  edit(id) {
    this.state.go('risks.edit', {id});
  }
}
