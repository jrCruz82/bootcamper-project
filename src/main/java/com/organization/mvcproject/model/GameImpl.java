package com.organization.mvcproject.model;

import org.springframework.stereotype.Component;

import com.organization.mvcproject.api.model.Game;

@Component
public class GameImpl implements Game{

	private Long id;
	private String name;
	private String genre;

	public Long getId() {
		return id;
	}

	public void setId(Long gameId) {
		this.id = gameId;
	}

	public String getName() {
		return name;
	}

	public void setName(String gameName) {
		this.name = gameName;
	}

	public String getGenre() {
		return genre;
	}

	public void setGenre(String gameGenre) {
		this.genre = gameGenre;
	}

}
