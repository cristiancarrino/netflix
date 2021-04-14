<?php

require_once '../connection.php';

$sql = "SELECT actor.* FROM actor";

$result = $connection->query($sql);

$connection->close();

$actors = [];
if ($result) {
    while ($actor = $result->fetch_assoc()) {
        $actors[] = $actor;
    }
} else {
    http_response_code(500);    
    die('{ "success": false, "error": "Query not valid" }');
}

echo json_encode($actors);

?>