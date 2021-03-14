<?php



require_once '../connection.php';



$sql = "SELECT genre.*, genre.created_by as createdBy FROM genre";

$result = $connection->query($sql);

$connection->close();



$genres = [];

if ($result) {

    while ($genre = $result->fetch_assoc()) {
        unset($genre['created_by']);
        $genres[] = $genre;

    }

} else {

    http_response_code(500);    

    die('{ "success": false, "error": "Query not valid" }');

}



echo json_encode($genres);



?>