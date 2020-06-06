package com.skilldistillery.events.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="waterings")
public class Watering {

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private int id;
	@Column(name= "is_rain")
	private boolean isRain;//Rain or Manmade Watering
	private LocalDate date;
	private Double inches;
	private Double duration; //Represented in hours
	private String observations;
	
	

	public Watering() {
	}

	public Watering(int id, boolean isRain, LocalDate date, Double inches, Double duration, String observations) {
		super();
		this.id = id;
		this.isRain = isRain;
		this.date = date;
		this.inches = inches;
		this.duration = duration;
		this.observations = observations;
	}

	@Override
	public String toString() {
		return "Watering [id=" + id + ", isRain=" + isRain + ", date=" + date + ", inches=" + inches + ", duration="
				+ duration + ", observations=" + observations + "]";
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public boolean isRain() {
		return isRain;
	}

	public void setRain(boolean isRain) {
		this.isRain = isRain;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public Double getInches() {
		return inches;
	}

	public void setInches(Double inches) {
		this.inches = inches;
	}

	public Double getDuration() {
		return duration;
	}

	public void setDuration(Double duration) {
		this.duration = duration;
	}

	public String getObservations() {
		return observations;
	}

	public void setObservations(String observations) {
		this.observations = observations;
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
		Watering other = (Watering) obj;
		if (id != other.id)
			return false;
		return true;
	}
	
	
}