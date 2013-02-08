<?php
require_once('fb-sdk/facebook.php');
$app_id = '449490838419909';

$facebook = new Facebook(array(
            'appId' => $app_id,
            'secret' => '305b056f6396a5c0839281fdedd4a279'
        ));

$signed_request = $facebook->getSignedRequest();

$page_id = $signed_request["page"]["id"]; //undefined when commented/liked
$liked_page = $signed_request["page"]["liked"];
$app_data = $signed_request["app_data"];
?>
<html>
    <head>
        <title>PT Photos</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

        <?php
        if (isset($_SERVER['HTTP_USER_AGENT']) && (strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE') !== false)) {
            ?>
            <meta http-equiv="X-UA-Compatible" content="IE=100" > <!-- IE9 mode -->
            <script type="text/javascript" src="script/external/ie.js"></script>
            <?php
        }
        ?>

        <link rel="stylesheet" href="css/style.css" />
        <link rel="stylesheet" href="css/custom-<?= $page_id ?>.css" />

        <script src="//connect.facebook.net/en_US/all.js"></script>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script>

        <script src="script/tools.js"></script>
        <script src="script/facebook_connector.js"></script>
        <script src="script/server.js"></script>

        <script>
            var environment = {
                facebook_id : '<?= $app_id ?>',
                server_url  : window.location.protocol + '//77.233.34.14/api', //fortis4.com/ptphotos/server',
                namespace   : 'ptphotos'
            };
			
            environment.facebook_url = window.location.protocol + '//apps.facebook.com/' + environment.namespace;
		
            var gallery_id = 'Test',
            liked = <?= $liked_page ? 'true' : 'false' ?>,
            page_id = '<?= $page_id ?>',
            app_data = '<?= $app_data ?>';
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
                
                FB.Canvas.setAutoGrow();
            });

            function parseAppData() {
                if (!app_data) {
                    return;
                }
                
                var data = JSON.parse(app_data);
                
                //album?
                
                server.getPicture(gallery_id, data.picture_id, function(success, response) {
                    if (success) {
                        openPicture(response, data.album_id);
                    };
                });
            }
            
            events.bind('user_identified', function(event, user_id) {
                FB.api('/me', function(response) {
                    server.logUserAccess(gallery_id, user_id, response.name, response.email);
                });
            });
		
            events.bind('content_released', function(event) {
                server.getPicturesCount(gallery_id, function(success, response) {
                    if (success) {
                        $('.selector[data-tab=albums] .count').html(response.album_count);
                        $('.selector[data-tab=latest_pictures] .count').html(response.latest_pictures_count);
					
                        loadFirstAlbums();
                        createDefaultAlbums();
                        
                        parseAppData();
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

            <div id="like-gate" class="rect text-center" style="display: none;">
                <img src="img/like.png" />
                <br/><br/>
                Please click the "Like" button at the top of the page to access this gallery.
            </div>

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

        <div id="picture_preview" class="rect text-center">

            <div class="img-close-preview">
                <img src="img/close.png" />
            </div>

            <div id="large_picture_controls" class="img-control-wrapper">
                <div class="img-control previous"><img src="img/prev.png" /></div>
                <div class="img-control next"><img src="img/next.png" /></div>
                <div class="clearB"></div>
            </div>

            <div class="img-spinner"><img src="img/spinner.gif" /></div>

            <img id="large_picture_src" src="img/pixel.png" />

            <div class="facebookLike"></div>

            <div class="facebookComments"></div>

        </div>
    </body>
</html>
