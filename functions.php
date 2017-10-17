<?php


include_once 'lib/theme-enqueue.php';
include_once 'lib/theme-support.php';
include_once 'lib/Custome-endpoints.php';

$Theme_Support = new Theme_Support();
$Theme_Support->init();

$Theme_Enqueue = new Theme_Enqueue();
$Theme_Enqueue->init();

