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
	).click(function() {
		events.fire('tab_selected', 'album_pictures');

		new Album({
			target   : 'album_pictures',
			album_id : album.album_id,
			load     : function(offset, length, callback) {
				server.getAlbumPictures(gallery_id, album.album_id, offset, length, function(success, response) {
					if (success) {
						callback(response.pictures);
					}
				});
			} 
		});
	});
	
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