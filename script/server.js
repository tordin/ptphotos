var server = new function() {
	var $o = this;
	
	$o.getPageSettings = function(gallery_id, callback) {
            
		$.ajax({
			url         : environment.server_url + '/Page/' + gallery_id,
			data        : {
				gallery_id : gallery_id
			},
			dataType    : 'jsonp',
			contentType : 'application/json',
			success     : function(response) {
				if (response) { //if (response && response.success) {
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
			url         : environment.server_url + '/PictureCount',
			data        : {
				id : gallery_id
			},
			dataType    : 'jsonp',
			contentType : 'application/json',
			success     : function(response) {
				if (response) { //if (response && response.success)
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
			url         : environment.server_url + '/Albums',
			data        : {
				galleryId : gallery_id,
				offset     : offset ? offset : 0,
				length     : length ? length : 0
			},
			dataType    : 'jsonp',
			contentType : 'application/json',
			success     : function(response) {
				if (response) { //if (response && response.success)
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
            
                var now = new Date().getTime();
                var last_month = now - 3000000000;
                var startdate = formatDate(now);
                var endate = formatDate(last_month);
            
		$.ajax({
			url         : environment.server_url + '/Pictures',
			data        : {
                                offset     : offset ? offset : 0,
				length     : length ? length : 0,
				facebookpageId : gallery_id
			},
			dataType    : 'jsonp',
			contentType : 'application/json',
			success     : function(response) {
				if (response) { //if (response && response.success)
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
			url         : environment.server_url + '/Pictures',
			data        : {
				facebookpageId : gallery_id,
                                length     : length ? length : 0,
				offset     : offset ? offset : 0,
				mostpopular : true
			},
			dataType    : 'jsonp',
			contentType : 'application/json',
			success     : function(response) {
				if (response) { //if (response && response.success)
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
			url         : environment.server_url + '/Pictures',
			data        : {
				gallery_id : gallery_id,
				albumId   : album_id,
				offset     : offset ? offset : 0,
				length     : length ? length : 0
			},
			dataType    : 'jsonp',
			contentType : 'application/json',
			success     : function(response) {
				if (response) { //if (response && response.success)
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
	
	$o.getPicture = function(gallery_id, picture_id, callback) {
		$.ajax({
			url         : environment.server_url + '/Pictures/' + picture_id,
			dataType    : 'jsonp',
			contentType : 'application/json',
			success     : function(response) {
				if (response) { //if (response && response.success)
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
                        type        : 'POST',
			url         : environment.server_url + '/Log',
			data        : {
				FaceBookPageId : gallery_id,
                                UserFacebookId : FB.getUserID(),
				AlbumID   : album_id,
				PictureId : picture_id
			},
			dataType    : 'jsonp',
			contentType : 'application/json'			
		});
	};
	
	$o.logUserAccess = function(gallery_id, user_facebook_id, user_name, user_email) {
		$.ajax({
                        type        : 'POST',
			url         : environment.server_url + '/Log',
			data        : {
				FaceBookPageId       : gallery_id,
				UserFacebookId : user_facebook_id,
				UserName        : user_name,
				Email       : user_email
			},
			dataType    : 'jsonp',
			contentType : 'application/json'			
		});
	};
};
