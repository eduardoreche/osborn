(function() {

'use strict';

  angular
    .module('osborn.team')
    .controller('TeamController', teamController);

  teamController.inject = ['$scope', '$state', '$stateParams', 'TeamService'];
  
  function teamController($scope, $state, $stateParams, TeamService) {
    const vm = this;
    vm.teams = [];
    vm.teamsToAdd = [];
    vm.team = $stateParams.id ? TeamService.get({id: $stateParams.id}) : new TeamService();
    vm.addTeam = addTeam;
    vm.addNewTeam = addNewTeam;
    vm.removeTeam = removeTeam;
    vm.save = save;
    vm.delete = remove;
    vm.edit = edit;

    _loadTeams();

    function save() {
      if (vm.team._id) {
        _update();
      } else {
        _add();
      }

      _loadTeams();
      $state.go('teams.list');
    }

    function edit(id) {
      $state.go('teams.edit', {id});
    }

    function remove(team) {
      vm.teams.splice(vm.teams(team), 1);
      team.$delete({id: team._id});
    }

    const _add = function() {
      return vm.team.$save();
    };

    const _update = function() {
      vm.team.$update({id: vm.team._id});
    };

    function _loadTeams() {
      vm.teams = TeamService.query();
    }

    function addTeam(teamToAdd) {
      const index = vm.teamsToAdd.indexOf(teamToAdd);

      vm.teamsToAdd.splice(index, 1);

      if (!vm.teams) {
        vm.teams = [];
      }

      vm.teams.push(angular.copy(teamToAdd));
    }

    function addNewTeam() {
      vm.teamsToAdd.push({
        name: '',
        color: ''
      });
    }

    function removeTeam(teamToRemove) {
      const index = vm.teams.indexOf(teamToRemove);
      vm.teams.splice(index + 1);
    }
  }
})();