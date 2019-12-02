var urls = new Set();
var songlist = $('#songlist .clickable-row a');
songlist.each(idx => {
	urls.add($(songlist[idx]).attr('href'));
});
var urlsCount = urls.size;
var count = 0;
var mp3s = new Array();
urls.forEach(url => {
	$.get('https://downloads.khinsider.com' + url, data => {
		var url = $(data).find('audio')[0].src;
		mp3s.push(url);
		if(++count % 50 == 0 || count == urlsCount) {
			chrome.runtime.sendMessage({'songlist': mp3s});
			// console.log(mp3s.join(','));
			// console.log('https://nabreus.fr2.quickconnect.to/webapi/entry.cgi?type=url&destination="home/Public/A classer/New Super Mario Bros. U"&create_list=true&url=[' + mp3s.join() + ']&api=SYNO.DownloadStation2.Task&method=create&version=2');
			mp3s = new Array();
		}
		// console.log(count);
	});
});