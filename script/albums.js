var albums_offset = 0, albums_per_page = 20;

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
			.html(parseServerDate(album.date) + ' - ' + album.picture_count + ' photos')
	).click(function() {
		events.fire('tab_selected', 'album_pictures');
		
		$('#content_title')
			.empty()
			.append(
				$('<div/>')
		            .addClass('title')
					.html(album.title)
			).append(
				$('<div/>')
		            .addClass('label')
					.html(parseServerDate(album.date) + ' - ' + album.picture_count + ' photos')
			);

		new Album({
			target   : 'album_pictures',
			album_id : album.album_id,
			load     : function(offset, length, callback) {
				server.getAlbumPictures(gallery_id, album.album_id, offset, length, function(success, response) {
					if (success) {
						callback(response); //response.pictures
					}
				});
			} 
		});
	});
	
	return html;
}

function loadAlbums(callback) {
	server.getAlbums(gallery_id, albums_offset, albums_per_page, function(success, response) {
		if (success) {
			response.forEach(function(album) { //response.albums.forEach
				$('#albums .load_more').before(renderAlbum(album));
			});
			
			if (callback) {
				callback();
			}
		}
	});
}

function loadFirstAlbums() {
    $('#albums').empty().append(
        $('<div/>')
        .addClass('load_more')
        .append(
            $('<a/>')
            .addClass('rect title')
            .html('Load more')
            .click(function(event) {
            	albums_offset += albums_per_page;
            	
                var load_more = $(event.target).closest('.load_more');
                load_more.children('img').show();
                load_more.children('a').hide();
						
                loadAlbums(function() {
                    load_more.children('img').hide();
                    load_more.children('a').show();
                });
            })
        )
        .append(
            $('<img/>')
            .addClass('rect')
            .attr('src', 'img/ajax-loader.gif')
            .hide()
        )
    );
    
    loadAlbums();
}
