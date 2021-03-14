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

$genre = json_decode($jsonPostdata);

$sql = "
    INSERT INTO genre (
        id,
        name,
        created_by
    ) VALUES (
        " . ($genre->id ?: 'NULL') . ",
        " . ($genre->name ? "'" . $genre->name . "'" : "NULL") . ",
        " . $user->id . "
    )
";

$result = $connection->query($sql);

if (!$result) {
    http_response_code(500);
    die('Error executing the query: ' . preg_replace('/\R|\s{2,}/m', '', $sql) . ' : ' . $connection->error);
}

echo '{ "success": true, "message": "Genre succesfully added with id: ' . $connection->insert_id . '" }';

$connection->close();

?>