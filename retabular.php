<?php

include('database.php');

$datoid = $_POST['datoid'];
$userid = $_POST['userid'];
$tab = $_POST['tab'];
$nota = $_POST['nota'];
$fecha = date("Y-m-d H:i:s");

$sql_upd = "UPDATE datos SET uso=1 WHERE id = '" . $datoid . "' ";
$update = $conn->query($sql_upd);
if($update == true){
    $query = "INSERT INTO historial (id, fecha, tab, nota)
            VALUES ('" . $datoid . "', '" . $fecha . "' ,'" . $tab . "','" . $nota . "')";
    $result = mysqli_query($conn, $query);
    if($result == true){
        $delete = "DELETE FROM agenda WHERE datoid = '" . $datoid . "' AND userid = '" . $userid . "'" ;
        $deleteok = mysqli_query($conn, $delete);
        if($deleteok == true){
            echo("El dato ha sido retabulado exitosamente");
        }else{echo("3 - Hubo un error al intentar quitar el dato de la agenda");};
    }else{echo("2 - Hubo un error al insertar un nuevo historial");};
}else{echo("1 - Hubo un error al actualizar db datos");};

?>