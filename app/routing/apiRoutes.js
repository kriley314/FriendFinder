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

  // Displays all possible friends from the database - just return the friends array
  // as a JSON object.
  app.get( "/api/friends", function( req, res ) {
    console.log( "Returning json for possible friends.." );
    return res.json(friends.friends);
  });

  // Post incoming survey results to the server - handle compatibility logic and output information
  // for the closest match..
  app.post( "/api/friends", function( req, res ) {
      console.log( "Processing incoming survey results.." );
      console.log( "request.body: " + req.body + ":" + req.body.length );
      var newFriend = req.data;
      console.log( "New Friend: " + newFriend );

      // First go through the current array of friends to find the closest match!!
      var nClosestMatch = -1;
      var nLowestDifSoFar;
      for ( let nIndex = 0; nIndex < friends.friends.length; nIndex++ ) {
          // Not pretty, but just go through each question and total the differences..
          var nDif = 0;
          for ( let nQIndex = 0; nQIndex < newFriend.testScores.length; nQIndex++ ) {
              nDif += Math.abs( newFriend.testScores[ nQindex ] - friends.friends[ nIndex ].testScores[ nQindex ] );
          }

          // Is this our first?
          if ( nClosestMatch === -1 ) {
              nLowestDifSoFar = nDif;
              nClosestMatch = nIndex;
          } else {
              // Not the first so really see if lower..
              if ( nDif < nLowestDifSoFar ) {
                  // New match!!
                  nClosestMatch = nIndex;
              }
          }
      }

      // Output results..  Of course, we are on the server here!!  We need to pass this info back to the client
      // so they can display the modal pop-up with the most compatible friend's name and image.
      if ( nClosestMatch === -1 ) {
          // Special case!!  First entry!!  For the moment just alerting..
          console.log( "You are matchless!!  Seriously.. You are the first!!  Congratulations!!" )
      } else {
          // Output modal popup of closest match with name and picture..  For the moment, just name..
          console.log( "Your match is, " + friends.friends[ nClosestMatch ].name );
      }

      // Now, add newFriend to the array of friends.
      friends.friends.push( newFriend );
  });
}

  