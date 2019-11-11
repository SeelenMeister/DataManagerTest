<?php
	$servername = "localhost";
	$username = "root";
	$password = "";
    $dbName = "db_name";

    date_default_timezone_set('America/Argentina/Buenos_Aires');
    
	// Making conecction

	$conn = new mysqli($servername, $username, $password, $dbName);

    // cheking conn

	if(!$conn){
		die("NO HAY CONEXION CON LA BASE DE DATOS!!!!!.".mysqli_connect_error());
	}

	?>
