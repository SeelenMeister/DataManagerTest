<?php

include('database.php');

$id = $_POST['id'];

$query = "SELECT * FROM agenda WHERE userid = '" . $id . "' ORDER BY fecha DESC";

$result = mysqli_query($conn, $query);
if(!$result){
    die('La consulta List falló').mysqli_error($conn);
}


$json = array();
while($row = $result->fetch_assoc()){
    $json[] = array (
        'datoid' => $row['datoid'],
        'fecha' => $row['fecha'],
        'name' => $row['name'],
        'tratamiento' => $row['tratamiento'],
        'tel' => $row['tel'],
        'agenda' => $row['agenda'],
        'notas' => $row['notas'],
    );}

$json_string = json_encode($json);
echo $json_string;

?>