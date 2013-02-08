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
    pictures_per_page = 15,
    pictures = [],
    current_picture = -1;
		
    function navigate(delta) {
        if (current_picture + delta >= 0 && current_picture + delta < last_loaded_picture) {
            open(current_picture + delta);			
        }
    }
	
    function open(i) {
        current_picture = i;

        openPicture(pictures[i], settings.album_id);
    
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
	
    function loadPictures(callback) {
        settings.load(last_loaded_picture, pictures_per_page, function(loaded_pictures) {
            pictures = pictures.concat(loaded_pictures);
			
            loaded_pictures.forEach(function(picture, k) {
                $('#' + settings.target + ' .load_more').before(renderPicture(picture, last_loaded_picture + k));
            });
		
            last_loaded_picture = pictures.length;
			
            if (callback) {
                callback();
            }
        });
    }

    $('#' + settings.target).empty().append(
        $('<div/>')
        .addClass('load_more')
        .append(
            $('<a/>')
            .addClass('rect title')
            .html('Load more')
            .click(function(event) {
                var load_more = $(event.target).closest('.load_more');
                load_more.children('img').show();
                load_more.children('a').hide();
						
                loadPictures(function() {
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
    
    FB.Canvas.scrollTo(0);
	
    loadPictures();
}

function openPicture(picture, album_id) {
    $('#picture_preview .img-spinner').show();
    
    $('#large_picture_src')
        .attr('src', picture.picture_url)
        .unbind('load')
        .load(function() {
            $('#picture_preview .img-spinner').hide();
        });
    
    var pic_url = 'http://fortis4.com/ptphotos/share.php?page_id=' + page_id + '&album_id=' + album_id + '&picture_id=' + picture.picture_id;

    FB.XFBML.parse($('#picture_preview .facebookLike').html(
        '<div class="fb-like" data-href="' + pic_url + '" data-send="false" data-layout="button_count" data-width="720" data-show-faces="false"></div>'
    )[0]);
    
    FB.XFBML.parse($('#picture_preview .facebookComments').html(
        '<div class="fb-comments" data-href="' + pic_url + '" data-width="720" data-num-posts="10"></div>'
    )[0]);
    
    $('.img-control').unbind('click').toggleClass('invisible', true);
    
    $('#overlay').fadeIn('fast');

    FB.Canvas.getPageInfo(function(info) {
        var scroll_top = info.scrollTop;
                
        $('#picture_preview').show().animate({
            'top': scroll_top + 'px'
        }, 300);
    });
 
    server.logPictureView(gallery_id, album_id, picture.picture_id);
}

function createDefaultAlbums() {
    new Album({
        target   : 'latest_pictures',
        album_id : 'latest_pictures',
        load     : function(offset, length, callback) {
            server.getLatestPictures(gallery_id, offset, length, function(success, response) {
                if (success) {
                    callback(response); //response.pictures
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
                    callback(response); //response.pictures
                }
            });
        } 
    });
}