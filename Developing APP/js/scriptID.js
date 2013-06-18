console.log("ID's script loaded");

$(document).ready(function(){
	var nameSelector 	=	'empty',
		idSelector 		=	'empty',
		settings = {
			prefix: "",
			splitSymbol: "_",
			workType: "automatic"
		},
		searchTerm		= [],
		id 				= '';

	if($('[name="CreatePagelet_Name"]').length){
		nameSelector 	=	'[name="CreatePagelet_Name"]';
		idSelector 		=	'[name="CreatePagelet_PageletID"]';
		id = $(idSelector).val().replace('cmp_', '');
	}
	else if($('[name="CreatePage_Name"]').length){
		nameSelector 	=	'[name="CreatePage_Name"]';
		idSelector 		=	'[name="CreatePage_PageID"]';
		id = $(idSelector).val().replace('cmp_', '');
	}



	//Generate search term for loading settings
	function searchNameSettings(obj){
		for(item in obj){
			searchTerm.push(item);
		}
		return searchTerm;
	}

	function setCompId(){
		var name = ($(nameSelector).val()).toLowerCase().replace(/([ ]+|\-+\-?[ ]*)+/g, settings.splitSymbol);
		$(idSelector).val(settings.prefix + name + settings.splitSymbol + id);
	}

	//Load settings from storage(if empty, loaded default)
	chrome.storage.sync.get(searchNameSettings(settings), function(val) {
		for(item in val)
			settings[item] = val[item];
		if (settings.prefix.length > 0) settings.prefix = settings.prefix+''+settings.splitSymbol;
		if(settings.workType == 'automatic'){
			$(document).delegate(nameSelector, 'keyup', function(){
				setCompId();
			});
		}
		else{
			$(nameSelector).css({'vertical-align': 'middle'});
			$(nameSelector).parent().append('<span class="getID" style="padding: 4px 7px; background: #07C2C2; border-radius: 5px; cursor: pointer; vertical-align: middle; color: #FFF;">Set ID</span>');
			$(document).delegate('.getID', 'click', function(){
				setCompId();
			});
			$(document).delegate(nameSelector, 'keyup', function(e){
				if(e.ctrlKey && e.keyCode == 13)
					setCompId();
			});
		}
	});
});






