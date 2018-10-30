"use strict";

var mongoose = require('mongoose');
var async = require('async');

// Load the Mongoose schema for User, Photo, and SchemaInfo
var User = require('./schema/user.js');
var SchemaInfo = require('./schema/schemaInfo.js');

var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var processFormBody = multer({storage: multer.memoryStorage()}).single('uploadedphoto');
var fs = require("fs");

var express = require('express');
var app = express();

// For fetching league data from ESPN
const espnFF = require('espn-ff-api-2');
const leagueID = '737460';
const season = '2018';
const cookies = {
  espnS2 : 'AECn1p0rs2OHi13qlW4K5DckFLyj1PnYLtQOzl0VuCqh1TZ1W6v',
  SWID   : '5B21F2D0-0482-4CE1-A2D9-E84933C8ADAA'
};

mongoose.connect('mongodb://localhost/cs142project6');

// We have the express static module (http://expressjs.com/en/starter/static-files.html) do all the work for us.
app.use(express.static(__dirname));

app.use(session({secret: 'secretKey', resave: false, saveUninitialized: false}));
app.use(bodyParser.json());

app.get('/', function (request, response) {
    response.send('Simple web server of files from ' + __dirname);
});

app.get('/scoreboard/:week', function (request, response) {
    var espnURL = 'http://games.espn.com/ffl/api/v2/scoreboard?leagueId=' + leagueID + '&matchupPeriodId=' + request.params.week + '&seasonId=' + season;
    curl.get(espnURL).then(({statusCode, body, headers}) => {
        response.status(statusCode).send(body.scoreboard);
    }).catch((e) => {
        response.status(400).send(e);
    });
});

/*
 * URL /user/list - Return all the User object.
 */
app.get('/user/list', function (request, response) {
    User.find({}, function(err, users) {
        if(err) {
            response.status(400).send("Error.");
            return;
        }
        var userNames = [];
        var index = 0;
        users.forEach(function(user) {
            var userSchema = {
                id: user._id,
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                wins: user.wins,
                losses: user.losses,
                total_wins: user.total_wins,
                total_losses: user.total_losses,
                total_ties: user.total_ties,
                total_points: user.total_points,
                tier1: user.tier1,
                tier2: user.tier2,
                tier3: user.tier3,
                tier4: user.tier4,
                QB: user.QB,
                RB: user.RB,
                WR: user.WR,
                TE: user.TE,
                week1: user.week1,
                week2: user.week2,
                week3: user.week3,
                week4: user.week4,
                week5: user.week5,
                week6: user.week6,
                week7: user.week7,
                week8: user.week8,
                week9: user.week9,
                week10: user.week10,
                week11: user.week11,
                week12: user.week12,
                week13: user.week13,
                week14: user.week14,
                week15: user.week15,
                week16: user.week16,
                week17: user.week17,
                checked: user.checked
            };
            userNames[index] = userSchema;
            index++;
        });
        response.status(200).send(userNames);
    });
});

/*
 * URL /user/:id - Return the information for User (id)
 */
app.get('/user/:id', function (request, response) {
    var userDetails;
    User.findOne({id: request.params.id}, function (err, user) {
        if(!user) {
            response.status(400).send("Error.");
            return;
        }
        response.status(200).send(user);
    });
});

app.post('/increment/:id/:key/:amount', function (request, response) {
    User.findOne({id: request.params.id}, function (err, user) {
        if(!user) {
            response.status(400).send("Error.");
            return;
        }
        var amount = parseInt(request.params.amount);
        var index = request.params.key;
        if(amount > 0 || user[index] > 0) user[index] += amount;
        if(index == 'tier4') {
            if(user[index] > 12) user[index] = 12;
            else if(user[index] == 1) user[index] = 7;
            else if(user[index] == 6) user[index] = 0;
        }
        user.save();
        response.status(200).send(user);
    });
});

app.post('/update/:id/:key/:amount', function (request, response) {
    User.findOne({id: request.params.id}, function (err, user) {
        if(!user) {
            response.status(400).send("Error.");
            return;
        }
        var newValue = parseInt(request.params.amount);
        var index = request.params.key;
        user[index] = newValue;
        user.save();
        response.status(200).send(user);
    });
});

app.post('/tier2', function (request, response) {
    User.find({}, function(err, players) {
        if(err) {
            response.status(400).send("Error.");
            return;
        }
        players.forEach(function(player) {
            var sum = 0;
            for (var i = 1; i <= 17; i++) {
                var index = 'week' + String(i);
                sum += player[index];
            }
            player.total_points = sum;
            player.save();
        });

        response.status(200).send();
    });
});

app.post('/tier1', function (request, response) {
    User.find({}, function(err, players) {
        if(err) {
            response.status(400).send("Error.");
            return;
        }
        players.forEach(function(p1) {
            p1.total_wins = 0;
            p1.total_losses = 0;
            p1.total_ties = 0;
            for(var i = 1; i <= 17; i++) {
                var index = 'week' + String(i);
                players.forEach(function(p2) {
                    if(p1.id != p2.id) {
                        if(p1[index] > p2[index]) (p1.total_wins)++;
                        else if(p1[index] < p2[index]) (p1.total_losses)++;
                        else if(p1[index] == p2[index] && p1[index] != 0) (p1.total_ties)++;
                    }
                });
            }   
            p1.save();
        });

        response.status(200).send();
    });
});

app.post('/calculate/:category', function (request, response) {
    User.find({}, function(err, players) {
        if(err) {
            response.status(400).send("Error.");
            return;
        }
        
        var points = players.length;
        var index = request.params.category;
        while(true) {
            var done = true;
            for(var i = 0; i < players.length; i++) {
                if(!players[i].checked) done = false;
            }
            if(done) break;

            var max = -1.0;
            var maxTies = -1.0;
            var maxPlayers = [];
            players.forEach(function(player) {
                if(!player.checked) {
                    var curr = player[index];
                    if(curr > max) {
                        max = curr;
                        maxTies = player.total_ties;
                        maxPlayers = [];
                        maxPlayers.push(player);
                    } else if(curr == max) {
                        if(index != "total_wins") maxPlayers.push(player);
                        else {
                            if(player.total_ties >= maxTies) {
                                if(player.total_ties > maxTies) {
                                    maxPlayers = [];
                                    maxTies = player.total_ties;
                                }
                                maxPlayers.push(player);  
                            }
                        }
                    }
                }
            });
            var tierPoints = (points + points - maxPlayers.length + 1) / 2;
            for(var i = 0; i < maxPlayers.length; i++) {
                var player = maxPlayers[i];
                player.checked = true;
                if(index == "total_wins") player.tier1 = tierPoints;
                else if(index == "total_points") player.tier2 = tierPoints;
                else if(index == "wins") player.tier3 = tierPoints;
            }
            points -= maxPlayers.length;
        }
        for(var i = 0; i < players.length; i++) players[i].checked = false;

        players.forEach(function(player) { player.save(); });
        response.status(200).send();
    });
});

app.get('/sort', function (request, response) {
    User.find({}, function(err, users) {
        if(err) {
            response.status(400).send("Error.");
            return;
        }
        var sorted = users.sort(function(a, b){
            var aTotal = a.tier1 + a.tier2 + a.tier3 + a.tier4;
            var bTotal = b.tier1 + b.tier2 + b.tier3 + b.tier4;
            if(aTotal == bTotal) return b.tier4 - a.tier4;
            else return (bTotal - aTotal);
        });
        response.status(200).send(sorted);
    });
});

var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});