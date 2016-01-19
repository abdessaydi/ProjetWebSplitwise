module.exports = function(app, userModel, billModel) { 
   app.get('/api/bills/:firstName', getBills)
   app.post('/api/bill', createBill)
   app.get('/api/bills/IOUs/:firstName', getIOUs)
   app.get('/api/bills/IAMOweds/:firstName', getIAMOweds)
   app.get('/api/bill/payedBy/:billName', getPayedBy)
   app.get('/api/bill/participants/:billName', getParticipants)
   app.get('/api/bill/totalAmountIAMOwed/:firstName', getTotalAmountIAMOwed)
   app.get('/api/bill/totalAmountIO/:firstName', getTotalAmountIO)
   app.put('/api/bill/:billName', settleBill)
	//app.delete('/api/bill', deleteBill)

  


	function createBill(req, res , next) {
		console.log('new bill')
		/*billName = "bowling";
		billDescription = "i day out";
		billAmount = 40;
		billGroup = "univ";
		created = new Date();
		modified = new Date();
		billParticipants = [{firstName: "toto", lastName: "tata"}, {firstName: "tom", lastName: "jerry"}, {firstName: "up", lastName: "down"}, {firstName: "come", lastName: "go"}];
		payedBy = [{firstName: "toto", lastName: "tata", amount : 20}, {firstName: "tom", lastName: "jerry", amount : 20}];
		IOUs = [{owed: "toto", owee: "up", amount : 20}, {owed: "tom", owee: "come", amount : 20}];*/
		billModel.findOne({ billName: req.body.billName}, function(err, bill) {
	        if (err) {
	            res.json({
	                type: false,
	                data: "Error occured: " + err
	            });
	        } else {
	            if (bill) {
	                res.json({
	                    type: false,
	                    data: "bill already exists!"
	                });
	            } else {
	                var bill = { 
							billName: req.body.billName,
							billDescription: req.body.billDescription,
							billAmount: req.body.billAmount,
							billGroup: req.body.billGroup,
							created: req.body.created,
							modified: req.body.modified,
							billParticipants: req.body.billParticipants,
							payedBy: req.body.payedBy,
							IOUs: req.body.IOUs
						}

					/*	var bill = { 
							billName: billName,
							billDescription: billDescription,
							billAmount: billAmount,
							billGroup: billGroup,
							created: created,
							modified: modified,
							billParticipants: billParticipants,
							payedBy: payedBy,
							IOUs: IOUs
						}*/

					var newbill = new billModel(bill);
	                newbill.save(function(err) {
						if (err) {
							console.log(err);
							return res.send(400);
						}

						return res.send(200, bill);
					});
	            }

	        }
	    });

		
	}
 function getBills(req, resp, next){
		var firstName = req.params.firstName;

	if (firstName == null) {
		return resp.sendStatus(400);
	}

	var query = billModel.find({'billParticipants.firstName': firstName}, { billName: 1, billDescription: 1, billAmount: 1, billGroup: 1, created:1, _id:0});
	//query.sort('-date');
	query.exec(function(err, bills) {
		if (err) {
			console.log(err);
			return resp.sendStatus(400);
		}

		return resp.send(200, bills);
	});
  }


 function getPayedBy(req, resp, next){
		var billName = req.params.billName;

	if (billName == null) {
		return resp.sendStatus(400);
	}

	var query = billModel.find({billName: billName}, { payedBy: 1, _id:0});
	//query.sort('-date');
	query.exec(function(err, bills) {
		if (err) {
			console.log(err);
			return resp.sendStatus(400);
		}

		return resp.send(200, bills);
	});
  }

   function getParticipants(req, resp, next){
		var billName = req.params.billName;

	if (billName == null) {
		return resp.sendStatus(400);
	}

	var query = billModel.find({billName: billName}, { billParticipants: 1, _id:0});
	//query.sort('-date');
	query.exec(function(err, bills) {
		if (err) {
			console.log(err);
			return resp.sendStatus(400);
		}

		return resp.send(200, bills);
	});
  }

   function settleBill(req, resp, next){
		var billName = req.params.billName;
		var IOU = {owed: req.body.owed, owee: req.body.owee, amount : req.body.amount};
		

	if (billName == null) {
		return resp.sendStatus(400);
	}

	var query = billModel.findOneAndUpdate({billName: billName}, {$pull: {IOUs: IOU}});
	query.exec(function(err, IOU) {
		if (err) {
			console.log(err);
			return resp.sendStatus(400);
		}

		return resp.send(200);
	});
  }


function getIOUs(req, resp, next){
		var firstName = req.params.firstName;

	if (firstName == null) {
		return resp.sendStatus(400);
	}
	var query = billModel.aggregate([ { $unwind: "$IOUs" },{ $match : { "IOUs.owee" : firstName } }, 
		{ $group: { _id: "$billName", IOUs: { $push: "$IOUs" }}}])
	
	//query.sort('-date');
	query.exec(function(err, bills) {
		if (err) {
			console.log(err);
			return resp.sendStatus(400);
		}

		return resp.send(200, bills);
	});
  }

  function getIAMOweds(req, resp, next){
		var firstName = req.params.firstName;

	if (firstName == null) {
		return resp.sendStatus(400);
	}
	var query = billModel.aggregate([ { $unwind: "$IOUs" },{ $match : { "IOUs.owed" : firstName } }, 
		{ $group: { _id: "$billName", IOUs: { $push: "$IOUs" }}}])
	
	//query.sort('-date');
	query.exec(function(err, bills) {
		if (err) {
			console.log(err);
			return resp.sendStatus(400);
		}

		return resp.send(200, bills);
	});
  }

  function getTotalAmountIO(req, resp, next){
		var firstName = req.params.firstName;

	if (firstName == null) {
		return resp.sendStatus(400);
	}

	var query = billModel.aggregate([ { $unwind: "$IOUs" },{ $match : { "IOUs.owee" : firstName }}, 
		{ $group: { _id: null, total: { $sum:"$IOUs.amount" }}}]);
	//query.sort('-date');
	query.exec(function(err, bills) {
		if (err) {
			console.log(err);
			return resp.sendStatus(400);
		}

		return resp.send(200, bills);
	});
  }

    function getTotalAmountIAMOwed(req, resp, next){
		var firstName = req.params.firstName;

	if (firstName == null) {
		return resp.sendStatus(400);
	}
	var query = billModel.aggregate([ { $unwind: "$IOUs" },{ $match : { "IOUs.owed" : firstName } }, 
		{ $group: { _id: null, total: { $sum:"$IOUs.amount" }}}]);
	//query.sort('-date');
	query.exec(function(err, bills) {
		if (err) {
			console.log(err);
			return resp.sendStatus(400);
		}

		return resp.send(200, bills);
	});
  }

}