<?php
header('Content-Type: application/javascript');
?>
<?= $_GET['callback'] ?>({"success":true, "albums":[
<?php
$offset = 0;
$length = 20;

$offsetParameter = $_GET['offset'];
$lengthParameter = $_GET['length'];

if (isset($offsetParameter)) {
	$offset = $offsetParameter;
}

if (isset($lengthParameter)) {
	$length = $lengthParameter;
}

for ($i = 0; $i < $length; $i++) {
?>
	{ "album_id":"<?= $offset + $i + 1 ?>", "cover_picture_thumb_url":"http://fortis4.com/ptphotos/server/images/pic<?= $i + 1 ?>.jpg", "title":"Album <?= $i + 1 ?>", date:"2012-08-23", picture_count:15 }<?= ($i < $length - 1 ? ',' : '') ?>
<?php
}
?>
]})