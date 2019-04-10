// Dependencies
// =============================================================
var express = require( "express" );
var path = require( "path" );

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use( express.urlencoded({ extended: true }));
app.use( express.json());

// The friends array holds the "database" of friend objects. These objects will be searched to find
// compatibility when reuests are being made to match folks up with likely friends.  Each "friend"
// object will be structured with their name, a link to an image of the person, and an array of test
// scores for the compatibility quiz each member responds to.

// Constructor function for creating Friend objects
var Friend = function( name, imageLink, testScores ) {
    this.name = name;
    this.photo = imageLink;
    this.testScores = testScores;
};

var friends = [
    {
        "name" : "Charles Barkley",
        "photo" : "https://media.giphy.com/media/1k2YhdutgkQzJWnsyp/giphy.gif",
        "testScores" : [ 2,2,1,3,0,0,4,3,2,4 ]
    },
    {
        "name" : "Danny Glover",
        "photo" : "https://media.giphy.com/media/29HRejgahYenVsohB5/giphy.gif",
        "testScores" : [ 4,4,1,3,3,4,4,3,4,4 ]
    },
    {
        "name" : "Rachel Maddow",
        "photo" : "https://media.giphy.com/media/5PhpVhn4SUXyMLRbsQ/giphy.gif",
        "testScores" : [ 0,0,4,4,0,4,4,2,4,4 ]
    }
];

// Exporting our Friend constructor. We will require it in server.js
module.exports = {
    Friend: Friend,
    friends: friends
}
  