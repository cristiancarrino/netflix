<?php

require_once '../connection.php';

$result = $connection->query("
    SELECT film.*
    FROM film
");

$films = [];
if ($result) {
    while ($film = $result->fetch_object()) {
        // actors
        $actors = $connection->query("
            SELECT actor.* 
            FROM film_actor 
            JOIN actor ON film_actor.actor_id = actor.id 
            WHERE film_actor.film_id = $film->id
        ");

        if ($actors) {
            $film->actors = [];

            while ($actor = $actors->fetch_object()) {
                $film->actors[] = $actor;
            }
        } else {
            http_response_code(500);
            die('{ "success": false, "error": "'  .$connection->error . '" }');
        }

        // genres
        $genres = $connection->query("
            SELECT genre.* 
            FROM film_genre 
            JOIN genre ON film_genre.genre_id = genre.id 
            WHERE film_genre.film_id = $film->id
        ");

        if ($genres) {
            $film->genres = [];

            while ($genre = $genres->fetch_object()) {
                $film->genres[] = $genre;
            }
        } else {
            http_response_code(500);
            die('{ "success": false, "error": "' . $connection->error . '" }');
        }

        // votes
        $votes = $connection->query("
            SELECT id, user_id, vote
            FROM film_vote
            WHERE film_vote.film_id = $film->id
        ");

        if ($votes) {
            $film->votes = [];

            while ($vote = $votes->fetch_object()) {
                $film->votes[] = $vote;
            }
        } else {
            http_response_code(500);
            die('{ "success": false, "error": "' . $connection->error . '" }');
        }
        
        $films[] = $film;
    }
} else {
    http_response_code(500);
    die('{ "success": false, "error": "Query not valid" }');
}

$connection->close();
echo json_encode($films);

?>