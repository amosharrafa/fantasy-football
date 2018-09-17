"use strict";

(function() {
   // Create init users.

   var names = [
      "Adam Mosharrafa",
      "Allens Ainscoughs",
      "Bobby Edwards",
      "Charlie Furrer",
      "Collin Liberty",
      "Eric Verso",
      "Justin Kahl",
      "Nick Kirchhof",
      "Rhys De Sota",
      "Sam Werner",
      "Slater Meehan",
      "Tomas Hilliard"
   ];

   var users = [];

   for(var i = 1; i <= names.length; i++) {
      var name = names[i-1].split(" ");
      var first = name[0];
      var last = name.slice(1).join(" ");
      var player = {
        id: i, first_name: first, last_name: last, checked: false, wins: 0, losses: 0, week1: 0, week2: 0, week3: 0, week4: 0, week5: 0,
        week6: 0, week7: 0, week8: 0, week9: 0, week10: 0, week11: 0, week12: 0, week13: 0, week14: 0, week15: 0, week16: 0, week17: 0, 
        total_wins: 0, total_losses: 0, total_ties: 0, total_points: 0, tier1: 0, tier2: 0, tier3: 0, tier4: 0, QB: 0, RB: 0, WR: 0, TE: 0
      };
      users.push(player);
   };

   var userListModel = function() {
      return users;
   };

   var userModel = function(userId) {
      for (var i = 0; i < users.length; i++) {
         if (users[i].id === userId) {
            return users[i];
         }
      }
      return null;
   };

   var cs142models =  {
      userListModel: userListModel,
      userModel: userModel
   };

   if( typeof exports !== 'undefined' ) {
      // We're being loaded by the Node.js module loader ('require') so we use its
      // conventions of returning the object in exports.
      exports.cs142models = cs142models;
   } else {
      // We're not in the Note.js module loader so we assume we're being loaded
      // by the browser into the DOM.
      window.cs142models = cs142models;
   }
})();