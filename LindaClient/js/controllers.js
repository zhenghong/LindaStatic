'use strict';

/* Controllers */
function init($rootScope) {

	$rootScope.userState = {"login":true,"logout":false};

	// websocket
	ws($rootScope);

}

function ws($rootScope){

	var socket = new SockJS('/LindaMQ/random');
	var client = Stomp.over(socket);

	client.connect('user', 'password', function(frame) {

	  client.subscribe("/queue/asyncQueue", function(message) {

		$rootScope.notice = "您尾号 5678 的帐户发生一笔金额 " + message.body + " 的转帐！";

		window.setTimeout(function(){

			$("#notice").fadeIn("normal");
		
		},2000);

		window.setTimeout(function(){

			$("#notice").fadeOut("notice");
		
		},5000);   

	  });

	});
}

// controller
function login($scope, $http, $location, $rootScope ) {

	// model
	$scope.user = {};

	// click evnets
	$scope.processForm = function() {

		console.log($scope.user);
		$scope.result = false

		$http({
			
			params : $scope.user,
	        method : 'get',//get or post
	        //url     : 'virtualData/loginData.json', //request url virtual
	        //timeout: 3000, 
	        url    : 'user/login.do' //request url

	    }).success(function(data) {
    		//callback function
    		console.log(data);

            if(data.ec != '0'){

                $scope.result = true
                $scope.errorCode = data.ec;
                $scope.errorMes = data.em;
            } else {

	    		$location.path('main');

	    		$rootScope.userState = {"login":false,"logout":true};
	    		$rootScope.userName = data.userName;
	    		$rootScope.SID = data.sid;
            }
	    }).error(function(data){
	    	alert("通讯失败！");
	    });
	};
}

function logout($rootScope,  $http){

	console.log($rootScope.SID);

	$http({
		
		params : {sid: $rootScope.SID},
        method : 'get',//get or post
        //url     : 'virtualData/loginData.json', //request url virtual
        url    : 'user/logout.do' //request url

    }).success(function(data) {
		//callback function
		console.log(data);
	
		$rootScope.userState = {"login":true,"logout":false};
		$rootScope.userName = "";

    });

}