package com.organization.mvcproject.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.organization.mvcproject.mockDAO.MockDAO;
import com.organization.mvcproject.model.Game;

@Service("javaGameService")
public class GameServiceImpl implements GameService {

	@Autowired
	private MockDAO mockDAO;
	
	@Override
	public List<Game> retrieveAllGames() {
		
		return mockDAO.retrieveAllGames();
	}

	@Override
	public Game saveGame(Game game) {
		return mockDAO.saveGame(game);
	}

	

}