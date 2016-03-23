'use strict';

function account($scope, $http) {

    $scope.account = {};

    $http({
        method  : 'get',//get or post
        // url     : 'virtualData/accountData.json', //request url
        url    : 'user/tranFlow.do',
        data    : $.param($scope.account),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  
    }).success(function(data) {
            //callback function
            
	    if(data.ec == '9'){
	      alert("service maintaining !");
	    }else{
              console.log(data);
              $scope.accountList = data;
            }
    });

    //test service

}
