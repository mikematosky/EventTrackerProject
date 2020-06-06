package com.skilldistillery.events.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.events.entities.Watering;

public interface WateringsRepository extends JpaRepository<Watering, Integer> {

}
