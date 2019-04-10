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
    return res.json(friends.friends);
  });

  // Post incoming survey results to the server - handle compatibility logic and output information
  // for the closest match..
  app.post( "/api/friends", function( req, res ) {
      var newFriend = req.body;

      // First go through the current array of friends to find the closest match!!
      var nClosestMatch = -1;
      var nLowestDifSoFar;
      // nIndex is the index that index's each friend entry..
      for ( let nIndex = 0; nIndex < friends.friends.length; nIndex++ ) {
          // Not pretty, but just go through each question, (nQIndex) and total the differences..
          var nDif = 0;
          // nQIndex is the question index as we compare the answer to each question for the incoming friend,
          // newFriend, and the array of existing friends - nIndex..
          for ( let nQIndex = 0; nQIndex < newFriend.testScores.length; nQIndex++ ) {
              nDif += Math.abs( newFriend.testScores[ nQIndex ] - friends.friends[ nIndex ].testScores[ nQIndex ] );
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
          // Special case!!  First entry!!  For the moment just alerting..  This can't happen
          // as we are initializing the app with folks..  So. I'm jus tgonna return themself.
          console.log( "You are matchless!!  Seriously.. You are the first!!  Congratulations!!" )
          res.json( newFriend );
      } else {
          // Output modal popup of closest match with name and picture..  For the moment, just name..
          console.log( "Your match is, " + friends.friends[ nClosestMatch ].name );
          res.json( friends.friends[ nClosestMatch ] );
      }

      // Now, add newFriend to the array of friends.
      friends.friends.push( newFriend );
  });
}

  