package com.organization.mvcproject.api.model;

public interface Game {

	Long getId();
	void setId(Long gameId);
	String getName();
	void setName(String gameName);
	String getGenre();
	void setGenre(String gameGenre);

}
