package com.skilldistillery.events.services;

import java.util.List;

import com.skilldistillery.events.entities.Watering;

public interface WateringsService {

	List<Watering> showAll();
	
	Watering showByWateringId(int wateringId);
	
	Watering addWatering(Watering watering);
	
	Watering updateWatering(Watering watering, int wateringId);
	
	Boolean deleteWatering(int wateringId);
}
