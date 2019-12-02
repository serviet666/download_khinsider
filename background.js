chrome.webNavigation.onCompleted.addListener(details => {
	chrome.pageAction.show(details.tabId);
}, {
	url: [{
		urlPrefix: "https://downloads.khinsider.com/game-soundtracks/album/"
	}]
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	localStorage[sender.tab.id] = request.songlist;
	chrome.pageAction.onClicked.addListener((tab) => {
		if(localStorage[tab.id] !== undefined || localStorage[tab.id] !== null) {
			localStorage[tab.id].split(',').forEach(idx => {
				chrome.downloads.download({'url': idx});
			});
		}
	});
})