var waiter = new Waiter(2, function(all_done, box) {
	if (all_done && box['user_id']) {
		var likeGate = function(active) {
			$('#like-gate').setVisible(active);
			$('#content').setVisible(!active);
			
			events.fire('content_released');
		};
		
		if (liked) {
			likeGate(false);
			
		} else if (!box['settings'] || !box['settings'].likers_only) {
			likeGate(false);
			
		} else {
			FB.api({
			    method  : 'pages.isFan',
			    page_id : page_id
			}, function(response) {
				likeGate(!response);
		    });			
		}
	}
}, 3000);

events.bind('user_identified', function(event, user_id) {
	waiter.go('user_id', user_id);
});
	
server.getPageSettings(gallery_id, function(success, settings) {
	waiter.go('settings', settings);
});
