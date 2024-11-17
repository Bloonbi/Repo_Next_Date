<?php
/*<!DOCTYPE html>
<html lang="en">

<head>


    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resumen</title>
 
</head>
<body>
    <h2>Recibo de compra:</h2>
    <div id="recibo"></div>

    <button>Descargar Recibo</button>
    <script src="js/recibo.js"></script>
</body>
</html>

*/



require('pdf/fpdf.php');
require "php/conexion.php";

class PDF extends FPDF
{
// Cabecera de página
function Header()
{
    // Logo
    $this->Image('images/logo.png',10,8,33);
    // Arial bold 15
    $this->SetFont('Arial','B',15);
    // Movernos a la derecha
    $this->Cell(80);
    // Título
    $this->Cell(30,10,'Recibo',1,0,'C');
    // Salto de línea
    $this->Ln(20);

    
}

// Pie de página
function Footer()
{
    // Posición: a 1,5 cm del final
    $this->SetY(-15);
    // Arial italic 8
    $this->SetFont('Arial','I',8);
    // Número de página
    $this->Cell(0,10,'Pagina '.$this->PageNo().'/{nb}',0,0,'C');
}
}

session_start();
    $idcliente =$_SESSION['idc'];
    try {

  

$sql = "SELECT * FROM  producto p
        JOIN `carrito_compra` cc
        ON cc.idProducto = p.idProd
        WHERE idCliente = :idc";


        $stmt = $con->prepare($sql);
        $stmt->bindParam(':idc' , $idcliente);
        $stmt->execute();


        $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);
       $totalGeneral = 0;
        $totalProducto = 0;

        $sql = "SELECT * FROM cliente WHERE id = :idc";
        $stmt = $con->prepare($sql);
        $stmt->bindParam(':idc' , $idcliente);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (count($resultados) > 0) {
      

        
            $pdf = new PDF();
            $pdf->AliasNbPages();
            $pdf->AddPage();
            $pdf->SetFont('Arial','',12);


            for ($i =0; $i<count($resultados); $i++){

                $pepe = (($resultados[$i]["precio"] * $resultados[$i]["porcentaje"])  / 100);
                if($resultados[$i]["promocion"]>0){
                     $totalProducto = ($resultados[$i]["precio"] * $resultados[$i]["cantidad"]) - $pepe;
                  }                
                  else {
                     $totalProducto = $resultados[$i]["precio"] * $resultados[$i]["cantidad"];
                  }
                    $totalGeneral += $totalProducto;
                    $numero = rand(1, 1000);
                $precioC=  $resultados[$i]["precio"]*$resultados[$i]["cantidad"];
                $pdf->Cell(0,10,utf8_decode($resultados[$i]["nombre"]),1,1,'C');
                $pdf->Cell(0,10,'Precio Unitario:'.$resultados[$i]["precio"] - $pepe,1,1,);
                $pdf->Cell(0,10,'Cantidad:'.$resultados[$i]["cantidad"],1,1);
                $pdf->Cell(0,10,'SubTotal:'.  $precioC,1,1);
                $pdf->Ln();

                }
                $pdf->Cell(0,10,'MONTO',1,1, 'C');
                $pdf->Cell(0,10,'Precio Total:'.  $totalGeneral,1,1);
                $pdf->Ln();
                // $pdf->Cell(10,0,'','T'); 

                $pdf->Cell(0,10,'FINAL',1,1, 'C');
                $pdf->Cell(0,10,'Gracias '. $user["nombre"] .' por su compra y preferencia.',  1,1, 'C');
                $pdf->Cell(0,10,'Presente el recibo o Retire por el siguiente numero: '.  $user["id"],1,1, 'C');



            }
            
            $pdf->Output('Recibo.pdf', 'D');
            


    } catch(PDOException $e) {
        echo json_encode(["error" => "Error de conexión"]);
    }


// Creación del objeto de la clase heredada

?>
