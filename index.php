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

$shared_picture = false;

if (isset($_GET['picture_id'])) {

    $shared_picture = true;

    $picture_id = $_GET['picture_id'];
    $album_id = $_GET['album_id'];

    //getting picture url from id
    $response = file_get_contents('http://77.233.34.14/api/Pictures/' . $picture_id);
    $json_response = json_decode($response);
    $picture_url = $json_response->picture_url;

    //getting page info
    $page_info = $facebook->api($_GET['page_id']);
    $tab_app_url = $page_info['link'] . '/app_' . $app_id;
    $title = $page_info['name'];
}
?>
<html>
    <head>
        <title>PT Photos</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

        <?php
        if ($shared_picture) {
            ?>
            <meta property="og:title" content="<?= $title ?>" />
            <meta property="og:image" content="<?= $picture_url ?>" />
            <?php
        }
        ?>

        <?php
        if (isset($_SERVER['HTTP_USER_AGENT']) && (strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE') !== false)) {
            ?>
            <meta http-equiv="X-UA-Compatible" content="IE=100" > <!-- IE9 mode -->
            <script type="text/javascript" src="script/external/ie.js"></script>
            <?php
        }
        ?>

        <link rel="stylesheet" href="css/style.css" />
        <!--<link rel="stylesheet" href="css/custom-sample.css" />-->

        <script src="//connect.facebook.net/en_US/all.js"></script>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script>

        <script src="script/tools.js"></script>
        <script src="script/facebook_connector.js"></script>
        <script src="script/server.js"></script>

        <?php
        if ($shared_picture) {
            ?>
            <script>
                window.location.href = '<?= $tab_app_url ?>';
            </script>
            <?php
        }
        ?>

        <script>
            var environment = {
                facebook_id : '449490838419909',
                server_url  : window.location.protocol + '//fortis4.com/ptphotos/server',
                namespace   : 'ptphotos'
            };
			
            environment.facebook_url = window.location.protocol + '//apps.facebook.com/' + environment.namespace;
		
            var gallery_id = 'Test',
            liked = <?= $liked_page ? 'true' : 'false' ?>,
            page_id = '<?= $page_id ?>';
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
            <img id="large_picture_src" src="img/pixel.png" />

            <div class="img-control-wrapper">
                <div class="img-control previous"><img src="img/prev.png" /></div>
                <div class="img-control next"><img src="img/next.png" /></div>

                <div class="clearB"></div>
            </div>

            <div class="facebookLike"></div>

            <div class="facebookComments"></div>

            <div class="img-close-preview">
                <img src="img/close.png" />
            </div>
        </div>
    </body>
</html>
