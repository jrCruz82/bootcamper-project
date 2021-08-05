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
			self.genres = [{name:'All'}];
			self.selectedGenre = 'All';

			self.fetchAllGames = function(){
					if(self.selectedGenre != 'All'){
						console.log('not fetch all');
						GameService.filterByGenre(self.selectedGenre).then(function(data){
							self.games = data;
						});
					}else{
						GameService.fetchAllGames().then(function(data) {
						console.log('fetch all');
						self.games = data;
						if(self.games.length>0){
							console.log('games >0');
							self.genres = generateGenreList();
							
						}else {
							self.genres = [{name:'All'}];
							console.log(self.genres);
						}
						});
					}
				}

			function generateGenreList(){
				let genreArray = [];
				self.games.forEach((game)=>{
					genreArray.push(game.genre);
				})
				
				const genreSet = new Set(genreArray);
				genreArray = [];
				genreArray.push('All');
				
				genreSet.forEach((genre)=>{
					genreArray.push(genre);
				})
				
				console.log(genreArray);
				return genreArray;
				
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
