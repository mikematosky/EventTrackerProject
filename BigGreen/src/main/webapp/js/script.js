window.addEventListener('load', function(){
	init();
});

function init(){
	console.log('script.js loaded');
	getAllWaterings();

	document.newWatering.createWateringButton.addEventListener('click', createWatering);

};


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
				let waterings = JSON.parse(wateringsJSON);
				//Display Waterings in a table
				displayAllWaterings(waterings);
				//Did makeTable run or break?
				console.log(waterings);
			}
			else{
				let errorDiv= document.getElementById("errorDiv");
				errorDiv.textContent = 'All Waterings Not Found';
			}
		}
	}
	xhr.send(null);
};
///////// GET ONE \\\\\\\\\\\\\\\\\
function getWatering(wateringID){
	let xhr= new XMLHttpRequest();
	xhr.open('GET', 'api/waterings/' +wateringID);
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status === 200) {
				var watering = JSON.parse(xhr.responseText);
				displayWatering(watering);
			}
			else{
				let errorSpot = document.getElementById("errorDiv");
				errorSpot.textContent = 'No Watering Found.';
			}
		}
		
	}
	xhr.send();
};






















/////////////TABLE INFO & AGGREGATE Requirement\\\\\\\\\\\\\\\\\\\\
function displayAllWaterings(waterings){
	var wateringsList = document.getElementById('wateringsList');
	wateringsList.textContent= '';

	var wateringTable= document.createElement('table');
	var wateringTableHead= document.createElement('thead');
	var wateringTableHeadRow= document.createElement('tr');
	var wateringTableHeadId= document.createElement('th');
	var wateringTableHeadDate= document.createElement('th');
	var wateringTableHeadInches= document.createElement('th');
	var wateringTableHeadIsRain= document.createElement('th');
	var wateringTableHeadDuration= document.createElement('th');
	var wateringTableHeadObservation= document.createElement('th');
	
	wateringTableHeadId.textContent= 'Id';
	wateringTableHeadDate.textContent= 'Date';
	wateringTableHeadInches.textContent= 'Amount (inches)';
	wateringTableHeadIsRain.textContent= 'Rain or Hose?';
	wateringTableHeadDuration.textContent= 'Duration (hours)';
	wateringTableHeadObservation.textContent= 'Additional Observations';

	wateringsList.appendChild(wateringTable);
	wateringTable.appendChild(wateringTableHead);
	wateringTableHead.appendChild(wateringTableHeadRow);
	wateringTableHeadRow.appendChild(wateringTableHeadId);
	wateringTableHeadRow.appendChild(wateringTableHeadDate);
	wateringTableHeadRow.appendChild(wateringTableHeadInches);
	wateringTableHeadRow.appendChild(wateringTableHeadIsRain);
	wateringTableHeadRow.appendChild(wateringTableHeadDuration);
	wateringTableHeadRow.appendChild(wateringTableHeadObservation);

	for(let i=0; i< waterings.length; i++){
		let row= document.createElement('tr');
		row.id= waterings[i].id;
		let wateringId =document.createElement('td');
		wateringId.textContent= waterings[i].id;
		let date =document.createElement('td');
		date.textContent= waterings[i].date;
		let inches =document.createElement('td');
		inches.textContent= waterings[i].inches;
		let isRain =document.createElement('td');
		isRain.textContent= waterings[i].rain;
		let duration =document.createElement('td');
		duration.textContent= waterings[i].duration;
		let observation =document.createElement('td');
		observation.textContent= waterings[i].observations;

		row.appendChild(wateringId);
		row.appendChild(date);
		row.appendChild(inches);
		row.appendChild(isRain);
		row.appendChild(duration);
		row.appendChild(observation);
		row.addEventListener('click', function(e){
			e.preventDefault();
			getWatering(waterings[i].id);
		});

		wateringTable.appendChild(row);
		wateringTable.appendChild(document.createElement('hr'));
	}

	//Aggregate Watering
	let totalRow= document.createElement('tr');
	let totalD= document.createElement('td');


	var totalRain= 0;
	for(let i = 0; i < waterings.length; i++){
		totalRain = totalRain + waterings[i].inches;
	}

	totalD.textContent= "Total Watering: "+totalRain+" inches.";
	totalRow.appendChild(totalD);
	wateringTable.appendChild(totalRow);


};















///////////////////// Display A Single Watering \\\\\\\\\\\\\\\\\\\\\\
function displayWatering(watering){
	console.log('there is a watering');
	var wateringDetails= document.getElementById('wateringDetails');
	wateringDetails.textContent='';
	var displayForm= document.createElement('form');
	displayForm.name= 'displayForm';// do I need for appending or referencing later?

	let wateringID = document.createElement('input');
	let lblId= displayForm.appendChild(document.createElement('label'));
	lblId.textContent='Id:';
	wateringID.name= 'wateringID';
	wateringID.type= 'number'
	wateringID.value= watering.id;
	displayForm.appendChild(wateringID);

	displayForm.appendChild(document.createElement('br'));

	let wateringDate= document.createElement('input');
	let lblDate= displayForm.appendChild(document.createElement('label'));
	lblDate.textContent='Date:';
	wateringDate.name= 'date';
	wateringDate.type= 'date';
	wateringDate.value= watering.date;
	displayForm.appendChild(wateringDate);

	displayForm.appendChild(document.createElement('br'));

	let wateringInches= document.createElement('input');
	let lblInches= displayForm.appendChild(document.createElement('label'));
	lblInches.textContent='Amount (inches):';
	wateringInches.name= 'inches';
	wateringInches.type= 'number';
	wateringInches.value= watering.inches;
	displayForm.appendChild(wateringInches);

	displayForm.appendChild(document.createElement('br'));

	//TODO make these radio buttons
	let wateringType= document.createElement('input');
	let lblType= displayForm.appendChild(document.createElement('label'));
	lblType.textContent='wasRain (true/false):';
	wateringType.name= 'isRain';
	wateringType.type= 'text';
	wateringType.value= watering.rain;
	displayForm.appendChild(wateringType);

	displayForm.appendChild(document.createElement('br'));

	let wateringDuration= document.createElement('input');
	let lblDuration= displayForm.appendChild(document.createElement('label'));
	lblDuration.textContent='Duration (hours):';
	wateringDuration.name= 'duration';
	wateringDuration.type= 'number';
	wateringDuration.value= watering.duration;
	displayForm.appendChild(wateringDuration);

	displayForm.appendChild(document.createElement('br'));
	
	let wateringObservations= document.createElement('input');
	let lblObservations= displayForm.appendChild(document.createElement('label'));
	lblObservations.textContent='Additional Observations:';
	wateringObservations.name= 'observations';
	wateringObservations.type= 'text';
	wateringObservations.value= watering.observations;
	displayForm.appendChild(wateringObservations);
	
	displayForm.appendChild(document.createElement('br'));

	//TODO Maybe make this button instead of input, but input type submit is a button
	let editButton= document.createElement('input');//is this input or button?
	editButton.name= 'editButton';
	editButton.type= 'submit';
	editButton.value= 'Edit Entry';
	displayForm.appendChild(editButton);
	editButton.addEventListener('click', function(e){
		e.preventDefault();
		editWatering(wateringID.value);
	});

	let deleteButton= document.createElement('input');
	deleteButton.name= 'deleteButton';
	deleteButton.type= 'submit';
	deleteButton.value= 'Delete Entry';
	displayForm.appendChild(deleteButton);
	deleteButton.addEventListener('click', function(e){
		e.preventDefault();
		deleteWatering(wateringID.value);
	});

	let formTitle= document.createElement('h4');
	formTitle.textContent='Edit / Delete:';

	wateringDetails.appendChild(formTitle);
	wateringDetails.appendChild(displayForm);

}













//////////////CREATE WATERING \\\\\\\\\\\\\\
// Step 1 collect data 
function createWatering(e){
	e.preventDefault();

	let form= document.newWatering;
	let thisWatering = {};

	//protect nulls
	if(form.date.value !=='' && form.inches.value !== '' 
		&& form.duration.value !== '' && form.wId.value === ''){
		//collect values
		thisWatering.date= form.date.value;
		thisWatering.inches= form.inches.value;
		thisWatering.duration= form.duration.value;
		thisWatering.observations= form.observations.value;
		thisWatering.rain= form.rain.value;
	}
	//send for adding
	addWatering(thisWatering);
};
//Step 2 send data and refresh
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
				console.log("Watering Successfully Added");
				document.newWatering.reset();
				getAllWaterings();
			}
			else{
				console.log("Watering Entry Creation Failed.");
				console.error(xhr.status +': '+xhr.responseText);
			}

		}
	}
	xhr.send(waterJSON);

}











//////////// UPDATE AN ENTRY \\\\\\\\\\\\\\\\\\\\\\\\\\
function editWatering(wateringID){
		editedWatering= {};

	if (displayForm.date.value !=='' && displayForm.inches.value !== '' 
		&& form.duration !== '' && (displayForm.isRain.value === 'true' || displayForm.isRain.value === 'false')){
		editedWatering.date = displayForm.date.value;
		editedWatering.inches= displayForm.inches.value;
		editedWatering.duration= displayForm.duration.value;
		editedWatering.isRain= displayForm.isRain.value;
		editedWatering.observations= displayForm.observations.value;
	}
	else{
		let errorSpot = document.getElementById("errorDiv");
		errorSpot.textContent = 'Incomplete or Incompatible Edit to Entry';
	}
	sendEditWatering(editedWatering, wateringID);
}
function sendEditWatering(newWatering, wateringID){
	let xhr= new XMLHttpRequest();
	xhr.open('PUT', 'api/waterings/'+wateringID);
	xhr.setRequestHeader('Content-type', 'application/json');
	
	let wateringJSON= JSON.stringify(newWatering);
	
	xhr.onreadystatechange= function(){
		if(xhr.readyState === 4){
			if(xhr.status=== 200 | xhr.status === 201){
				let newerWatering= JSON.parse(xhr.responseText);
				console.log("Watering Successfully Updated");
				getAllWaterings();
				displayWatering(newerWatering);
			}
			else{
				console.log("Watering Entry Update Failed.");
				console.error(xhr.status +': '+xhr.responseText);
			}

		}
	}
	xhr.send(wateringJSON);
}










//////////////////////// DELETE WATERING ENTRY \\\\\\\\\\\\\\\
function deleteWatering(wateringID){

	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', 'api/waterings/' + wateringID);
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status === 200 || xhr.status === 204){
				console.log('ENTRY DELETED');
				displayForm.reset();
				getAllWaterings();
			}
			else{
				let errorSpot = document.getElementById("errorDiv");
				errorSpot.textContent = 'DELETE FAILED: '+xhr.status+': '+xhr.responseText;
			}
		}
	}
	xhr.send();
}


