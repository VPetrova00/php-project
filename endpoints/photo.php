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

        $sql = "SELECT * FROM picture";

        $result = $conn->query($sql);

        $resultPictures = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)){ // loop to store the data in an associative array.
            $resultPictures[] = $row;
        }

    } catch (AccessDeniedException $e) {
            $resultPictures = ['success' => false];
    }

        echo json_encode(['success' => true, $resultPictures]);
        break;

    }

    case 'POST': {

        $requestBody = json_decode(file_get_contents("php://input"), true);
        $name =  $requestBody['name'];
        $date = $requestBody['date'];
        $width = $requestBody['width'];
        $height = $requestBody['height'];
        $collectionId = $requestBody['collectionId'];

        $sql = "INSERT INTO picture VALUES ('', '$name', '$date', '$width', '$height', '$collectionId')";

        if($conn->query($sql)){
            echo json_encode(['success' => true]);
        } else{
            echo json_encode(['success' => false]);
        }
    }

}