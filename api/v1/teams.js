var express = require('express');
var router = express.Router();
var Team = require('../../models/team.js');

router.get('/', (req, res) => {
    Team.find((err, teams) => {
        if (err) {
            res.send(err);
        }

        res.json(teams);
    });
    /*res.json([
        {name: 'Portal', color: '#3bade3'},
        {name: 'PEGA', color: '#178587'},
        {name: 'Sustentação', color: '#c5e1f0'},
        {name: 'BARE', color: '#e20c24'},
        {name: 'Pool Java', color: '#fee555'}
        ]);*/
});

router.get('/:id', function(req, res, next) {
    Team.findById(req.params.id, function(err, team) {
        if (err) res.send(err);

        res.json(team);
    });
});

router.post('/', (req, res, next) => {
    team = new Team({
        name:   req.body.name,
        color:  req.body.color
    });

    team.save((err, date) => {
        if (err) 
            res.send(err);

        res.json({message: 'Team saved successfully!'});
    });
});

router.put('/:id', (req, res, next) => {
    Team.findById(req.params.id, (err, team) => {
        if (err)
            res.send(err);
        
        team.name = req.body.name || team.name;
        team.color = req.body.color || team.color;

        team.save((err) => {
            if (err)
                res.send(err);
            
            res.json({message: 'Team updated successfully!'});
        })
    });
});

router.delete('/:id', (req, res, next) => {
    Team.findById(req.params.id, (err, team) => {
        if (err)
            res.send(err);
        
        team.remove((err, data) => {
            if (err)
                res.send(err);
            
            res.json({message: 'Team removed successfully!'});
        });
    });
});

module.exports = router;