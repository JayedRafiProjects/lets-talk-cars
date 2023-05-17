//--------------------------------------------------------------------------------------
//NRND INTRANET CSV TO HTML CONVERTER
//TRACKS CSV AND EXTRACT DATA
//--------------------------------------------------------------------------------------


var oTable;

randomize = function () {

    var randomnumber = Math.floor(Math.random() * 100000);
    return randomnumber;
}
$(function () {
	var str;
	var hash = window.location.hash;
	var asset; // key1
	var wg; //key2
	var term; //key3
	

	asset = getSearchParams("asset");  //returns val1
	wg = getSearchParams("wg");
	term = getSearchParams("term");

	//--------------------------------------------------------------------------------------
	// LOCATIOR
	//THIS LINE TRACKS YOUR CSV LOCATION
	//FOR FUTURE CHANGE USE THIS AND OPTION EDITOR BELOW
	//--------------------------------------------------------------------------------------
	
	$.get("csv/data.csv" + "?" + randomize(), function (data) {
		csv_contents = $.csv()(data);
		$('#ftmg').html('<table cellpadding="1" cellspacing="1" border="1" width="850px"  id="ftmg_tbl"></table>');	
		
		//column search
		oTable = $("#ftmg_tbl").DataTable({
			"initComplete": function (settings, json){
			},
			"autoWidth": false,
			"sPaginationType": "full_numbers",
			"aLengthMenu": [[10, 20, -1], [10, 20, "All"]],
			"iDisplayLength": 20,
			"aaData": csv_contents,
			"aoColumns": [
							{ "sTitle": "Picture" }, 
							{ "sTitle": "Style" },
							{ "sTitle": "Make" },
							{ "sTitle": "Year"},
							{ "sTitle": "Transmission", "bVisible": false },
							{ "sTitle": "Engine Displacement" },
							{ "sTitle": "Engine Cylinders"},
							{ "sTitle": "Drive Train"},
							{ "sTitle": "Horsepower" },
							{ "sTitle": "Torque (lb-ft)" },
							{ "sTitle": "Torque (RPM)" },
							{ "sTitle": "Acceleration (0-62MPH)" },
							{ "sTitle": "Top Speed (km/h)" },
							{ "sTitle": "Fuel" },
							{ "sTitle": "Fuel Economy (L/100KM)" }
				]
		});
	});
	var dd_dtype, dd_class, dd_owner;
	


	
	//--------------------------------------------------------------------------------------
	//OPTION EDIT
	//--------------------------------------------------------------------------------------
	
	
	// document type section					
	dd_dtype =  '<span id="span-dtype">Filter By Document Type: </span>' +  
					'<select id="dd_dtype">'   +
						'<option value="All">All</option>' +
						'<option value="Form">Form</option>' + 
						'<option value="Template">Template</option>' + 
						'<option value="Manual">Manual</option>' +
						'<option value="Guideline">Guideline</option>' + 
					'</select>';				
	
	
	// type section
	dd_class =  '<span id="span-class">Filter By Class: </span>' +  
					'<select id="dd_class">'   +
						'<option value="All">All</option>' +
						'<option value="Authority Seeking">Authority Seeking</option>' + 
						'<option value="Administration - General">Administration - General</option>' + 
						'<option value="Administration - Financial">Administration - Financial</option>' +
						'<option value="Technology">Technology</option>' + 
						'<option value="Human Resources">Human Resources</option>' +
						'<option value="Safety and Health">Safety & Health</option>' +
					'</select>';
						
						
	// branch section					
	dd_owner = '<span id="span-owner">Filter By Owner: </span>'+
					'<select id=dd_owner>'   +
						'<option value="All">All</option>' +
						'<option value="Civil Service Commission">Civil Service Commission</option>' +
						'<option value="Financial Services">Financial Services</option>' + 
						'<option value="Finance and Shared Services">Finance and Shared Services</option>' + 
						'<option value="Shared Services and Risk Management">Shared Services and Risk Management</option>' +
						'<option value="Department">Department</option>' + 
						'<option value="Fish and Wildlife">Fish and Wildlife</option>' +
						'<option value="Conservation Officer Service">Conservation Officer Service</option>' +
						'<option value="Process Improvement and Technology">Process Improvement and Technology</option>' +
						'<option value="Manitoba Wildfire service">Manitoba Wildfire Service</option>' +
						'<option value="Forestry and Peatlands">Forestry and Peatlands</option>' +
						'<option value="Manitoba Geological Survey">Manitoba Geological Survey' +
						'<option value="Consultation and Reconciliation Unit">Consultation and Reconciliation Unit' +
						'<option value="Lands and Planning">Lands and Planning</option>' +
						'<option value="Mining, Oil and Gas">Mining, Oil and Gas</option>' +
						'<option value="Business Development Services Unit">Business Development Services Unit</option>' +
						'<option value="NRND">NRND</option>' +
					'</select>';	
						

	
	
	$(dd_owner).prependTo("#ftmg-container");	
	$(dd_class).prependTo("#ftmg-container");
	$(dd_dtype).prependTo("#ftmg-container");

	
	
	// filter category
	$("#dd_dtype").on('change', function () {
		if ( this.value == "All" ){
			oTable.columns(1).search( "" ).draw();
		}else{
			oTable.columns(1).search( this.value ).draw();
		}
	});
	
	
	$("#dd_class").on('change', function () {
		if ( this.value == "All"){
			oTable.columns(3).search( "" ).draw();
		}else{
			oTable.columns(3).search( this.value ).draw();
		}
	});
	// filter category
	$("#dd_owner").on('change', function () {
		if ( this.value == "All" ){
			oTable.columns(5).search( "" ).draw();
		}else{
			oTable.columns(5).search( this.value ).draw();
		}
	});
   
		
}); //end main

function getSearchParams(k){
	var p={};
	location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(s,k,v){p[k]=v})
	return k?p[k]:p;
}