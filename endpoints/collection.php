<?php

require_once '../models/Bootstrap.php';
Bootstrap::initApp();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
    {
        try {
            $selectedCollectionId = isset($_GET['id']) ? $_GET['id'] : null;

            $sql = "SELECT * FROM collection WHERE user_id = '$selectedCollectionId'";

            $result = (new Db())->getConnection()->prepare($sql);
            $result->execute();
            $resultCollections = [];

            foreach ($result->fetchAll() as $row) { // loop to store the data in an associative array.
                $resultCollections[] = $row;
            }

        } catch (AccessDeniedException $e) {
            $resultCollections = ['success' => false];
        }

        echo json_encode(['success' => true, $resultCollections]);
        break;
    }
}