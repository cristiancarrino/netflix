<?php

require_once '../connection.php';

// Get json post data
if (!$jsonPostdata = file_get_contents("php://input")) {
    http_response_code(400);    
    die('Missing Payload');
}

$credential = json_decode($jsonPostdata);

$sql = "SELECT *
    FROM user
    WHERE username = '" . $credential->username . "'
    AND password = '" . $credential->password . "'
";

$result = $connection->query($sql);
if (!$user = $result->fetch_object()) {
    http_response_code(401);    
    die('No user with this username/password');
}

$sql = "UPDATE user
    SET token = '" . bin2hex(random_bytes(8)) . "', last_login = CURRENT_TIMESTAMP
    WHERE username = '" . $credential->username . "'
    AND password = '" . $credential->password . "'
";

if (!$connection->query($sql)) {
    http_response_code(500);    
    die('Error generating token');
}

$sql = "SELECT *
    FROM user
    WHERE username = '" . $credential->username . "'
    AND password = '" . $credential->password . "'
";

$result = $connection->query($sql);
$connection->close();

if (!$user = $result->fetch_object()) {
    http_response_code(500);    
    die('Error retrieving user after token generation');
}

echo json_encode($user);

?>