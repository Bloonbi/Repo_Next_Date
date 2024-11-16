<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../vistas/css/style.css">
    <title>Cafeteria Imperial</title>
</head>
<body>
    <div id="navegacion">
<div id="logo">
<img src="vistas/img/WhatsApp Image 2024-05-27 at 16.27.41.png" alt="CafeteriaImperial" id="imagen-logo">
</div>
<div id="menu">
   <a href="pages/productos.html" >Productos</a>
   <a href="pages/locales.html" >Locales</a>
   <a href="pages/aboutus.html">Sobre Nosotros</a>
</div>
<div id="buscar">
    
    <input type="text" id="producto" placeholder="Buscar producto">
    <button type="submit" id="boton1">Buscar</button>
   
</div>
<div  id="loginprincipal">
    <a href="pages/login.html"> Ingresar</a>
</div>
<div  id="registerprincipal">
    <a href="pages/register.html"> Registrarse</a>
</div>
</div>




<script src="vistas/js/search.js"></script>



<div class="contenedor">






<?php
require "conexion.php";

$res = $con ->query('SELECT * FROM producto');


while($reg = $res->fetch()){ ?>

    <div class="tarjeta">
    <img class="img" src="../vistas/img/Producto/<?=$reg[0]?>.jpg">    
    
    <?=$reg[0] . "-". $reg[1]?></div><br>

<?php
}
?>
</div>

</body>
</html>