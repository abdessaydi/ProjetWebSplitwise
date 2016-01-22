module.exports = function(app, userModel, jwt) { 
   app.post('/api/user', addUser)
   app.post('/api/authenticate', authenticate)
    /*app.put('/api/user', editUser)
	app.delete('/api/user', deleteUser)
    app.post('/api/forgot', sendmail)
    app.post('/api/passchange/:token', change)*/


	    function addUser(req, res, next) {
        'use strict';
        console.log(req.body.username)
        userModel.findOne({
            username: req.body.username
        }, function(err, userExist) {
            if (err) {
                res.json({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                if (userExist) {
                    res.json({
                        type: false,
                        data: "User already exists!"
                    });
                } else {
                    var User = {
                        username: req.body.username,
                        lastName: req.body.lastName,
                        firstName: req.body.firstName,
                        email: req.body.email,
                        password: req.body.password
                    }

                    var nouveauUser = new userModel(User);
                    nouveauUser.save(function(err, user) {
                        var tokenInfo = {
                            id: user._id,
                            username: user.username,
                            lastName: user.lastName,
                            firstName: user.firstName,
                            email: user.email
                        }

                        //user.token = jwt.sign(tokenInfo, tool.secretKey);

                        user.save(function(err, user1) {
                            res.json({
                                type: true,
                                data: user1,
                                token: user1.token
                            });
                        });
                    })
                }

            }
        });
    }

	
	function authenticate(req, res, next) {
		console.log(req.body);

		userModel.findOne({username: req.body.username, password: req.body.password}, function(err, user) {
	        if (err) {
	            res.json({
	                type: false,
	                data: "Error occured: " + err
	            });
	        } else {
	            if (user) {
                    console.log(user);
	               res.json({
	                    type: true,
	                    data: user,
	                    token: user.token
	                }); 
	            } else {
	                res.json({
	                    type: false,
	                    data: "Incorrect username/password"
	                });    
	            }

	        }

	    });
	}


}