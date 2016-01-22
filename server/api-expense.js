
module.exports = function (app, tool, billModel) {
    // app.get('/api/account/debug', getDebug)
    app.get('/api/bill/', getAllBills)
    app.get('/api/bill/:id', getBill)
    app.post('/api/bill/', addBill)    
    app.put('/api/bill/', updateBill)
    app.delete('/api/bill/:id', deleteBill)


    function getAllBills(req, resp, next) {
        'use strict';
        tool.getUserId(req, next, function(userId){
            billModel.find({userId: userId}, function (err, bills) {
                if (!err) {
                    resp.send(bills)
                } else {
                    next(err);
                }
            });
        }) 
    }

    function getBill(req, resp, next) {
        'use strict';

        tool.getUserId(req, next, function(userId){
            var billId = req.params.id;

            billModel.findOne({_id: billId}, function (err, bill) {
                if (!err) {
                    if(bill !== null){
                        operationModel.find({accountId: accountId}, function (err, operations) {
                            if (!err) {
                                account.set('operations', operations, { strict : false })
                                return resp.send(account);
                            } else {
                                next(err);
                            }
                        })
                    }else{
                        return resp.sendStatus(204);
                    }
                } else {
                    next(err);
                }
            })
        }) 
    }

    function addBill(req, res, next) {
        'use strict';
        //tool.getUserId(req, next, function(userId){
            var bill= req.body
            delete account._id // Security
            //account.userId = userId
            console.log('tata')
            var newbill = new billModel(bill);
            newbill.save(function(e, results){
                if (e) return next(e);
                res.send(results);
            })
        //})
    }

    function deleteBill(req, res, next) {
        'use strict';
        tool.getUserId(req, next, function(userId){
            var accountId = req.params.id ;
            accountModel.remove({_id: accountId},function (err, results) {
                if (err) return next(err);
                res.sendStatus(204);
            })
        })
    }

    function updateBill(req, res, next) {
        tool.getUserId(req, next, function(userId){
            var account = req.body
            var accountId = account._id
            delete account._id

            accountModel.findByIdAndUpdate(accountId, {$set: account}, function (err, qcm) {
                if (err) return next(err);
                res.send(qcm);
            });
        })
    }
}