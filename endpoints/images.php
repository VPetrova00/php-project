<?php

require_once '../models/Bootstrap.php';
Bootstrap::initApp();

//Session::verifyUserIsLoggedIn();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET': {
        $selectedCollectionId = isset($_GET['id']) ? $_GET['id'] : null;
        $response = null;

        if ($selectedCollectionId) {
            $response = ImagesEndpointHandler::getImagesByCollectionId($selectedCollectionId);
        }

        echo json_encode($response, JSON_UNESCAPED_UNICODE);
        break;
    }
    case 'POST': {
        break;
    }
}