package com.organization.mvcproject.api.model;

import java.util.List;

public interface MockDao {

	List<Game> retrieveAllGames();
	Game saveGame(Game game);
	Boolean deleteGame(Long id);
	Game updateGame(Game game);
}
