To view web app:
----------------

in one terminal:
    mongod
in another terminal:
    ‘cd’ into this folder
    nodemon webServer.js
in browser:
    go to http://localhost:3000/

*************************************************************************
to reset database (need mongod running):
    ‘cd’ into this folder
    node loadDatabase.js
*************************************************************************
to change player names:
    open modelData/userData.js in text editor
    replace old names with new ones
    	- make sure no comma after last name in list
*************************************************************************