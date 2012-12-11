function closeImage() {
    $('#picture_preview').animate({
        'top' : '-500px'
    }, 200, function() {
        $('#picture_preview').hide();
    });
 
    $('#overlay').fadeOut('fast');
}

function Album(settings) {
	var $t = this;
	
	var last_loaded_picture = 0,
		pictures_per_page = 5,
		pictures = [],
		current_picture = -1;
		
	function navigate(delta) {
		if (current_picture + delta >= 0 && current_picture + delta < last_loaded_picture) {
			open(current_picture + delta);			
		}
	}
	
	function open(i) {
		current_picture = i;

		$('#large_picture_src').attr('src', pictures[i].picture_url);
		
		$('.img-control').unbind('click');
		
		if (current_picture > 0) {
			$('.img-control.previous').toggleClass('invisible', false).click(function() {
				navigate(-1);
			});
		} else {
			$('.img-control.previous').toggleClass('invisible', true);
		}
		
		if (current_picture < last_loaded_picture - 1) {
			$('.img-control.next').toggleClass('invisible', false).click(function() {
				navigate(1);
			});
		} else {
			$('.img-control.next').toggleClass('invisible', true);
		}
		
	    $('#overlay').fadeIn('fast');
	 
	    $('#picture_preview').show().animate({
	        'top': '-15px'
	    }, 300);
	 
	 	server.logPictureView(gallery_id, settings.album_id, pictures[i].picture_id);
	}

	function renderPicture(picture, i) {
		var html = $('<div/>');
		
		html.addClass('picture')
		.append(
			$('<img/>')
				.attr('src', picture.thumb_url)
		).click(function() {
			open(i);
		});
		
		return html;
	}
	
	function loadPictures() {
		settings.load(last_loaded_picture, pictures_per_page, function(loaded_pictures) {
			var i = pictures.length;
			pictures = pictures.concat(loaded_pictures);
			
			loaded_pictures.forEach(function(picture, k) {
				$('#' + settings.target + ' .load_more').before(renderPicture(picture, i + k));
			});
		
			last_loaded_picture += pictures_per_page;
		});
	}

	$('#' + settings.target).empty().append(
		$('<div/>')
			.addClass('load_more')
			.append(
				$('<a/>')
                                        .addClass('rect title')
					.html('Load more')
					.click(loadPictures)
			)
	);
	
	$('.img-close-preview, #overlay')
		.unbind('click')
		.click(function() {
			closeImage();
		});

	$(document)
		.unbind('keydown')
		.keydown(function(event) {
			if (event.keyCode == 37) {
				navigate(-1);
				
			} else if (event.keyCode == 39) {
				navigate(1);
				
			} else if (event.keyCode == 27) {
				closeImage();
			}
		});
	
	loadPictures();
}

function createDefaultAlbums() {
	new Album({
		target   : 'latest_pictures',
		album_id : 'latest_pictures',
		load     : function(offset, length, callback) {
			server.getLatestPictures(gallery_id, offset, length, function(success, response) {
				if (success) {
					callback(response.pictures);
				}
			});
		} 
	});

	new Album({
		target   : 'most_popular',
		album_id : 'most_popular',
		load     : function(offset, length, callback) {
			server.getMostPopularPictures(gallery_id, offset, length, function(success, response) {
				if (success) {
					callback(response.pictures);
				}
			});
		} 
	});
}