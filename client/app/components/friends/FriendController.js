(function() {
    'use strict';

    angular
        .module('controllers')
        .controller("FriendController", ["$scope", "$http", function ($scope, $http) {
     $scope.orderList = "name";
     $scope.query;
		$scope.friends = [
      {name: "Mark", gender: "male", number: "(565) 355-3748", image: "http://markmurray.co/images/profiler.jpg"},
      {name: "Glen", gender: "male", number: "(233) 245-3753"},
      {name: "Dee", gender: "male", number: "(445) 666-3453"},
      {name: "Eoghan", gender: "male", number: "(646) 334-5868"},
      {name: "Dermot", gender: "male", number: "(875) 385-8685"},
      {name: "Eoin", gender: "male", number: "(254) 385-3589"},
      {name: "Matt", gender: "male", number: "(345) 693-5699"},
      {name: "Chloe", gender: "female", number: "(654) 485-3985"},
      {name: "Cian", gender: "male", number: "(484) 385-5839"},
      {name: "John", gender: "male", number: "(373) 384-3860"},
      {name: "Angela", gender: "female", number: "(374) 834-0088"},
      {name: "Joshua", gender: "male", number: "(586) 039-8800"},
      {name: "Alice", gender: "female", number: "(695) 858-3985"},
      {name: "Derek", gender: "male", number: "(384) 345-4987"},
      {name: "Annette", gender: "female", number: "(283) 348-3756"},
      {name: "Tanya", gender: "female", number: "(354) 959-3859"},
      {name: "Martin", gender: "male", number: "(386) 348-3824"},
      {name: "Liam", gender: "male", number: "(383) 959-5948"},
      {name: "Stewart", gender: "male", number: "(347) 869-3869"},
      {name: "Brian", gender: "male", number: "(456) 485-3454"},
      {name: "Peter", gender: "male", number: "(686) 485-3458"},
      {name: "Lois", gender: "female", number: "(838) 586-6849"},
      {name: "Meg", gender: "female", number: "(384) 485-6832"},
    ];
      var list = $scope.friends;		
      var arrayLength = list.length;
      
      // Using $http to fetch JSON data
      function getImage($scope, $http, index){
              $http({
              method: 'GET', 
              url: 'http://uifaces.com/api/v1/random'
      })
      .success(function(data, status, headers, config) {
      				// Set image key = random JSON image
                $scope.friends[index].image = data.image_urls.normal;
            }, $scope).error(function(data, status, headers, config) { alert(status); });
      }; 
       
      // Get a new image for each friend in the array
		 for(var i=0;i<arrayLength;i++){                      
				getImage($scope, $http, i);
      }
      
		 // Reverse Order Button
      $scope.reverse = function(){
      	if($scope.orderList == "name"){
      		$scope.orderList = "-name";
        } else {
      		$scope.orderList = "name";
        }
      };
      
		 // Add New User Button
      $scope.addUser = function() {
      	if($scope.query !== ''){
            $scope.newGender = $scope.newGender.toLowerCase();
            $scope.friends.push({name: $scope.newName, gender: $scope.newGender, number: $scope.newNumber});
            getImage($scope, $http, arrayLength);
      		 $scope.newName = '';
      		 $scope.newGender = '';
      		 $scope.newNumber = '';
      
      	}
      };
      
	}]);
}();