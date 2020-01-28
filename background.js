chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if(request.type === 'all') {
		request.songlist.forEach(idx => {
			let filename = decodeURI(decodeURI(idx.substring(idx.lastIndexOf('/') + 1)));
			console.log(idx);
			console.log(filename);
			chrome.downloads.download({
				'url': idx,
				'filename': request.title + '/' + filename
			});
		});
	} else if(request.type === 'song') {
		let filename = decodeURI(decodeURI(request.song.substring(request.song.lastIndexOf('/') + 1)));
		chrome.downloads.download({
			'url': song,
			'filename': request.title + '/' + filename
		});
	}
});