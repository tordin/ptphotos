function Album(settings) {
	var $t = this;
	
	function renderPicture(picture) {
		var html = $('<div/>');
		
		html.addClass('picture')
		.append(
			$('<img/>')
				.attr('src', picture.thumb_url)
		);
		
		return html;
	}
	
	var last_picture = 0,
		pictures_per_page = 5; 

	function loadPictures() {
		settings.load(last_picture, pictures_per_page, function(pictures) {
			pictures.forEach(function(picture) {
				$('#' + settings.target + ' .load_more').before(renderPicture(picture));
			});
		
			last_picture += pictures_per_page;
		});
	}

	$('#' + settings.target).empty()
	.append(
		$('<div/>')
			.addClass('load_more')
			.append(
				$('<a/>')
					.html('Load more')
					.click(loadPictures)
			)
	);
	
	loadPictures();
}

function createDefaultAlbums() {
	new Album({
		target : 'latest_pictures',
		load : function(offset, length, callback) {
			server.getLatestPictures(gallery_id, offset, length, function(success, response) {
				if (success) {
					callback(response.pictures);
				}
			});
		} 
	});

	new Album({
		target : 'most_popular',
		load : function(offset, length, callback) {
			server.getMostPopularPictures(gallery_id, offset, length, function(success, response) {
				if (success) {
					callback(response.pictures);
				}
			});
		} 
	});
}