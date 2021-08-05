'use strict';

angular.module('GameApp').factory('GameService', ['$http', '$log', function($http, $log) {

		var REST_SERVICE_URI = 'game/';

		var factory = {
			fetchAllGames : fetchAllGames,
			createGame : createGame,
			deleteGame : deleteGame,
			updateGame : updateGame,
			filterByGenre:filterByGenre
		};

		return factory;

		function fetchAllGames() {
			return $http.get(REST_SERVICE_URI + 'getAll').then(function(response) {
					return response.data;
				}
			);
		}

		function createGame(game) {
			return $http.post(REST_SERVICE_URI + 'createGame', game).then(function(response) {
					return response.data;
				}
			);
		}
		function deleteGame(game) {
			return $http.delete(REST_SERVICE_URI + game.id).then(function(response) {
					if(response.data == null){
						return true;
					}else {
						$log.debug(response.data);
						return false;
					}
					
				}
			);
		}
		
		function updateGame(game) {
			return $http.put(REST_SERVICE_URI + 'updateGame', game).then(function(response) {
					return response.data;
				}
			);
		}
		
		function filterByGenre(genreName) {
			return $http.get(REST_SERVICE_URI + 'getAll', {params:{genre:genreName}}).then(function(response) {
					return response.data;
				}
			);
		}
	
}]);
