window.addEventListener('load', function(){
	init();
});

function init(){
	console.log('script.js loaded');
	getAllWaterings();
	
	document.searchForm.wateringSearch.addEventListener('click', searchWaterings);
	document.wateringEntry.entrySubmit.addEventListener('click', postOrPut);
	document.chooseYourCU.createEntry.addEventListener('click', resetForm);
	document.chooseYourCU.updateEntry.addEventListener('click', getWateringEntryForEntryForm);
	
}

//Some Global variables
var waterings; //holds HTMLCollection of js Objects
var watering; //holds one object








///////////GET ALL\\\\\\\\\\\\\\\\\\
//Retrieves all Waterings in DB at load
function getAllWaterings(){
	let xhr= new XMLHttpRequest();
	xhr.open('GET', 'api/waterings/');
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status === 200){
				//populate Waterings
				let wateringsJSON= xhr.responseText;
				waterings = JSON.parse(wateringsJSON);
				//Display Waterings in a table
				makeTable(waterings);
				//Did makeTable run or break?
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

//DOESN'T BUILD ANYTHING
function makeTable(wateringsData){
	//create table
	let tableDiv = document.getElementById("WateringsTable");
	let table= document.createElement('table');
	tableDiv.appendChild(table);
	//create header
	let header= document.createElement('thead');
	let headrow= document.createElement('tr');
	let headcell= document.createElement('td');
	headcell.textContent= "Waterings";
	headrow.appendChild(headcell);
	header.appendChild(headrow);
	table.appendChild(header);
	//create body
	let body= document.createElement('tbody');
	table.appendChild(body);
	//Append rows to body
	let count= 0;
	let totalRain= 0;
	for(watering in wateringsData){
		let thisRow= document.createElement('tr');
		let thisTd= document.createElement('td'); 
			
		thisTd.textContent= watering.date;
		
		thisRow.appendChild(thisTd);
		body.appendChild(thisRow);
		
		count++;
		console.log(count);
	}
	//Append table count row
	let finalRow = document.createElement('tr');
	let countTd= document.createElement('td');
	countTd.textContent= "Total entries: "+count;
	table.appendChild(body);
	
};









///////// GET ONE FOR DETAILS DIV\\\\\\\\\\\\\\\\\
//From Search by ID
function searchWaterings(e){
	e.preventDefault();
	
	let searchID= document.searchForm.searchID.value;

	//greater than 0 and is a number
	if(searchID > 0 && !isNaN(searchID)){
		console.log('watering '+searchID);
		getWateringDetails(searchID);//still need to error check for nulls
	}
	//TODO Everything
};
//To send to the display div
function getWateringDetails(wateringID){
	let xhr= new XMLHttpRequest();
	xhr.open('GET', 'api/waterings/' +wateringID);
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status === 200) {
				let wateringJSON= xhr.responseText;
				watering = JSON.parse(wateringJSON);//populates global variabl
				document.getElementById("WateringDetails").textContent= '';
				displayAWatering(watering);
				console.log('watering displayed');
			}
			else{
				let div = document.getElementById("errorDiv");
				div.textContent = 'No Watering Found.';
			}
		}
		
	}
	xhr.send();
}
//Displays in the display div
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

////////// GET ONE FOR POPULATING FORM FOR UPDATES \\\\\\\\\\\\\\\\\\\\\\\\\\
// From Event Listener for input box 'change' or unfocused
function getWateringEntryForEntryForm(e){
	e.preventDefault();
	
	let xhr= new XMLHttpRequest();
	xhr.open('GET', 'api/waterings/' +document.wateringEntry.wateringID.value);
	console.log(document.wateringEntry.wateringID.value);
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status === 200) {
				let wateringJSON= xhr.responseText;
				watering = JSON.parse(wateringJSON);//populates global variabl
				document.getElementById("WateringDetails").textContent= '';
				populateForm(watering);
				console.log('watering displayed');
			}
			else{
				let div = document.getElementById("errorDiv");
				div.textContent = 'No Watering Found.';
			}
		}
		
	}
	xhr.send();
}
function populateForm(){
 let form = document.getElementsByName("wateringEntry");
	console.log(watering);
	console.log(watering.isRain);
	console.log(watering.date);

	form.waterID.textContent= watering.id;
	form.date.textContent= watering.date;
	// form.inches.textContent= watering.inches;
	// if(watering.rain === true){
	// 	form.isRain.rain= checked;
	// }
	// else{
	// 	form.isRain.hose= checked;
	// }
};

function resetForm(){
	document.getElementsById("wateringEntry").reset();
}

function createWatering(){
	let form= document.wateringEntry;
	let thisWatering = {};
	thisWatering.date= form.date.value;
	thisWatering.inches= form.inches.value;
	thisWatering.duration= form.duration.value;
	thisWatering.observations= form.observations.value;
	thisWatering.rain= form.rain.value;
	addWatering(thisWatering);
};

function addWatering(createdWatering){
	console.log(createdWatering);
	let waterJSON= JSON.stringify(createdWatering);
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/waterings')
	xhr.setRequestHeader('Content-type', 'application/json')
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status=== 200 | xhr.status === 201){
				let newWatering= JSON.parse(xhr.responseText);
				displayAWatering(newWatering);
			}
			else{
				displayError('Error Creating a Watering Entry')
			}

		}
	}
	xhr.send(waterJSON);
	let form= document.wateringEntry;
	form.reset();
	

}

function displayError(error){
	//TODO
}


function updateWatering(){
	//TODO
};


