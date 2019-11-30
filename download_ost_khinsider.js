chrome.tabs.onHighlighted.addListener((highlightInfo) => {
	chrome.tabs.get(highlightInfo.tabIds[0], (tab) => {
		var match = tab.url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
		if(match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0 && match[2] === "downloads.khinsider.com") {
			chrome.pageAction.show(tab.id);
		} else {
			chrome.pageAction.hide(tab.id);
		}
	});
});
chrome.webNavigation.onCompleted.addListener(details => {
	chrome.pageAction.show(details.tabId);
}, {
	url: [{
		hostEquals: "downloads.khinsider.com"
	}]
});
chrome.pageAction.onClicked.addListener((tab) => {
	console.log(tab);
	chrome.pageCapture.saveAsMHTML({tabId: tab.id}, mhtmlData => {
		console.log(mhtmlData);
	});
	/*var urls = new Set();
	$('#songlist .clickable-row a').each(idx => {
		urls.add($(this).attr('href'));
	});
	var urlsCount = urls.size;
	var count = 0;
	var mp3s = new Array();
	urls.forEach(url => {
		$.get('https://downloads.khinsider.com' + url, data => {
			var url = $(data).find('audio')[0].src;
			console.log(mp3s);
			mp3s.push(url);
			if(++count % 50 == 0 || count == urlsCount) {
				console.log(mp3s.join(','));
				//console.log('https://nabreus.fr2.quickconnect.to/webapi/entry.cgi?type=url&destination="home/Public/A classer/New Super Mario Bros. U"&create_list=true&url=[' + mp3s.join() + ']&api=SYNO.DownloadStation2.Task&method=create&version=2');
				mp3s = new Array();
			}
			console.log(count);
		});
	});*/
});