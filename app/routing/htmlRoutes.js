// Dependencies
// =============================================================
var path = require( "path" );

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function( app ) {

// This file includes the 2 routes
//    /survey    This route will display the survey page - survey.html
//    /          The default/catch-all route that displays the home page - home.html
//    

    // Route that sends the user first to the survey.html Page
    app.get( "/survey", function( req, res ) {
        console.log( "Sending to survey page.." );
        res.sendFile( path.join( __dirname, "../public/survey.html" ));
    });

    // Basic route that sends the user first to the home.html Page
    app.get( "*", function( req, res ) {
        console.log( "For some reason, sending to home page: " + req );
        res.sendFile( path.join( __dirname, "../public/home.html" ));
    });
};