<?php

require 'database.php';

$sql = "DELETE FROM historial";
$deleted = $conn->query($sql);
  if($deleted == TRUE){
    echo('La tabla Historial ha sido reseteada.');
  } else {
    echo('Fallo el reseteo de la tabla historial!.');
  }

?>