<?php

include('database.php');

$id = $_POST['id'];
$tab = $_POST['tab'];
$nota =$_POST['nota'];
$fecha = date("Y-m-d H:i:s");

$query = "INSERT INTO historial (id, fecha, tab, nota)
            VALUES ('" . $id . "', '" . $fecha . "' ,'" . $tab . "','" . $nota . "')";

$result = mysqli_query($conn, $query);

if($result == true){
    echo('La tabulación ha sido guardada exitosamente.');
}else{echo('Hubo un error. '.mysqli_error($conn));}

?>
