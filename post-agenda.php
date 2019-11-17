<?php

include('database.php');

$datoid = $_POST['datoid'];
$userid = $_POST['userid'];
$name = $_POST['name'];
$tratamiento = $_POST['tratamiento'];
$teldato = $_POST['teldato'];
$tab = $_POST['tab'];
$nota = $_POST['nota'];
$agenda = $_POST['agenda'];
$fecha = date("Y-m-d H:i:s");

if(!$agenda){
    $agenda = date("Y-m-d");
}

$query = "INSERT INTO historial (id, fecha, tab, nota)
            VALUES ('" . $datoid . "', '" . $fecha . "' ,'" . $tab . "','" . $nota . "')";

$result = mysqli_query($conn, $query);

if($result == true){
    $sql_upd = "UPDATE datos SET uso=2 WHERE id = '" . $datoid . "' ";
    $update = $conn->query($sql_upd);
    if($update == true){
        $agendado = "INSERT INTO agenda (userid, datoid, fecha, name, tratamiento, tel, agenda, notas)
        VALUES ('" . $userid . "', '" . $datoid . "', '" . $fecha . "' ,'" . $name . "','" . $tratamiento . "', '" . $teldato . "' ,'" . $agenda . "','" . $nota . "')";
    }   $agendado_query = $conn->query($agendado);
        if($agendado_query == true){
            echo('Todo fue un exito!');
        }
}else{echo('Hubo un error. '.mysqli_error($conn));}

?>
 