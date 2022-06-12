<?php


class Db
{

    private $connection;

    public function __construct()
    {

        $dbHost = "localhost";
        $dbName = "project";
        $userName = "root";
        $userPassword = "";

        $this->connection = new PDO("mysql:host=$dbHost;dbname=$dbName", $userName, $userPassword,
            [
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            ]);
    }

    public function getConnection()
    {
        return $this->connection;
    }
}