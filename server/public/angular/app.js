var app = angular.module('app', ['ngRoute']);

var url = 'http://localhost:8000/';
var view = 'http://localhost:8000/view/';

app.config(['$routeProvider', function($routeProvider){
	$routeProvider.

		when('/',{
			templateUrl : view+'index.html',
			controller	: 'Default'
		}).
		when('/play/tetris',{
			templateUrl	: view+'tetris.html',
			controller	: 'Tetris'
		}).
		when('/play/endless',{
			templateUrl	: view+'endless.html',
			controller	: 'Endless'
		})

}]);

app.controller('Default',function($scope, $http){
	$.getScript(url+'assets/js/custom.js');
	$.getScript(url+'assets/js/dragon.js');
	$.getScript(url+'assets/js/tetris.js');
});
app.controller('Tetris', function($scope, $http){
	$http.get(url+'leaderboard/tetris').success(function(data){
		$scope.result = data;
	});
    $("#banner").remove();
    removejscssfile('assets/js/custom.js','js');
    removejscssfile('assets/js/dragon.js','js');
    removejscssfile('assets/js/tetris.js','js');
    removejscssfile('assets/js/endless.js','js');
    $.getScript(url+'assets/js/tetris/tetris.js');
    $.getScript(url+'assets/js/tetris/controller.js');
    $.getScript(url+'assets/js/tetris/render.js');
});
app.controller('Endless', function($scope, $http){
	$("#banner").remove();
    removejscssfile('assets/js/custom.js','js');
    removejscssfile('assets/js/dragon.js','js');
    removejscssfile('assets/js/tetris.js','js');
    removejscssfile('assets/js/tetris.js','js');
    $.getScript(url+'assets/js/endless.js');
    $http.get(url+'leaderboard/endless').success(function(data){
        $scope.result = data;
    });
});
