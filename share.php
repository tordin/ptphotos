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

$picture_id = $_GET['picture_id'];
$album_id = $_GET['album_id'];

//getting picture url from id
$response = file_get_contents('http://77.233.34.14/api/Pictures/' . $picture_id);
$json_response = json_decode($response);
$picture_url = $json_response->picture_url;

//getting page info
$page_info = $facebook->api($_GET['page_id']);
$tab_app_url = $page_info['link'] . '?v=app_' . $app_id . '&app_data={album_id:' . $album_id . ',picture_id:' . $picture_id . '}';
$title = $page_info['name'];
?>
<meta property="og:title" content="<?= $title ?>" />
<meta property="og:image" content="<?= $picture_url ?>" />

<script>
    window.location.href = '<?= $tab_app_url ?>';
</script>