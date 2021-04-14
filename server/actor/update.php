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



$actor = json_decode($jsonPostdata);



$sql = "SELECT * 

    FROM actor 

    WHERE id = " . $actor->id;



if (!$connection->query($sql)->fetch_object()) {

    http_response_code(400);

    die('No actor with this id was found');

}



$sql = "SELECT * 

    FROM actor 

    WHERE id = " . $actor->id . "

    AND created_by = " . $user->id;



if (!$connection->query($sql)->fetch_object()) {

    http_response_code(401);

    die('You can\'t edit the actor. This was not created by you');

}



$sql = "UPDATE actor SET 
        firstname = " . ($actor->firstname ? "'" . addslashes($actor->firstname) . "'" : "NULL") . ",
        lastname = " . ($actor->lastname ? "'" . addslashes($actor->lastname) . "'" : "NULL") . ",
        photo_url = " . ($actor->photo_url ? "'" . addslashes($actor->photo_url) . "'" : "NULL") . ",
        birthdate = " . ($actor->birthdate ? "'" . addslashes($actor->birthdate) . "'" : "NULL") . "

        WHERE id = " . $actor->id;



$result = $connection->query($sql);



if (!$result) {

    http_response_code(500);

    die('Error executing the query: ' . preg_replace('/\R|\s{2,}/m', '', $sql) . ' : ' . $connection->error);

}



echo '{ "success": true, "message": "Actor edited successfully " }';



$connection->close();



?>