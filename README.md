# To view web app:
- after cloning run `npm install`
- in one terminal run `mongod`
- **NOTE:** Make sure you have Mongod and NPM installed before continuing.
- in another terminal `cd` into this folder and run `nodemon webServer.js`
- in browser: go to http://localhost:3000/

## To reset database (need mongod running):
- `cd` into this folder
- run `node loadDatabase.js`

## To change player names:
- open modelData/userData.js in text editor
- replace old names with new ones
  - make sure no comma after last name in list
