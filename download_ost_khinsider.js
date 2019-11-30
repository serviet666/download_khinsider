var urls = new Set();
$('#songlist .clickable-row a').each(function(idx) {
	urls.add($(this).attr('href'));
});
var urlsCount = urls.size;
var count = 0;
var mp3s = new Array();
urls.forEach(function(url) {
	$.get('https://downloads.khinsider.com' + url, function(data) {
		var url = $(data).find('audio')[0].src;
		console.log(mp3s);
		mp3s.push(url);
		if(++count % 50 == 0 || count == urlsCount) {
			console.log(mp3s.join(','));
			console.log('https://nabreus.fr2.quickconnect.to/webapi/entry.cgi?type=url&destination="home/Public/A classer/New Super Mario Bros. U"&create_list=true&url=[' + mp3s.join() + ']&api=SYNO.DownloadStation2.Task&method=create&version=2');
			mp3s = new Array();
		}
		console.log(count);
	});
});