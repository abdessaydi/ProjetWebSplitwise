(function() {
    'use strict';

    angular
        .module('controllers')
        .controller('DashboardController', ['$scope', '$rootScope','localStorageService',  DashboardController])

    function DashboardController($scope, $rootScope,localStorageService ) {
        
        $scope.CurrentUser = localStorageService.get("USER") ;

        /**
         * Refresh the account view
         */
        $scope.refresh = function() {
            var CurrentUser = localStorageService.get("USER");
            $scope.username = CurrentUser.username ; 


           /* StorageServices.getAccounts(function(accounts){
                $scope.accounts = accounts
            })*/
        }
        $scope.resetForm = function(){
            $scope.closeRightMenu()
            $scope.accountCreateModel = {}
            $scope.accountForm.$setPristine();
            $scope.accountForm.$setUntouched();
        }

        /**
         * @Description
         * Add the account from de given model
         * Add the account in bdd, reset the form and refresh the page
         * @Param {Object} accountCreateModel The model of the account to add
         */
        $scope.addAccount = function(accountModel) {
            if($scope.accountForm.$valid) {
                accountModel.currency = accountModel.currency.code
                //accountModel.type = accountModel.type.value
                accountModel.type = ACCOUNT_TYPES[0].value // ONLY Banking
                AccountResource.add(accountModel, function(res) {
                    $scope.resetForm()
                    $scope.refresh()

                    // Permet de rafraichir la liste de comptes dans la navbar
                    $rootScope.$emit('accountRefresh');
                })
            }
        }

        /**
         * @Description
         * Delete account
         * @Param {Object} accountId The id of the account to delete
         */
        $scope.deleteAccount = function(accountId) {
            AccountResource.remove(accountId).$promise.then(function() {
                $scope.refresh()
            })
        }


        $scope.refresh()

    }

})();