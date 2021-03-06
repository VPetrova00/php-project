<?php

session_start();

require_once '../models/Bootstrap.php';
Bootstrap::initApp();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET': {
        try {
            $userInformation = Session::verifyUserIsLoggedIn();
            $result = [
                'logged' => true,
                'session' => $userInformation,
            ];
        } catch (AccessDeniedException $e) {
            $result = ['logged' => false];
        }

        echo json_encode($result);
        break;
    }
    case 'POST': {
        $requestBody = json_decode(file_get_contents("php://input"), true);
        $username = $requestBody['username'];
        $password = $requestBody['password'];

        echo json_encode(["success" => Session::logUser($username, $password), "username" => $username, "password" => $password]);

        break;
    }
    case 'DELETE': {
        Session::logout();
        echo json_encode(["success" => true]);
    }
}