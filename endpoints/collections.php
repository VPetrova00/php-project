<?php

require_once '../models/Bootstrap.php';
Bootstrap::initApp();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET': {
        try {
            $sql = "SELECT * FROM collection";

            $result = (new Db())->getConnection()->prepare($sql);
            $result->execute();
            $resultCollections = [];

            foreach($result->fetchAll() as $row){ // loop to store the data in an associative array.
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

        if((new Db())->getConnection()->prepare($sql)->execute()){
            echo json_encode(['success' => true]);
        } else{
            echo json_encode(['success' => false]);
        }
    }

}