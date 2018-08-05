"use strict";

/*
 * This Node.js program loads the CS142 Project #5 model data into Mongoose defined objects
 * in a MongoDB database. It can be run with the command:
 *     node loadDatabase.js
 * be sure to have an instance of the MongoDB running on the localhost.
 *
 */

// Get the magic models we used in the previous projects.
var cs142models = require('./modelData/userData.js').cs142models;

// We use the Mongoose to define the schema stored in MongoDB.
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cs142project6');

// Load the Mongoose schema for User and Photo
var User = require('./schema/user.js');
var SchemaInfo = require('./schema/schemaInfo.js');

var versionString = '1.0';

// We start by removing anything that existing in the collections.
var removePromises = [User.remove({}), SchemaInfo.remove({})];

Promise.all(removePromises).then(function () {

    // Load the users into the User. Mongo assigns ids to objects so we record
    // the assigned '_id' back into the cs142model.userListModels so we have it
    // later in the script.

    var userModels = cs142models.userListModel();
    var userIDs = []; // Collect the fake IDs of the user we load
    var userPromises = userModels.map(function (user) {
        userIDs.push(user.id);
        return User.create({
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
        }, function (err, userObj) {
            if (err) {
                console.error('Error create user', err);
            } else {
                // Set the unique ID of the object. We use the MongoDB generated _id for now
                // but we keep it distinct from the MongoDB ID so we can go to something
                // prettier in the future since these show up in URLs, etc.
                userObj.id = userObj._id;
                userObj.save();

                user.objectID = userObj._id;
                console.log('Adding user:', user.first_name + ' ' + user.last_name, ' with ID ',
                    user.objectID);
            }
        });
    });

    var allPromises = Promise.all(userPromises).then(function () {
        return Promise.all(userPromises).then(function () {
            // Create the SchemaInfo object
            return SchemaInfo.create({
                version: versionString
            }, function (err, schemaInfo) {
                if (err) {
                    console.error('Error create schemaInfo', err);
                } else {
                    console.log('Done creating users');
                }
            });
        });
    });

    allPromises.then(function () {
        mongoose.disconnect();
    });
});
