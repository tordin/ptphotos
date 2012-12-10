function renderPicture(picture) {
	var html = $('<div/>');
	
	html.addClass('picture')
	.append(
		$('<img/>')
			.attr('src', picture.thumb_url)
	);
	
	return html;
}

function loadLatestPictures() {
	server.getLatestPictures(gallery_id, 0, 20, function(success, response) {
		if (success) {
			response.pictures.forEach(function(picture) {
				$('#latest_pictures').append(renderPicture(picture));
			});
		}
	});
}

function loadMostPopularPictures() {
	server.getMostPopularPictures(gallery_id, 0, 20, function(success, response) {
		if (success) {
			response.pictures.forEach(function(picture) {
				$('#most_popular').append(renderPicture(picture));
			});
		}
	});
}
