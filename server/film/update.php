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

;

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
    die('You can\'t edit the film. This was not created by you');
}

$sql = "UPDATE film SET
        title = " . ($film->title ? "'" . $film->title . "'" : "NULL") . ",
        description = " . ($film->description ? "'" . $film->description . "'" : "NULL") . ",
        plot = " . ($film->plot ? "'" . $film->plot . "'" : "NULL") . ",
        director = " . ($film->director ? "'" . $film->director . "'" : "NULL") . ",
        duration = " . ($film->duration ? "'" . $film->duration . "'" : "NULL") . ",
        release_year = " . ($film->release_year ?: 'NULL') . ",
        vote = " . ($film->stars ?: 'NULL') . ",
        tags = " . ($film->tags ? "'" . $film->tags . "'" : "NULL") . ",
        cover_url = " . ($film->cover_url ? "'" . $film->cover_url . "'" : "NULL") . "
        WHERE id = " . $film->id;

if (!$result = $connection->query($sql)) {
    http_response_code(500);
    die('Error executing the query: ' . preg_replace('/\R|\s{2,}/m', '', $sql) . ' : ' . $connection->error);
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

foreach ($film->actors as $actor) {
    $sql = "INSERT INTO film_actor (
        film_id,
        actor_id
    ) VALUES (
        " . $film->id . ",
        " . $actor->id . "
    )";

    if (!$result = $connection->query($sql)) {
        http_response_code(500);
        die('Error executing the query: ' . preg_replace('/\R|\s{2,}/m', '', $sql) . ' : ' . $connection->error);
    }
}

foreach ($film->genres as $genre) {
    $sql = "INSERT INTO film_genre (
        film_id,
        genre_id
    ) VALUES (
        " . $film->id . ",
        " . $genre->id . "
    )";

    if (!$result = $connection->query($sql)) {
        http_response_code(500);
        die('Error executing the query: ' . preg_replace('/\R|\s{2,}/m', '', $sql) . ' : ' . $connection->error);
    }
}

echo '{ "success": true, "message": "Film edited successfully" }';

$connection->close();

?>
