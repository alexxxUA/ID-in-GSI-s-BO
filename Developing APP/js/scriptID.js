console.log("ID's script loaded");

var settings = {
		prefix: "",
		splitSymbol: "_",
		workType: "automatic"
	},
	searchTerm = [],
	id = $('[name="CreatePagelet_PageletID"]').val().replace('cmp_', '');

//Generate search term for loading settings
function searchNameSettings(obj){
	for(item in obj){
		searchTerm.push(item);
	}
	return searchTerm;
}

function setCompId(){
	var name = ($('[name="CreatePagelet_Name"]').val()).toLowerCase().replace(/([ ]+|\-+\-?[ ]*)+/g, settings.splitSymbol);
	$('[name="CreatePagelet_PageletID"]').val(settings.prefix + name + settings.splitSymbol + id);	
}

//Load settings from storage(if empty, loaded default)
chrome.storage.sync.get(searchNameSettings(settings), function(val) {
	for(item in val)
		settings[item] = val[item];
	if (settings.prefix.length > 0) settings.prefix = settings.prefix+''+settings.splitSymbol;
	if(settings.workType == 'automatic'){
		$(document).delegate('[name="CreatePagelet_Name"]', 'keyup', function(){
			console.log('automatic');
			setCompId();
		});
	}
	else{
		$('[name="CreatePagelet_Name"]').css({'vertical-align': 'middle'});
		$('[name="CreatePagelet_Name"]').parent().append('<span class="getID" style="padding: 4px 7px; background: #07C2C2; border-radius: 5px; cursor: pointer; vertical-align: middle; color: #FFF;">Set ID</span>');
		$(document).delegate('.getID', 'click', function(){
			setCompId();
		});
		$(document).delegate('[name="CreatePagelet_Name"]', 'keyup', function(e){
			if(e.ctrlKey && e.keyCode == 13)
				setCompId();
		});
	}
});




