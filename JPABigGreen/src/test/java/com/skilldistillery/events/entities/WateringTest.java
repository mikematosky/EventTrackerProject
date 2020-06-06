package com.skilldistillery.events.entities;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class WateringTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Watering watering;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf= Persistence.createEntityManagerFactory("BigGreenPU");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em= emf.createEntityManager();
		watering = em.find(Watering.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		watering= null;
	}

	@Test
	void test() {
		assertNotNull(watering);
		assertEquals(false, watering.isRain());
		assertEquals(LocalDate.parse("2020-05-31"), watering.getDate());
		assertEquals(0.25, watering.getInches());
		assertEquals(0.5, watering.getDuration());
		assertEquals("The perimeter grass near the flower beds is going dormant. Weeds in back yard", watering.getObservations());
		
	}

}
