module.exports = function(app, userModel) { 
   app.get('/api/friends/:firstName', getFriends)
   app.put('/api/friend/:firstName', addFriend)
   ///app.delete('/api/group', deleteFriend)

    


    function getFriends(req, resp, next){
		var firstName = req.params.firstName;

	if (firstName == null) {
		return resp.sendStatus(400);
	}

	var query = userModel.find({firstName: firstName}, { friends: 1, _id:0 });
	query.exec(function(err, friends) {
		if (err) {
			console.log(err);
			return resp.sendStatus(400);
		}

		return resp.send(200, friends);
	});
  }


  function addFriend(req, resp, next){
		var firstName = req.params.firstName;
		friend = {firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.emailName};
		//friend = {firstName: "up", lastName: "down", email: "updown@gmail.com"};

	if (firstName == null) {
		return resp.sendStatus(400);
	}

	var query = userModel.findOneAndUpdate({firstName: firstName}, {$push: {friends: friend}});
	query.exec(function(err, friend) {
		if (err) {
			console.log(err);
			return resp.sendStatus(400);
		}

		return resp.send(200);
	});
  }


/*
    function deleteFriend(req, res, next) {
         'use strict';
         var friendId = req.params.id;

         friendModel.remove({_id: groupId},function (err, results) {
             if (err) return next(err);
             res.sendStatus(204);
         })
     }*/
}