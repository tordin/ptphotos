<?php
header('Content-Type: application/javascript');
?>
<?= $_GET['callback'] ?>({"success":true, "likers_only":true})