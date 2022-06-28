<?php

require_once '../models/Bootstrap.php';
Bootstrap::initApp();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET': {
        try {

            $sql = "SELECT * FROM users";

            $result = (new Db())->getConnection()->prepare($sql);
            $result->execute();

            $resultUsers = [];

            foreach ($result->fetchAll() as $row){ // loop to store the data in an associative array.
                $resultUsers[] = $row;
            }

        } catch (AccessDeniedException $e) {
            $resultUsers = ['success' => false];
        }

        echo json_encode(['success' => true, $resultUsers]);
        break;
    }

    case 'POST': {
        $requestBody = json_decode(file_get_contents("php://input"), true);
        $username =  $requestBody['username'];
        $email = $requestBody['email'];
        $password = $requestBody['password'];

        $sql = "INSERT INTO users VALUES ('', '$username', '$email', '$password')";

        if((new Db())->getConnection()->prepare($sql)->execute()){
            $sql = "SELECT * FROM users WHERE username = :username";
            $stmt = (new Db())->getConnection()->prepare($sql);
            $stmt->execute(['username' => $username]);
            $user = $stmt->fetch();

            echo json_encode(['success' => true, 'id' => $user['id']]);
        } else{
            echo json_encode(['success' => false]);
        }

    }

}