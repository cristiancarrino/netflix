<?php

require_once '../connection.php';

// Get json post data
if (!$jsonPostdata = file_get_contents("php://input")) {
    http_response_code(400);
    die('Missing Payload');
}

$sql = "SELECT *
    FROM user
    WHERE token = '" . ($headers['Authorization'] ?: $headers['authorization']) . "'
";

if (!$user = $connection->query($sql)->fetch_object()) {
    http_response_code(401);
    die('No user with this token was found. Try to generate new token by login again');
}

$info = json_decode($jsonPostdata);

$fields = [];

if ($info->username) {
    $fields[] = "username = '" . $info->username . "'";
}

if ($info->password) {
    $fields[] = "password = '" . $info->password . "'";
}

if ($info->firstname) {
    $fields[] = "firstname = '" . $info->firstname . "'";
}

if ($info->lastname) {
    $fields[] = "lastname = '" . $info->lastname . "'";
}

if ($info->photo_url) {
    $fields[] = "photo_url = '" . $info->photo_url . "'";
}

if ($info->birthdate) {
    $fields[] = "birthdate = '" . $info->birthdate . "'";
}

if (!count($fields)) {
    http_response_code(400);
    die('Missing user field(s) to edit');
}

$sql = "
    UPDATE user SET
    " . implode(", ", $fields) . "
    WHERE token = '" . $user->token . "'
";

if (!$connection->query($sql)) {
    http_response_code(500);
    die('Error executing the query: ' . preg_replace('/\R|\s{2,}/m', '', $sql) . ' : ' . $connection->error);
}

$connection->close();

die('{ "success": true, "message": "User edited succesfully" }');
?>