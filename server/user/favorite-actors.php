<?php

require_once '../connection.php';

// Get json post data
$jsonPostdata = file_get_contents("php://input");

if (!$jsonPostdata) {
    http_response_code(400);   
    die('Missing Payload');
}

$sql = "SELECT *
    FROM user
    WHERE token = '" . (isset($headers['Authorization']) ? $headers['Authorization'] : $headers['authorization']) . "'
";

$user = $connection->query($sql)->fetch_object();

if (!$user) {
    http_response_code(401);
    die('No user with this token was found. Try to generate new token by login again');
}

$favorite_actors = json_decode($jsonPostdata);

$sql = "UPDATE user SET
        favorite_actors = " . ($favorite_actors->ids ? "'" . $favorite_actors->ids . "'" : "NULL") . "
        WHERE token = '" . (isset($headers['Authorization']) ? $headers['Authorization'] : $headers['authorization']) . "'";

$result = $connection->query($sql);

if (!$result) {
    http_response_code(500);
    die('Error executing the query: ' . preg_replace('/\R|\s{2,}/m', '', $sql) . ' : ' . $connection->error);
}

echo '{ "success": true, "message": "Favorite actors edited successfully" }';

$connection->close();

?>