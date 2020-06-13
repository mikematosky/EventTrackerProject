window.addEventListener('load', function(){
	init();
});

function init(){
	console.log('script.js loaded');
	getAllWaterings();


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
};

function getAllWaterings(){
	let xhr= new XMLHttpRequest();
	xhr.open('GET', 'api/waterings/');
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status === 200){
				let wateringsJSON= xhr.responseText;
				let waterings = JSON.parse(wateringsJSON);
				makeTable(waterings);
				console.log(waterings);
			}
			else{
				let errorDiv= document.getElementById("errorDiv");
				errorDiv.textContent = 'All Waterings Not Found';
			}
		}
	}
	xhr.send();
};

function makeTable(wateringsData){
	//create table
	let tableDiv = document.getElementById("WateringsTable");
	let table= document.createElement('table');
	tableDiv.appendChild(table);
	//create header
	let header= document.createElement('thead');
	header.textContent= "Waterings";
	table.appendChild(header);
	//create body
	let body= document.createElement('tbody');
	table.appendChild(body);
	//Append rows to body
	let count= 0;
	for(watering in wateringsData){
		let thisRow= document.createElement('tr');
		let thisTd= document.createElement('td'); 
			
		thisTd.textContent= watering.date;

		thisRow.appendChild(thisTd);
		table.appendChild(thisRow);

		count++;
	}
	//Append table count row
	let finalRow = document.createElement('tr');
	let countTd= document.createElement('td');
	countTd.textContent= "Total entries: "+count;

};


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
	var h2= document.createElement('h2');
	let ul= document.createElement('ul');
	let li1= document.createElement('li');
	let li2= document.createElement('li');
	let li3= document.createElement('li');
	
	h2.textContent= watering.date;
	thisWatering.appendChild(h2);
	
	
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
