(function(){
    'use strict';

    angular
    .module('controllers')
    .controller('NavbarController',['$scope', '$rootScope', '$state', 'SignupService','localStorageService'
            ,function($scope, $rootScope , $state, SignupService, localStorageService){

    $scope.signUp = function() {
    	        if(isFormValid()){
                var newUser = {
                        username: $scope.signUpUser.name,
                        lastName: $scope.signUpUser.last,
                        firstName: $scope.signUpUser.first,
                        email: $scope.signUpUser.mail,
                        password: $scope.signUpUser.pass
                    }
                
                var newNewUser = new SignupService(newUser);
                
                newNewUser.$save(function(res) {
                    if (res.type == false) {
                        alert(res.data);
                    } else {
                        $('#modal-signup').modal('hide');
                        $scope.signInUser.username = newUser.username
                        $scope.signUpUser = {}
                    
                    }
                })
            }
        }

       
        function isFormValid(){
            $scope.error = null

            var username = $scope.signUpUser.name
            var first = $scope.signUpUser.first
            var last = $scope.signUpUser.last
            var email = $scope.signUpUser.mail
            var psw = $scope.signUpUser.pass
            var repsw = $scope.signUpUser.repass
            
            if(username && first && last && email && psw && repsw) {
                if(validateEmail(email) == false) {
                  $scope.error = "Incorrect email "
                  return false;
                }
                else if((psw.length)<1) {
                    $scope.error = "Password must contain at least 8 letter";
                    return false;
                }                
                else if(!(psw).match(repsw)) {
                    $scope.error = "Passwords don't match"
                    return false;
                }
                return true
            }
            else {
                $scope.error = "Fill in all required entry fields"
                return false;
            }
        }

        function validateEmail(email) { 
            var re = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            return re.test(email);
        } 

        function refreshScope(){
            $scope.error = null
            $scope.signInUser = {}
            $scope.signUpUser = {}  
        }

        $scope.goToDashbord = function(){
            $state.go('dashboard')
        }

        $scope.goToExpenses = function(){
            $state.go('expenses')
        }
        $scope.goToFriends = function(){
            $state.go('friens')
        }

        $scope.goToGroups = function(){
            $state.go('expenses')
        }

        $scope.signIn = function() {
            
            if($scope.signInUser.username && $scope.signInUser.password){
                var loginUser = new SignupService($scope.signInUser)
                loginUser.$query(function(res) {
                    if (res.type == false) {
                        alert(res.data);
                    } else {
                        $scope.user = res.data ,
                        localStorageService.set("USER", $scope.user)
                        $rootScope.CurrentUser  = res.data;
                        //StorageServices.login($scope.user)
                        $state.go('dashboard');
                    }
                })
            }
        }


        refreshScope()


    }]);
})();