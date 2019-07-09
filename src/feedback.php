<?php
$data=json_encode($_POST);
echo $data;
@mkdir($dir);
$file = ($dir.'/feedback_'.time().'_'.uniqid());