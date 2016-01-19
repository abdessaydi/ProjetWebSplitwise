module.exports = {
	getDB : function () {
		return db;
	},

	getUserModel : function(){
		return userModel;
	},

	getContactModel : function(){
		return contactModel;
	},

	getBillModel : function(){
		return billModel;
	},
}

var mongoose = require('mongoose')

var local_url = 'mongodb://localhost/splitwise'
var url_db = local_url

if(process.env.MONGO_URL !== undefined) {
    url_db = process.env.MONGO_URL
} else if(process.env.SCALINGO_MONGO_URL !== undefined) {
    url_db = process.env.SCALINGO_MONGO_URL
}

mongoose.connect(url_db, { server: { poolSize: 1 }});


var db = mongoose.connection;

//Schemas
var Schema = mongoose.Schema;

var contactSchema = new Schema({
 	name: String,
  	email: String,
  	number: String
  },
  {collection : 'splitwise' }
)

var GroupSchema = new Schema({
    name: String,
    members: [{
    	firstName: String,
		lastName: String,
    	email: String
    }]
})

var ParticipantsSchema = new Schema({
	firstName: String,
	lastName: String
})

var FriendSchema = new Schema({
    firstName: String,
	lastName: String,
    email: String
})

var PayedBySchema = new Schema({
    firstName: String,
	lastName: String,
    amount: Number
})

var IOUSchema = new Schema({
    owed: String,
    owee: String,
    amount: Number
})

var UserSchema  = new Schema({
	clientID: Number,
	userName: String,
	lastName: String,
	firstName: String,
	email: String,
	password: String,
	token: String,
	friends: {type: [FriendSchema]},
	groups: {type: [GroupSchema]},
	total_Money_I_Owe: Number,
	total_Money_I_M_Owed: Number
},
	{collection : 'users' }
)

var BillSchema  = new Schema({
	billName: String,
	billDescription: String,
	billAmount: Number,
	billGroup: String,
	created : Date,
	modified : Date,
	billParticipants: {type: [ParticipantsSchema]},
	payedBy: {type: [PayedBySchema]},
	IOUs: {type: [IOUSchema]}
	},
	{collection : 'bills' }
);


var contactModel = mongoose.model('contactModel', contactSchema);
var userModel = mongoose.model('user', UserSchema);
var billModel = mongoose.model('billModel', BillSchema);


//var contact1 =  new contactModel({ name: "contact1", email: "xxx@yahoo.com", number: "10"});
//contact1.save();
//new Date()
 



