// ===============================================================================
// LOAD DATA
// We are linking our routes to the "data" source.
// This data source holds the array of current entries in our "friend" database
// ===============================================================================

// ===============================================================================
// We need to link our routes to our data source.  In this case, our source is
// the friends array from friends.js.
// ===============================================================================

var friends = require( "../data/friends" );

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function( app ) {

  // API GET Requests
  // Below code handles when users "visit" a page.

  // Displays all possible friends from the database - just return the reidns array
  // as a JSON object.
  app.get( "/api/friends", function( req, res ) {
    console.log( "Returning json for possible friends.." );
    return res.json( friends );
  });

  // Post incoming survey results to the server - handle compatibility logic and return the JSON
  // object for the closest match..
  app.post( "/api/friends", function( req, res ) {
    console.log( "Posting incoming survey results.." );
  });
}

  