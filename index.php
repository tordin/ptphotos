<?php
	require_once('fb-sdk/facebook.php');

	$facebook = new Facebook(array(
		'appId' => '246939962100833',
		'secret' => 'cc3101fdddd7c955306ead5649aaec42'
	));

	$facebook_user_id = $facebook->getUser();
?>
<html>
    <head>
        <title>PT Photos</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        
        <link rel="stylesheet" href="css/style.css" />
        <!--<link rel="stylesheet" href="css/custom-sample.css" />-->

        <script src="//connect.facebook.net/en_US/all.js"></script>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script>

        <script src="script/tools.js"></script>
        <script src="script/facebook_connector.js"></script>
        <script src="script/server.js"></script>

        <script>
            var environment = {
                facebook_id : '449490838419909',
                server_url  : window.location.protocol + '//tordin.fortis4.com/ptphotos/server',
                namespace   : 'ptphotos'
            };
			
            environment.facebook_url = window.location.protocol + '//apps.facebook.com/' + environment.namespace;
		
            var page_id = 442893865746848, gallery_id = 1;
        </script>

        <script src="script/like_gate.js"></script>
        <script src="script/albums.js"></script>
        <script src="script/pictures.js"></script>

        <script>
            $(document).ready(function() {
                $('.tab').hide();
                $('#albums').show();
			
                $('.selector').click(function(event) {
                    events.fire('tab_selected', $(event.target).closest('.selector').attr('data-tab'));
                });
            });
            
            events.bind('user_identified', function(event, user_id) {
            	FB.api('/me', function(response) {
	            	server.logUserAccess(gallery_id, user_id, response.name, '');
				});
            });
		
            events.bind('content_released', function(event) {
                server.getPicturesCount(gallery_id, function(success, response) {
                    if (success) {
                        $('.selector[data-tab=albums] .count').html(response.album_count);
                        $('.selector[data-tab=latest_pictures] .count').html(response.latest_pictures_count);
					
                        loadAlbums();
                        createDefaultAlbums();
                    }
                });
            });
		
            events.bind('tab_selected', function(event, tab) {
            	$('#content_title, #album_pictures').empty();
            	
                $('.tab').hide();
                $('#' + tab).show();
                
                $('.selector').removeClass('selected');
                $('.selector[data-tab=' + tab + ']').addClass('selected');
            });
        </script>
    </head>
    <body>
        <div id="fb-root"></div>

        <div id="overlay" class="overlay hidden"></div>

        <div class="wrapper">

            <div id="like-gate" class="rect" style="display: none;">LIKE THIS PAGE TO GET ACCESS</div>

            <div id="content" style="display: none;">
                <div class="rect header-banner"></div>

                <div class="rect">
                    <div id="selectors">

                        <div class="selector selected" data-tab="albums">
                            <img src="img/icn-album.png" class="floatL" />
                            <div class="floatL">
                                <div class="count"></div>
                                <div class="label">Albums</div>
                            </div>
                            <div class="clearB"></div>
                        </div>

                        <div class="selector" data-tab="latest_pictures">
                            <img src="img/icn-pic.png" class="floatL" />
                            <div class="floatL">
                                <div class="count"></div>
                                <div class="label">Latest Pictures</div>
                            </div>
                            <div class="clearB"></div>
                        </div>

                        <div class="selector" data-tab="most_popular">
                            <img src="img/icn-pic2.png" class="floatL" />
                            <div class="floatL">
                                <div class="count">Most</div>
                                <div class="label">Popular</div>
                            </div>
                            <div class="clearB"></div>
                        </div>

                        <div class="clearB"></div>

                    </div>
                </div>

                <div class="rect">

                    <div id="content_title" class="tab-title"></div>

                    <div id="albums" class="tab"></div>
                    <div id="album_pictures" class="tab"></div>
                    <div id="latest_pictures" class="tab"></div>
                    <div id="most_popular" class="tab"></div>

                    <div class="clearB"></div>
                </div>

            </div>

        </div>

        <div id="picture_preview" class="rect">
            <img id="large_picture_src" src="" />
            <div class="img-control-wrapper">
                <div class="img-control previous"><img src="img/prev.png" /></div>
                <div class="img-control next"><img src="img/next.png" /></div>
                <div class="clearB"></div>
            </div>
            <div class="img-close-preview">
                <img src="img/close.png" />
            </div>
        </div>

        <div class="hidden">

            <div id="tpl_album_item">
                <div id="album_item_ALBUM_ID" class="album-item">
                    IMG_CODE
                    <div class="title">ALBUM_TITLE</div>
                    <div class="label">ALBUM_DATE - ALBUM_PICTURE_COUNT photos</div>
                </div>
            </div>

            <div id="tpl_picture_item">
                <div id="picture_item_PICTURE_ID" class="img-item">
                    IMG_CODE
                </div>
            </div>

            <div id="tpl_content_title">
                <div class="title">ALBUM_TITLE</div>
                <div class="label">ALBUM_DATE - ALBUM_PICTURE_COUNT photos</div>
            </div>

        </div>
    </body>
</html>