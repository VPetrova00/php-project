<?php
$server = 'localhost' ;
$username = 'root';
$password = '';
$dbname = 'project';


$conn = mysqli_connect($server, $username, $password, $dbname);

// Check connection
if($conn === false){
    die("ERROR: Could not connect. "
        . mysqli_connect_error());
}
$username =  $_REQUEST['username'];
$email = $_REQUEST['email'];
$password = $_REQUEST['password'];

// Performing insert query execution
// here our table name is college
$sql = "INSERT INTO users VALUES ('', '$username', '$email', '$password')";

if(mysqli_query($conn, $sql)){
    echo "<h3>data stored in a database successfully."
        . " Please browse your localhost php my admin"
        . " to view the updated data</h3>";

    echo nl2br("\n$username\n $password\n");
} else{
    echo "ERROR: Hush! Sorry $sql. "
        . mysqli_error($conn);
}

// Close connection
mysqli_close($conn);