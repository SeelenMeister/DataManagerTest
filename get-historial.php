<?php

include('database.php');

$id = $_POST['id'];

$query = "SELECT * FROM historial WHERE id = '" . $id . "' ORDER BY fecha DESC LIMIT 10";

$result = mysqli_query($conn, $query);

if(!$result){
    die('La consulta HISTORIAL falló').mysqli_error($conn);
}

$json = array();
while($row = mysqli_fetch_array($result)){
    $json[] = array (
        'fecha' => $row['fecha'],
        'tab' => $row['tab'],
        'nota' => $row['nota'],
    );}

$json_string = json_encode($json);
echo $json_string;

?>