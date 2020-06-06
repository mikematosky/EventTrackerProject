package com.skilldistillery.events.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.events.entities.Watering;
import com.skilldistillery.events.repositories.WateringsRepository;

@Service
public class WateringsServiceImpl implements WateringsService {

	@Autowired
	private WateringsRepository repo;
	
	
	@Override
	public List<Watering> showAll() {
		return repo.findAll();
	}

	@Override
	public Watering showByWateringId(int wateringId) {
		return repo.getOne(wateringId);
	}

	@Override
	public Watering addWatering(Watering watering) {
		repo.saveAndFlush(watering);
		return watering;
	}

	@Override
	public Watering updateWatering(Watering watering, int wateringId) {
		Optional<Watering> waterOpt = repo.findById(wateringId);
		Watering updated= null;

		if(waterOpt.isPresent()) {
			updated= waterOpt.get();
			updated.setDate(watering.getDate());
			updated.setDuration(watering.getDuration());
			updated.setInches(watering.getInches());
			updated.setRain(watering.isRain());
			updated.setObservations(watering.getObservations());
			repo.saveAndFlush(updated);
		}
		return updated;
	}

	@Override
	public Boolean deleteWatering(int wateringId) {
		try {
			repo.deleteById(wateringId);
			return true;
		}
		catch(Exception e) {
			e.printStackTrace();
			return false;
		}
	}

}
