chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	let folderName = request.title.replace(/\:|\\|\/|\*|\?|\"|\<|\>|\||\~/gi, '_').trim();
	if(request.type === 'all') {
		request.songlist.forEach(idx => {
			let filename = formatFileName(folderName, idx);
			console.log(idx);
			console.log(filename);
			chrome.downloads.download({
				'url': idx,
				'filename': filename
			});
		});
	} else if(request.type === 'song') {
		let filename = formatFileName(folderName, request.song);
		console.log(request.song);
		console.log(filename);
		chrome.downloads.download({
			'url': request.song,
			'filename': filename
		});
	}
});

var formatFileName = (folderName, filename) => {
	return 'OST/' + folderName + '/' + decodeURI(decodeURI(filename.substring(filename.lastIndexOf('/') + 1))).replace('~','_').trim();
};