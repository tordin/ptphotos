var server = new function() {
	var $o = this;
	
	$o.getPageSettings = function(gallery_id, callback) {
		$.ajax({
			url         : environment.server_url + '/page_settings.jsp',
			data        : {
				method     : 'get',
				gallery_id : gallery_id
			},
			dataType    : 'jsonp',
			contentType : 'application/json',
			success     : function(response) {
				if (response && response.success) {
					callback(true, response);
				} else {
					callback(false);
				}
			},
			error       : function() {
				callback(false);	
			}			
		});
	};
	
	$o.getPicturesCount = function(gallery_id, callback) {
		$.ajax({
			url         : environment.server_url + '/pictures_count.jsp',
			data        : {
				method     : 'get',
				gallery_id : gallery_id
			},
			dataType    : 'jsonp',
			contentType : 'application/json',
			success     : function(response) {
				if (response && response.success) {
					callback(true, response);
				} else {
					callback(false);
				}
			},
			error       : function() {
				callback(false);	
			}			
		});
	};
	
	$o.getAlbums = function(gallery_id, offset, length, callback) {
		$.ajax({
			url         : environment.server_url + '/albums.jsp',
			data        : {
				method     : 'get',
				gallery_id : gallery_id,
				offset     : offset ? offset : 0,
				length     : length ? length : 0
			},
			dataType    : 'jsonp',
			contentType : 'application/json',
			success     : function(response) {
				if (response && response.success) {
					callback(true, response);
				} else {
					callback(false);
				}
			},
			error       : function() {
				callback(false);	
			}			
		});
	};
	
	$o.getLatestPictures = function(gallery_id, offset, length, callback) {
		$.ajax({
			url         : environment.server_url + '/latest_pictures.jsp',
			data        : {
				method     : 'get',
				gallery_id : gallery_id,
				offset     : offset ? offset : 0,
				length     : length ? length : 0
			},
			dataType    : 'jsonp',
			contentType : 'application/json',
			success     : function(response) {
				if (response && response.success) {
					callback(true, response);
				} else {
					callback(false);
				}
			},
			error       : function() {
				callback(false);	
			}			
		});
	};
	
	$o.getMostPopularPictures = function(gallery_id, offset, length, callback) {
		$.ajax({
			url         : environment.server_url + '/most_popular_pictures.jsp',
			data        : {
				method     : 'get',
				gallery_id : gallery_id,
				offset     : offset ? offset : 0,
				length     : length ? length : 0
			},
			dataType    : 'jsonp',
			contentType : 'application/json',
			success     : function(response) {
				if (response && response.success) {
					callback(true, response);
				} else {
					callback(false);
				}
			},
			error       : function() {
				callback(false);	
			}			
		});
	};
	
	$o.getAlbumPictures = function(gallery_id, album_id, offset, length, callback) {
		$.ajax({
			url         : environment.server_url + '/album_pictures.jsp',
			data        : {
				method     : 'get',
				gallery_id : gallery_id,
				album_id   : album_id,
				offset     : offset ? offset : 0,
				length     : length ? length : 0
			},
			dataType    : 'jsonp',
			contentType : 'application/json',
			success     : function(response) {
				if (response && response.success) {
					callback(true, response);
				} else {
					callback(false);
				}
			},
			error       : function() {
				callback(false);	
			}			
		});
	};
	
	$o.logPictureView = function(gallery_id, album_id, picture_id) {
		$.ajax({
			url         : environment.server_url + '/log_picture_view.jsp',
			data        : {
				method     : 'get',
				gallery_id : gallery_id,
				album_id   : album_id,
				picture_id : picture_id
			},
			dataType    : 'jsonp',
			contentType : 'application/json'			
		});
	};
};
