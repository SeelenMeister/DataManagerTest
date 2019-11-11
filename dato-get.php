<?php

include('database.php');

$query = "SELECT id, name, tel, tratamiento, prioridad FROM datos WHERE uso =1 ORDER BY prioridad ASC LIMIT 1";
    $result = mysqli_query($conn, $query);
    if(!$result){
        die('La consulta List falló').mysqli_error($conn);
    }
    
    $json = array();
    while($row = mysqli_fetch_array($result)){
        $datoid = $row['id'];
        $datoPrioridad = $row['prioridad'];
        $json[] = array (
            'id' => $row['id'],
            'name' => $row['name'],
            'tel' => $row['tel'],
            'tratamiento' => $row['tratamiento'],
        );
        $sql_upd = "UPDATE datos SET prioridad='" . $datoPrioridad . "'+1 WHERE id = '" . $datoid . "' ";
        $update = $conn->query($sql_upd);
    }
    $json_string = json_encode($json);
    echo $json_string;


?>