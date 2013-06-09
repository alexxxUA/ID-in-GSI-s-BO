function successRegExp(){
	console.log('script loaded');
	chrome.browserAction.setIcon({path: 'img/browseractionSuccess.png'});
	chrome.tabs.executeScript(null, {file: "js/jquery-2.0.2.min.js"});
	chrome.tabs.executeScript(null, {file: "js/scriptID.js"});
}
function errorRegExp(){
	console.log("URL doesn't mutch");
	chrome.browserAction.setIcon({path: 'img/browseraction.png'});
}
//Check URL for loading content script
function insertContentScript(){
	chrome.storage.sync.get('regexpUrl', function(val){
		var regExpUrl = new RegExp(val.regexpUrl);

		chrome.tabs.getSelected(null,function(tab) {
			if(regExpUrl.test(tab.url))
				successRegExp();
			else
				errorRegExp();
		});		
	});
};

chrome.tabs.onActivated.addListener(function(activeInfo) {
	chrome.storage.sync.get('regexpUrl', function(val){
		var regExpUrl = new RegExp(val.regexpUrl);

		chrome.tabs.getSelected(null,function(tab) {
			console.log(tab.url);
			if(regExpUrl.test(tab.url))
				chrome.browserAction.setIcon({path: 'img/browseractionSuccess.png'});
			else
				chrome.browserAction.setIcon({path: 'img/browseraction.png'});
		});		
	});
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if(changeInfo.status == 'complete')
		insertContentScript();
});