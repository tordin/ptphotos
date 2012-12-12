<?php
header('Content-Type: application/javascript');
?>
<?= $_GET['callback'] ?>({"success":true, "album_count":3, "latest_pictures_count":80})