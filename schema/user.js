"use strict";
/*
 *  Defined the Mongoose Schema and return a Model for a User
 */
/* jshint node: true */

var mongoose = require('mongoose');

// create a schema
var userSchema = new mongoose.Schema({
    id: String,             // Unique ID identifying this user
    first_name: String,     // First name of the user.
    last_name: String,      // Last name of the user.
    wins: Number,
    losses: Number,
    total_wins: Number,
    total_losses: Number,
    total_ties: Number,
    total_points: Number,
    tier1: Number,
    tier2: Number,
    tier3: Number,
    tier4: Number,
    QB: Number,
    RB: Number,
    WR: Number,
    TE: Number,
    week1: Number,
    week2: Number,
    week3: Number,
    week4: Number,
    week5: Number,
    week6: Number,
    week7: Number,
    week8: Number,
    week9: Number,
    week10: Number,
    week11: Number,
    week12: Number,
    week13: Number,
    week14: Number,
    week15: Number,
    week16: Number,
    week17: Number,
    checked: Boolean
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;
