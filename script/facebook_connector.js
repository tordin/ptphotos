var facebook_connector = new function() {
    var $o = this;
        
    $o.login = function() {
        var waiter = new Waiter(1, function(all_done, box) {
            if (!all_done || box['status'] != 'connected') {
                events.fire('user_is_not_logged_in');
            }
        }, 10000);
		
        FB.getLoginStatus(function(response) {
            waiter.go('status', response.status);
	
            if (response.status == 'connected') {
                events.fire('user_identified', FB.getUserID());
            } else {
                FB.login(function(response) {
                    if (response.status == 'connected') {
                        events.fire('user_identified', FB.getUserID());
                                                
                        //see like gate
                        $('#install-app').hide();
                        $('#like-gate').setVisible(!liked);
                        $('#content').setVisible(liked);
                        events.fire('content_released');
                                                
                    //window.location.reload();
                    } else {
                        $('#install-app').show();
                    }
                },{
                    scope: 'email'
                });
            }
        });
    };
	
    $(document).ready(function() {
        FB.init({
            'appId'                : environment.facebook_id,
            'cookie'               : true,
            'xfbml'                : true,
            'frictionlessRequests' : true
        });
		
        $('#install-app a').click(function() {
            facebook_connector.login();
        });
                
        $o.login();
		
    });
};