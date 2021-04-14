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
    WHERE token = '" . ($headers['Authorization'] ?: $headers['authorization']) . "'
";

$user = $connection->query($sql)->fetch_object();

if (!$user) {
    http_response_code(401);
    die('Token non trovato. Prova a rigenerare il token facendo login');
}

$film = json_decode($jsonPostdata);

$sql = "
    INSERT INTO film (
        id,
        title,
        description,
        plot,
        director,
        duration,
        release_year,
        vote,
        tags,
        cover_url,
        created_by
    ) VALUES (
        " . ($film->id ?: 'NULL') . ",
        " . ($film->title ? "'" . addslashes($film->title) . "'" : "NULL") . ",
        " . ($film->description ? "'" . addslashes($film->description) . "'" : "NULL") . ",
        " . ($film->plot ? "'" . addslashes($film->plot) . "'" : "NULL") . ",
        " . ($film->director ? "'" . addslashes($film->director) . "'" : "NULL") . ",
        " . ($film->duration ? "'" . addslashes($film->duration) . "'" : "NULL") . ",
        " . ($film->release_year ?: 'NULL') . ",
        " . ($film->vote ?: 'NULL') . ",
        " . ($film->tags ? "'" . addslashes($film->tags) . "'" : "NULL") . ",
        " . ($film->cover_url ? "'" . addslashes($film->cover_url) . "'" : "NULL") . ",
        " . $user->id . "
    )
";

$result = $connection->query($sql);

if (!$result) {
    http_response_code(500);
    die('Error executing the query: ' . preg_replace('/\R|\s{2,}/m', '', $sql) . ' : ' . $connection->error);
}

$film->id = $connection->insert_id;

foreach ($film->actors as $actor) {
    $sql = "INSERT INTO film_actor (
        film_id,
        actor_id
    ) VALUES (
        " . $film->id . ",
        " . $actor->id . "
    )";

    $result = $connection->query($sql);
    if (!$result) {
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

    $result = $connection->query($sql);
    if (!$result) {
        http_response_code(500);
        die('Error executing the query: ' . preg_replace('/\R|\s{2,}/m', '', $sql) . ' : ' . $connection->error);
    }
}

echo '{ "success": true, "message": "Film inserito correttamente con id: ' . $film->id . '", "id": ' . $film->id . ' }';

$connection->close();
?>