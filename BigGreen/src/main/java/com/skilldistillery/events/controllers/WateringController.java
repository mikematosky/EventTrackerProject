package com.skilldistillery.events.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.events.entities.Watering;
import com.skilldistillery.events.services.WateringsService;

@RestController
@RequestMapping("api")
public class WateringController {

	@Autowired
	private WateringsService service;

	@GetMapping("waterings")
	public List<Watering> index(){
		return service.showAll();
	}
	
	@GetMapping("waterings/{id}")
	public Watering findById(@PathVariable Integer id) {
		return service.showByWateringId(id);
	}

	@PostMapping("waterings")
	public Watering addWatering(
			@RequestBody Watering water,
			HttpServletRequest request,
			HttpServletResponse response
			) {
		try {
			water = service.addWatering(water);
			response.setStatus(201);
			StringBuffer url = request.getRequestURL();
			url.append("/").append(water.getId());
			response.setHeader("Location", url.toString());
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(400);
			water = null;
		}
		return water;
	}
	
	
	@PutMapping("waterings/{id}")
	public Watering updateWatering(
			@PathVariable Integer id, 
			@RequestBody Watering water,
			HttpServletResponse response
			) {
		try {
			water = service.updateWatering(water, id);
			if (water == null) {
				response.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(400);
			water = null;
		}
		return water;
	}
	
	
	@DeleteMapping("waterings/{id}")
	public void deleteFilm(
			@PathVariable Integer id,
			HttpServletResponse response
			) {
		try {
			if (service.deleteWatering(id)) {
				response.setStatus(204);
			}
			else {
				response.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(409);
		}
	}
	
}