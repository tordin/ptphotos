var server = new function() {
	var $o = this;
	
	$o.getPageSettings = function(gallery_id, callback) {
            /*
		$.ajax({
			url         : environment.server_url + '/page_settings.php',
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
                */
               callback(true, {"likers_only":true});
	};
	
	$o.getPicturesCount = function(gallery_id, callback) {
		$.ajax({
			url         : 'http://77.233.34.14/api/PictureCount',
			data        : {
				method     : 'get',
				id : gallery_id
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
			url         : 'http://77.233.34.14/api/Albums',
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
            
                var now = new Date().getTime();
                var last_month = now - 3000000000;
                var startdate = formatDate(now);
                var endate = formatDate(last_month);
            
		$.ajax({
			url         : 'http://77.233.34.14/api/Albums',
			data        : {
				method     : 'get',
				gallery_id : gallery_id,
				offset     : offset ? offset : 0,
				length     : length ? length : 0,
                                startdate  : startdate,
                                endate     : endate
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
			url         : 'http://77.233.34.14/api/Pictures',
			data        : {
				method     : 'get',
				facebookpage_id : gallery_id,
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
			url         : 'http://77.233.34.14/api/Pictures',
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
			url         : environment.server_url + '/log_picture_view.php',
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
	
	$o.logUserAccess = function(gallery_id, user_facebook_id, user_name, user_email) {
		$.ajax({
			url         : environment.server_url + '/log_user_access.php',
			data        : {
				method           : 'get',
				gallery_id       : gallery_id,
				user_facebook_id : user_facebook_id,
				user_name        : user_name,
				user_email       : user_email
			},
			dataType    : 'jsonp',
			contentType : 'application/json'			
		});
	};
};
