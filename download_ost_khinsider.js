$(document).ready(() => {
	var urls = new Set();
	var songlist = $('.playlistDownloadSong a')
	songlist.each(idx => {
		urls.add($(songlist[idx]).attr('href'));
	});
	var title = $('h2')[0].textContent;
	var urlsCount = urls.size;
	var index = 0;
	var mp3s = new Array();
	urls.forEach((value, key, set) => {
		$.get('https://downloads.khinsider.com' + value, data => {
			var url = $(data).find('audio')[0].src;
			mp3s.push(url);
			if(set.size === ++index) {
				chrome.runtime.sendMessage({
					'songlist': mp3s,
					'title': title
				});
				mp3s = new Array();
			}
		});
	});
	$('.albumMassDownload a').attr('href', '#');
	$('.albumMassDownload a').on('click', e => {
		chrome.runtime.sendMessage({
			
		});
	});
});
