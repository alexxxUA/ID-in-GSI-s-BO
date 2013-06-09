$(document).ready(function(){
	var settings = {
			prefix: "",
			splitSymbol: "_",
			workType: "automatic",
			regexpUrl: '.kiev.ecofabric.com'
		},
		searchTerm = [];

	//Generate search term for loading settings
	function searchNameSettings(obj){
		for(item in obj)
			searchTerm.push(item);
		return searchTerm;
	}
	//Set settings in popup
	function loadSettings(){
		for(item in settings){
			if(item == 'workType')
				$('[value="'+ settings[item] +'"]').prop('checked', true);
			else
				$('[name="'+ item +'"]').val(settings[item]);
		}
	}
	//Save settings
	function saveSettings(){
		$('.settings input').each(function(i, value){
			var $this = $(this);
			if($this.attr('type') == 'text' || $this.attr('type') == 'radio' && $this.is(':checked') )
				settings[$this.attr('name')] = $this.val();
		});
		chrome.storage.sync.set(settings);
	}

	//Load settings from storage(if empty, loaded default)
	function loadSettingsFromStorage(){
		chrome.storage.sync.get(searchNameSettings(settings), function(val) {
			for(item in val)
				settings[item] = val[item];			
			loadSettings();
			chrome.storage.sync.set(settings);
			$('#regexpUrl').trigger('keyup');
		});	
	}
	function successRegExp(e){
		$(e.currentTarget).siblings('.checkURL').removeClass('error').addClass('success');
	};
	function errorRegExp(e){
		$(e.currentTarget).siblings('.checkURL').removeClass('success').addClass('error');
	}
	loadSettingsFromStorage();

	$(document).delegate('.save', 'click', function(){
		saveSettings();
		$('.close').trigger('click');
	});
	$(document).delegate('.close', 'click', function(){
		window.close();		
	});	
	$(document).delegate('#regexpUrl', 'keyup', function(e){
		var regExpUrl = new RegExp($(this).val());

		chrome.tabs.getSelected(null,function(tab) {
			if(regExpUrl.test(tab.url))
				successRegExp(e);
			else
				errorRegExp(e);
		});

	})
});	
