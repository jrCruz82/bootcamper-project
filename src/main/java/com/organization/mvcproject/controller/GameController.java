package com.organization.mvcproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.organization.mvcproject.api.model.Game;
import com.organization.mvcproject.model.GameImpl;
import com.organization.mvcproject.api.service.GameService;


@Controller
public class GameController {

	@Autowired
	private GameService gameService;


	@RequestMapping(value = "/games", method = RequestMethod.GET)
	public ModelAndView game() {
		return new ModelAndView("games", "command", new GameImpl());
	}

	@RequestMapping(value = "game/getAll", method = RequestMethod.GET)
	public ResponseEntity<List<Game>> fetchAllGames() {
		return new ResponseEntity<List<Game>>(gameService.retrieveAllGames(), HttpStatus.OK);
	}

	@RequestMapping(value = "game/createGame", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> createGame(@RequestBody GameImpl game) {
		gameService.saveGame(game);
		return new ResponseEntity<Void>(HttpStatus.CREATED);
	}
	@RequestMapping(value = "game/{id}", method = RequestMethod.GET)
	public ResponseEntity<List<Game>> gameById() {
		return new ResponseEntity<List<Game>>(gameService.retrieveAllGames(), HttpStatus.OK);
	}
	
	@PutMapping(value = "game/updateGame", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> updateGame(@RequestBody GameImpl game) {
		gameService.updateGame(game);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@DeleteMapping(value = "game/{id}")
	public ResponseEntity<?> deleteGame(@PathVariable("id") Long id){
		Boolean isDeleted = gameService.deleteGame(id);
		if(!isDeleted && isDeleted != null) {
			System.err.println("Unable to delete game. Id: "+id+" not found.");
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(isDeleted, HttpStatus.OK);
	}
	
	
}