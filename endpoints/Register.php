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

            $sql = "SELECT * FROM users";

            $result = $conn->query($sql);

            $resultUsers = array();

            while($row = $result->fetch(PDO::FETCH_ASSOC)){ // loop to store the data in an associative array.
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

        if($conn->query($sql)){
            $user = $conn->query("SELECT * FROM users WHERE username = '$username'")->fetch(PDO::FETCH_ASSOC);
            echo json_encode(['success' => true, 'id' => $user['id']]);
        } else{
            echo json_encode(['success' => false]);
        }

    }

}