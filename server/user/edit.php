<?php

require_once '../connection.php';

// Get json post data
$jsonPostdata = file_get_contents("php://input");

if (!$jsonPostdata) {
    http_response_code(400);
    die('Missing Payload');
}

$credential = json_decode($jsonPostdata);

$sql = "
    SELECT *
    FROM user
    WHERE username = '" . $credential->username . "'
    AND password = '" . $credential->password . "'
";

if (!$connection->query($sql)->fetch_object()) {
    http_response_code(404);
    die('No user with this username and password was found');
}

$fields = [];

if ($credential->newFirstname) {
    $fields[] = "firstname = '" . $credential->newFirstname . "'";
}

if ($credential->newLastname) {
    $fields[] = "lastname = '" . $credential->newLastname . "'";
}

if ($credential->newUsername) {
    $fields[] = "username = '" . $credential->newUsername . "'";
}

if ($credential->newPassword) {
    $fields[] = "password = '" . $credential->newPassword . "'";
}

if ($credential->newBirthdate) {
    $fields[] = "birthdate = '" . $credential->newBirthdate . "'";
}

if (!count($fields)) {
    http_response_code(400);
    die('Missing user field(s) to edit');
}

$sql = "
    UPDATE user SET
    " . implode(", ", $fields) . "
    WHERE username = '" . $credential->username . "'
    AND password = '" . $credential->password . "'
";

if (!$connection->query($sql)) {
    http_response_code(500);
    die('Error executing the query: ' . preg_replace('/\R|\s{2,}/m', '', $sql) . ' : ' . $connection->error);
}

$connection->close();

die('{ "success": true, "message": "User edited succesfully" }');
?>