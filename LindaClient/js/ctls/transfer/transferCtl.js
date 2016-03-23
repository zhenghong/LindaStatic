'use strict';

function transfer($scope, $http, $location) {

	$scope.formData = {}; 
	$scope.result = false;

    $scope.accounts = [{
        id: 1,
        accountNo: '6225880112425678'
    }, {
        id: 2,
        accountNo: '6225880112421234'
    }, {
        id: 3,
        accountNo: '6225880112423467'
    }
    ];

    $scope.account = $scope.accounts[0].accountNo;
    $scope.formData.acc = $scope.account;

    $scope.change = function(){

    	$scope.formData.acc = $scope.account;
    	console.log($scope.formData.acc)
    }

    $scope.transSubmit = function(){   	

    	$scope.submiting = true;

    	$http({
	        method  : 'post',//get or post
	        //url     : 'virtualData/loginData.json', //request url
	        url    : 'user/transfer.do',
                data    : $.param($scope.formData),  // pass in data as strings
	        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
    	}).success(function(data) {
    		//callback function
    		//alert(data);
                console.log(data);
    		$scope.submiting = false;

            if($scope.formData.pwd != '000000'){

                $scope.result = true
                $scope.errorCode = 999999;
                $scope.errorMes = "your passwd is error!";
            } else if(data.ec == '9'){
		$scope.result = true
                $scope.errorCode = 9;
                $scope.errorMes = "service maintaining !";		
	    }else {
    		$location.path("/transfer/result");
            }

    	});

    }

    //test service

}
