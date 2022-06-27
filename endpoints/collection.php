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
    case 'GET':
    {
        try {
            $selectedCollectionId = isset($_GET['id']) ? $_GET['id'] : null;

            $sql = "SELECT * FROM collection WHERE user_id = '$selectedCollectionId'";

            $result = $conn->query($sql);

            $resultCollections = array();

            while ($row = $result->fetch(PDO::FETCH_ASSOC)) { // loop to store the data in an associative array.
                $resultCollections[] = $row;
            }

        } catch (AccessDeniedException $e) {
            $resultCollections = ['success' => false];
        }

        echo json_encode(['success' => true, $resultCollections]);
        break;
    }
}