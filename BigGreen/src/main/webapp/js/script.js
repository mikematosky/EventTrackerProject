window.addEventListener('load', function(){
	init();
});

function init(){
	console.log('script.js loaded');
	document.wateringForm.wateringSearch.addEventListener('click', function(e){
		e.preventDefault();
		
		let wateringID= document.wateringForm.wateringID.value;

		//greater than 0 and is a number
		if(wateringID > 0 && !isNaN(wateringID)){
			console.log('watering '+wateringID);
			getWateringDetails(wateringID);//still need to error check for nulls
		}
	});
	//TODO Everything
}

function getWateringDetails(wateringID){
	let xhr= new XMLHttpRequest();
	xhr.open('GET', 'api/waterings/' +wateringID);
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status === 200) {
				let wateringJSON= xhr.responseText;
				let watering = JSON.parse(wateringJSON);
				document.getElementById("WateringDetails").textContent= '';
				displayAWatering(watering);
				console.log('watering displayed');
			}
			else{
				let div = document.getElementById("WateringDetails");
				div.textContent = 'No Watering Found.';
			}
		}

	}
	xhr.send();

}

function displayAWatering(watering){
	console.log('there is a watering');
	let thisWatering = document.getElementById("WateringDetails");
	console.log(thisWatering);
	var h1= document.createElement('h1');
	let ul= document.createElement('ul');
	let li1= document.createElement('li');
	let li2= document.createElement('li');
	let li3= document.createElement('li');
	
	h1.textContent= watering.date;
	thisWatering.appendChild(h1);
	
	
	let isRain;
	if(watering.rain === true){
		isRain= 'rain water.'
	}
	else if(watering.rain === false){
		isRain= 'hose water.'
	}
	li1.textContent = 'Watering Amount: '+watering.inches+' inches of '+isRain;
	ul.appendChild(li1);
	
	li2.textContent = 'Watering Timeframe: '+watering.duration+' hours';
	ul.appendChild(li2);
	
	li3.textContent = 'Lawn Observations: '+watering.observations;
	ul.appendChild(li3);
	
	thisWatering.appendChild(ul);
}
