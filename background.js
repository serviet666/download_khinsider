chrome.webNavigation.onCompleted.addListener(details => {
	chrome.pageAction.show(details.tabId);
}, {
	url: [{
		urlPrefix: "https://downloads.khinsider.com/game-soundtracks/album/"
	}]
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	localStorage[sender.tab.id] = JSON.stringify({
		'songlist': request.songlist,
		'title': request.title
	});
});
chrome.pageAction.onClicked.addListener(tab => {
	if(localStorage[tab.id] !== undefined || localStorage[tab.id] !== null) {
		var ost = JSON.parse(localStorage[tab.id]);
		ost.songlist.forEach(idx => {
			chrome.downloads.download({
				'url': idx,
				'filename': ost.title + '/' + decodeURI(decodeURI(idx.substring(idx.lastIndexOf('/') + 1)))
			});
		});
	}
});
chrome.tabs.onRemoved.addListener(tabId => {
});