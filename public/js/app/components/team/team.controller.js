(function() {

'use strict';

  angular
    .module('osborn.team')
    .controller('teamController', teamController);

  teamController.inject = ['$scope', '$state', '$stateParams', 'teamService'];
  
  function teamController($scope, $state, $stateParams, teamService) {
    
    var vm = angular.extend(this, {
      teams: [],
      teamsToAdd: [],
      
      team: $stateParams.id ? teamService.get({id: $stateParams.id}) : new teamService(),

      addTeam: addTeam,
      addNewTeam: addNewTeam,
      removeTeam: removeTeam,

      save: save,
      delete: remove,
      edit: edit
    });
    

    _loadTeams();

    function save() {
      if (vm.team._id != null)
        _update();
      else 
        _add();
      
      _loadTeams();
      $state.go('teams.list');
    }

    function edit(id) {
      $state.go('teams.edit', {id: id});
    }

    function remove(team) {
      team.$delete({id: team._id});
      _loadTeams();
    }

    var _add = function() {
      return vm.team.$save();
    }

    var _update = function() {
      vm.team.$update({id: vm.team._id});
    }

    function _loadTeams() {
      vm.teams = teamService.query();
    }

    function addTeam(teamToAdd) {
      var index = vm.teamsToAdd.indexOf(teamToAdd);

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
      var index = vm.teams.indexOf(teamToRemove);
      vm.teams.splice(index + 1);
    }
  }
})();