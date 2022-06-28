<?php

require_once '../models/Bootstrap.php';
Bootstrap::initApp();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET': {
        try {

        $sql = "SELECT * FROM picture";

        $result = (new Db())->getConnection()->prepare($sql);
        $result->execute();
        $resultPictures = array();

        foreach ($result->fetchAll() as $row){ // loop to store the data in an associative array.
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

        if((new Db())->getConnection()->prepare($sql)->execute()){
            echo json_encode(['success' => true]);
        } else{
            echo json_encode(['success' => false]);
        }
    }

}