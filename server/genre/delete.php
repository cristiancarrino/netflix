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

    die('No user with this token was found. Try to generate new token by login again');

}



$genre = json_decode($jsonPostdata);



$sql = "SELECT * 

    FROM genre 

    WHERE id = " . $genre->id;



if (!$connection->query($sql)->fetch_object()) {

    http_response_code(400);

    die('No genre with this id was found');

}



$sql = "SELECT * 

    FROM genre 

    WHERE id = " . $genre->id . "

    AND created_by = " . $user->id;



if (!$connection->query($sql)->fetch_object()) {

    http_response_code(401);

    die('You can\'t remove the genre. This was not created by you');

}



$sql = "DELETE FROM film_genre

    WHERE genre_id = " . $genre->id;



if (!$result = $connection->query($sql)) {

    http_response_code(500);

    die('Error executing the query: ' . preg_replace('/\R|\s{2,}/m', '', $sql) . ' : ' . $connection->error);

}



$sql = "DELETE FROM genre 

    WHERE id = " . $genre->id;



$result = $connection->query($sql);



if (!$result) {

    http_response_code(500);

    die('Error executing the query: ' . preg_replace('/\R|\s{2,}/m', '', $sql) . ' : ' . $connection->error);

}



echo '{ "success": true, "message": "Genre removed successfully " }';



$connection->close();



?>