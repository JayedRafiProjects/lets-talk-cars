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
							{ "sTitle": "Model" },
							{ "sTitle": "Year"},
							{ "sTitle": "Transmission"},//, "bVisible": false 
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
	var make, trans, dd_owner;
	//dd_type


	
	//--------------------------------------------------------------------------------------
	//OPTION EDIT
	//--------------------------------------------------------------------------------------
	
	
	// document type section					
	make =  '<span id="span-make">Make: </span>' +  
					'<select id="make">'   +
						'<option value="All">All</option>' +
						'<option value="Toyota">Toyota</option>' + 
						'<option value="LEXUS">LEXUS</option>' + 
						'<option value="Audi">Audi</option>' +
						'<option value="BMW">BMW</option>' + 
					'</select>';				
	
	
	// type section
	trans =  '<span id="span-trans">Transmission: </span>' +  
					'<select id="trans">'   +
						'<option value="All">All</option>' +
						'<option value="AT">Automatic</option>' + 
						'<option value="MT">Manual</option>' + 
					'</select>';
						
											

	
	
	$(trans).prependTo("#ftmg-container");
	$(make).prependTo("#ftmg-container");

	
	
	// filter category
	$("#make").on('change', function () {
		if ( this.value == "All" ){
			oTable.columns(2).search( "" ).draw();
		}else{
			oTable.columns(2).search( this.value ).draw();
		}
	});
	
	
	$("#trans").on('change', function () {
		if ( this.value == "All"){
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
