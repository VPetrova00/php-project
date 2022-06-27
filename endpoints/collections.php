<?php
$dbhost = 'localhost' ;
$name = 'root';
$password = '';
$dbName = 'project';

$conn = new PDO("mysql:host=$dbhost;dbname=$dbName", $name, $password,
    [
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET': {
        try {
            $sql = "SELECT * FROM collection";

            $result = $conn->query($sql);

            $resultCollections = array();

            while($row = $result->fetch(PDO::FETCH_ASSOC)){ // loop to store the data in an associative array.
                $resultCollections[] = $row;
            }

        } catch (AccessDeniedException $e) {
            $resultCollections = ['success' => false];
        }

        echo json_encode(['success' => true, $resultCollections]);
        break;
        }

    case 'POST': {
        $requestBody = json_decode(file_get_contents("php://input"), true);
        $name =  $requestBody['name'];
        $creationDate = $requestBody['creationDate'];
        $description = $requestBody['description'];
        $coverPhoto = $requestBody['coverPhoto'];
        $userId = $requestBody['userId'];

        $sql = "INSERT INTO collection VALUES ('', '$name', '$creationDate', '$description', '$coverPhoto', '$userId')";

        if($conn->query($sql)){
            echo json_encode(['success' => true]);
        } else{
            echo json_encode(['success' => false]);
        }
    }

}