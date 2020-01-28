$(document).ready(() => {
	let urls = new Set();
	let songlist = $('.playlistDownloadSong a')
	songlist.each(idx => {
		urls.add($(songlist[idx]).attr('href'));
	});
	let title = $('h2')[0].textContent;
	let urlsCount = urls.size;
	let mp3s = new Array();
	$('.albumMassDownload a').attr('href', '#');
	$('.albumMassDownload a').on('click', e => {
		urls.forEach((value, key, set) => {
			$.get('https://downloads.khinsider.com' + value, data => {
				let url = $(data).find('audio')[0].src;
				if(!mp3s.some(el => url === el) && set.size === mp3s.push(url)) {
					chrome.runtime.sendMessage({
						'type': all,
						'songlist': mp3s,
						'title': title
					});
					mp3s = new Array();
				}
			});
		});
	});
	$('.playlistDownloadSong a').on('click', e => {
		console.log(e.currentTarget.href);
		$.get(e.currentTarget.href, data => {
			chrome.runtime.sendMessage({
				'type': 'song',
				'song': $(data).find('audio')[0].src,
				'title': title
			});
		});
		return false;
	});
});
