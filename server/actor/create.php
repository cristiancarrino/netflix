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



$actor = json_decode($jsonPostdata);



$sql = "
    INSERT INTO actor (
        id,
        firstname,
        lastname,
        photo_url,
        birthdate,
        created_by
    ) VALUES (
        " . ($actor->id ?: 'NULL') . ",
        " . ($actor->firstname ? "'" . addslashes($actor->firstname) . "'" : "NULL") . ",
        " . ($actor->lastname ? "'" . addslashes($actor->lastname) . "'" : "NULL") . ",
        " . ($actor->photo_url ? "'" . addslashes($actor->photo_url) . "'" : "NULL") . ",
        " . ($actor->birthdate ? "'" . addslashes($actor->birthdate) . "'" : "NULL") . ",
        " . $user->id . "
    )
";



$result = $connection->query($sql);



if (!$result) {

    http_response_code(500);

    die('Error executing the query: ' . preg_replace('/\R|\s{2,}/m', '', $sql) . ' : ' . $connection->error);

}



echo '{ "success": true, "message": "Actor succesfully added with id: ' . $connection->insert_id . '" }';



$connection->close();



?>