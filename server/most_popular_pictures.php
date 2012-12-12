<?php
header('Content-Type: application/javascript');
?>
<?= $_GET['callback'] ?>({"success":true, "pictures":[
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
	{ "picture_id":"<?= $offset + $i + 1 ?>", "picture_url":"http://fortis4.com/ptphotos/server/images/pic<?= $i + 1 ?>.jpg", "thumb_url":"http://fortis4.com/ptphotos/server/images/pic<?= $i + 1 ?>.jpg", "date":"2012-08-23" }<?= ($i < $length - 1 ? ',' : '') ?>
<?php
}
?>
]})
