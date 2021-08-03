'use strict';

angular.module('GameApp').controller('GameController',
		[ 'GameService','$log', function(GameService, $log) {
			var self = this;
			self.game = {
				id : '',
				name : '',
				genre : ''
			};
			self.games = [];
			

			self.fetchAllGames = function(){
				GameService.fetchAllGames().then(function(data) {
					self.games = data;
				});
			}

			self.addGame = function(){
				if(!self.game.id){
					return GameService.createGame(self.game).then( function() {
						self.fetchAllGames();
						self.clearForm();
					});
				}
				
			}
			
			self.deleteGame = function(game){
				return GameService.deleteGame(game).then( function(data) {
					$log.debug(data);
					self.fetchAllGames();
					self.game = {};
				});
			}
			
			
			self.clearForm = function(){
				self.game = {};
			}
			
			self.loadUpdateForm = function (game){
				self.game = angular.copy(game);
			}
			
			self.updateGame = function(){
				if(self.game.id){
					return GameService.updateGame(self.game).then(function(data){
						$log.debug("Game " + data.id + "updated");
						self.fetchAllGames();
						self.game = {};
					})
				}else{
					$log.error("game id does not exist");
				}
				
			}
			self.fetchAllGames();
		}]);
