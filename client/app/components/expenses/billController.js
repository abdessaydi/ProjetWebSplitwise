(function() {
    'use strict';

    angular
        .module('controllers')
        .controller('BillController', ['$scope', '$rootScope', 'BillResource','localStorageService',,BillController])

    function BillController($scope, $rootScope, BillResource,localStorageService) {
		
        $scope.billCreateModel = {};
        $scope.hello ='';
        alert()


        
        $scope.resetForm = function(){
             $scope.billCreateModel = {};
        }

        
        $scope.addBill = function(billModel) {
        

                BillModel.description = billModel.description
                BillModel.amount = billModel.amount
                BillModel.date = billModel.amount

                
                BillResource.add(billModel, function(res) {
                	$scope.hello = 'hello'
                    $scope.resetForm()
                    $scope.refresh()

                    
                    $rootScope.$emit('billRefresh');
               })
        }

        $scope.getBills = function(){
            alert('getbills')
            var user ={ firstName : localStorageService.get("USER").firstName}
            var billUser =  new BillResource(user);
            billUser.$getAll(function(res) {
                    if (res.type == false) {
                        alert(res.data);
                    } else {
                        $scope.bills = res.data ,
                        localStorageService.set("BILLS", $scope.bills)
                        $rootScope.CurrentUser  = res.data;
                    }
                })

                                   
        }

        
        $scope.deleteBill = function(billID) {
            BillResource.remove(billID).$promise.then(function() {
                $scope.refresh()
            })
        }


        $scope.refresh()
        $scope.getBills()
    }

})();