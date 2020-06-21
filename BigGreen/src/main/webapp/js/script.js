window.addEventListener('load', function(){
	init();
});

function init(){
	console.log('script.js loaded');
	
	let tableBody = document.getElementsById('tableBody');
	let tr = document.createElement('tr');
	let td = document.createElement('td');
	td. textContent="ALL WATERINGS";
	tr.appendChild(td);
	tableBody.appendChild(tr);
	tableBody.appendChild(document.createElement('hr'));

	document.getElementsById('createWatering').firstElementChild.textContent= 'Add/Edit Watering ';
	
	getAllWaterings();

	document.newWatering.createWateringButton.addEventListener('click', createWatering);
	document.newWatering.editWateringButton.addEventListener('click', changeWatering);
	document.newWatering.deleteWateringButton.addEventListener('click', deleteWatering);	
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
//Table part 1
function displayAllWaterings(wateringsData){
	//create table
	let tableBody= document.getElementsById('tableBody');
	tableBody.textContent= '';
	for (let i= 0; i < wateringsData.length; i++){
		let tr= document.createElement('tr');
		let td= document.createElement('td');
		td.textContent= wateringsData[i].date;
		tr.appendChild(td);
		tr.wateringId= wateringsData[i].id;
		tr.addEventListener('click', function(){
			this.wateringID= wateringsData[i].id;
			getWateringDetails(this.wateringID);
		});
		tableBody.appendChild(tr);
		tableBody.appendChild(document.createElement('hr'));
	}
	let totalRain= document.createElement('input');
	totalRain.value= 'See Total Rain';
	totalRain.type='button';
	totalRain.id= 'showTotal';
	tableBody.appendChild(totalRain);
	totalRain.allRain= wateringsData;
	totalRain.addEventListener('click', showTotalRain);
	
};
//Table part 2 (get total Rain)
function showTotalRain(){
	let totalRain= 0;
	for(let i = 0; i < this.allRain.length; i++){
		totalRain = totalRain + this.allRain[i].inches;
	}
	let showTotal= document.getElementsById('showTotal');
	showTotal.parentElement.removeChild(showTotal);
	let tableBody= document.getElementsById('tableBody');
	let tr = document.createElement('tr');
	let td = document.createElement('td');
	td.textContent= "Total Watering: "+totalRain+" inches.";
	tr.appendChild(td);
	tableBody.appendChild(tr);
}


///////// GET ONE FOR DETAILS DIV\\\\\\\\\\\\\\\\\
//From Search by ID I don't think this was a requirement but I used for testing
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
				var watering = JSON.parse(wateringJSON);//populates global variabl
				document.getElementById("WateringDetails").textContent= '';
				displayAWatering(watering);
				populateAWatering(watering);
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
//Displays in the Entry Form
function populateAWatering(watering){
	console.log('form is populating');
	let form= document.newWatering;
	form.wId.textContent= watering.id;
	form.date.textContent= watering.date;
	form.isRain.value= watering.isRain;
	form.inches.textContent= watering.inches;
	form.duration.textContent= watering.duration;
	form.observations.textContent= watering.observations; 

}

////////// GET ONE FOR POPULATING FORM FOR UPDATES \\\\\\\\\\\\\\\\\\\\\\\\\\
// From Event Listener for input box 'change' or unfocused





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
//Step 1 collect the data
function changeWatering(e){
	e.preventDefault();
	let form = document.newWatering;
	let watering= {};

	if (form.date.value !=='' && form.inches.value !== '' 
		&& form.duration !== '' && form.wId !== ''){
		watering.date = form.date.value;
		watering.inches= form.inches.value;
		watering.duration= form.duration.value;
		watering.isRain= form.isRain.value;
		watering.observations= form.observations.value;
	}

	editWatering(watering);

}

function editWatering(updatedWatering){
	let xhr= new XMLHttpRequest();
	xhr.open('PUT', 'api/waterings/'+this.updatedWatering.id);
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.onreadystatechange= function(){
		if(xhr.readyState === 4){
			if(xhr.status=== 200 | xhr.status === 201){
				let newerWatering= JSON.parse(xhr.responseText);
				console.log("Watering Successfully Updated");
				document.newWatering.reset();
				getAllWaterings();
				displayAWatering(newerWatering);
			}
			else{
				console.log("Watering Entry Update Failed.");
				console.error(xhr.status +': '+xhr.responseText);
			}

		}
	}
	let waterJSON= JSON.stringify(newerWatering);
	xhr.send(waterJSON);
}

//////////////////////// DELETE WATERING ENTRY \\\\\\\\\\\\\\\
function deleteWatering(e){
	e.preventDefault();

	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', 'api/waterings/' + this.watering.id);
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status === 200 || xhr.status === 204){
				console.log('ENTRY DELETED');
				let form = document.newWatering;
				form.reset();
			}
			else{
				console.log("DELETE FAILED");
				console.error(xhr.status+': '+xhr.responseText);
			}
		}
	}
	xhr.send(null);
}


