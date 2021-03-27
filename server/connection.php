<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    die();
}

error_reporting(0);

$servername = "cristiancarrino.com";
$username = "qmjxbitg_engim";
$password = "engimPiemonte";
$dbname = "qmjxbitg_netflix2";

// Create connection
$connection = new mysqli($servername, $username, $password, $dbname);
$connection->set_charset("utf8");

// Check connection
if ($connection->connect_error) {
    http_response_code(500);    
    die('Connection failed: ' . $connection->connect_error);
}

$headers = getallheaders();

?>