module.exports = function(app, userModel) { 
   app.get('/api/groups/:firstName', getGroups)
   app.put('/api/group/:firstName', createGroup)
   //app.delete('/api/group', deleteGroup)
   //app.put('/api/group/:user', addUserToGroup)
	
    


    function getGroups(req, resp, next){
		var firstName = req.params.firstName;

	if (firstName == null) {
		return resp.sendStatus(400);
	}

	var query = userModel.find({firstName: firstName}, { groups: 1, _id:0 });
	//query.sort('-date');
	query.exec(function(err, groups) {
		if (err) {
			console.log(err);
			return resp.sendStatus(400);
		}

		return resp.send(200, groups);
	});
  }

   function createGroup(req, resp, next){
		var firstName = req.params.firstName;
		//members = [{firstName: "toto", lastName: "tata", email: "tototata@gmail.com"}, {firstName: "tom", lastName: "jerry", email: "tomjerry@gmail.com"}];
		var groups = {name : req.body.name, members: req.body.members};
		

	if (firstName == null) {
		return resp.sendStatus(400);
	}

	var query = userModel.findOneAndUpdate({firstName: firstName}, {$push: {groups: groups}});
	query.exec(function(err, groups) {
		if (err) {
			console.log(err);
			return resp.sendStatus(400);
		}

		return resp.send(200);
	});
  }


	/*function addUserToGroup(req, res, next) {
            var user = req.body
            var userId = user._id
            delete user._id
            groupModel.findByIdAndUpdate(userId, {$set: user}, function (err, qcm) {
                if (err) return next(err);
                res.send(qcm);
            });
    }*/


   /* function deleteGroup(req, res, next) {
         'use strict';
         var groupId = req.params.id;
         groupModel.remove({_id: groupId},function (err, results) {
             if (err) return next(err);
             res.sendStatus(204);
         })
     }*/
	}