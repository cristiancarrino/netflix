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

$film = json_decode($jsonPostdata);

$sql = "SELECT *
    FROM film
    WHERE id = " . $film->id;

if (!$connection->query($sql)->fetch_object()) {
    http_response_code(400);
    die('No film with this id was found');
}

$sql = "SELECT *
    FROM film
    WHERE id = " . $film->id . "
    AND created_by = " . $user->id;

if (!$connection->query($sql)->fetch_object()) {
    http_response_code(401);
    die('You can\'t remove the film. This was not created by you');
}

$sql = "DELETE FROM film_actor
    WHERE film_id = " . $film->id;

if (!$result = $connection->query($sql)) {
    http_response_code(500);
    die('Error executing the query: ' . preg_replace('/\R|\s{2,}/m', '', $sql) . ' : ' . $connection->error);
}

$sql = "DELETE FROM film_genre
    WHERE film_id = " . $film->id;

if (!$result = $connection->query($sql)) {
    http_response_code(500);
    die('Error executing the query: ' . preg_replace('/\R|\s{2,}/m', '', $sql) . ' : ' . $connection->error);
}

$sql = "DELETE FROM film
    WHERE id = " . $film->id;

if (!$result = $connection->query($sql)) {
    http_response_code(500);
    die('Error executing the query: ' . preg_replace('/\R|\s{2,}/m', '', $sql) . ' : ' . $connection->error);
}

echo '{ "success": true, "message": "Film removed successfully "}';

$connection->close();

?>