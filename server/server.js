var application_root = __dirname,
    express = require('express'),
    path = require('path'),
	bodyParser  = require('body-parser'),
	jwt  = require('jsonwebtoken'),
	mongoose = require('mongoose');



var database = require('./database')
var apiUser = require('./api-user')
var apiGroup = require('./api-group')
var apiFriend = require('./api-friend')
var apiBill = require('./api-bill')
var app = express() ;

app.use(bodyParser.json());	
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static(path.join(application_root ,'../client'), { maxAge: oneDay }));
app.use(express.static(path.join(application_root ,'../client')));

var db = database.getDB()
var userModel = database.getUserModel()
var contactModel = database.getContactModel()
var billModel = database.getBillModel()


/*app.get('/contactlist' ,function(res, res){
	console.log('I received a GET request');

	contatModel.find(function(req, contacts){
		console.log(contacts);
		res.send(contacts);
	});
})*/

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function (callback) {
	//Start server
	var port = 8755;
	app.listen(port, function () {
		'use strict';
		console.log('Express server listening on port %d in %s mode', port, app.settings.env);
		console.log('application_root is %s',path.join(application_root ,'./client'));
	});
})


apiUser(app, userModel, contactModel, jwt)
apiGroup(app, userModel)
apiBill(app, userModel, billModel)
apiFriend(app, userModel)

