# FriendFinder

Welcome to my FriendFinder application.  This application uses a "database" maintained by the server
to allow users to join the FriendFinder "team" and find a "best" friend who's answers to a set of
questions most closely match your own selections.

This application does not persist a database of user info but rather uses a data set that is 
initialized each time the server itself is restarted.  The next version of this product will
persist this database so that each time the server is restarted it will begin from the state
it was when it was shut down.

Users enter the application and can see a list of all current "members" along with their answer
dataset, they can select a link to go to the GitHub repository thsi application is sourced from,
or they can select to take the survey and see the person in the database who's answers most closely
match their own.

Another future enhancement will be to allow flexibility to load the question set from a resource
to allow easier updates to the set.

Thanks and enjoy!!
Ken