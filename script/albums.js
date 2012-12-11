function renderAlbum(album) {
	var html = $('<div/>');
	
	html.addClass('album')
	.append(
		$('<img/>')
			.attr('src', album.cover_picture_thumb_url)
	).append(
		$('<div/>')
                        .addClass('title')
			.html(album.title)
	).append(
		$('<div/>')
                        .addClass('label')
			.html(album.date + ' - ' + album.picture_count + ' photos')
	);
	
	return html;
}

function loadAlbums() {
	server.getAlbums(gallery_id, 0, 20, function(success, response) {
		if (success) {
			response.albums.forEach(function(album) {
				$('#albums').append(renderAlbum(album));
			});
		}
	});
}