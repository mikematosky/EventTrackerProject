package com.skilldistillery.events.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Event {

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private int id;
	private String inches;

	public Event() {
	}

	public Event(int id, String inches) {
		super();
		this.id = id;
		this.inches = inches;
	}

	@Override
	public String toString() {
		return "Event [id=" + id + ", inches=" + inches + "]";
	}

	

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Event other = (Event) obj;
		if (id != other.id)
			return false;
		return true;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getInches() {
		return inches;
	}

	public void setInches(String inches) {
		this.inches = inches;
	}

}
