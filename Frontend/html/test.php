<?php
require "php/conexion.php";

$rdir = str_replace("\\", "/", __DIR__);                    //Root Dir
require $rdir.'/PHPMailer/src/Exception.php';
require $rdir.'/PHPMailer/src/PHPMailer.php';
require $rdir.'/PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

$nombre = $_POST['Nombre'];
$email = $_POST['Email'];
$asunto = $_POST['Asunto'];
$mensaje = $_POST['Mensaje'];

if ( empty(trim($nombre))) $nombre = 'anonimo';

// $rta = mail('cafeteriaimperialcontact@gmail.com', "Cafeteria Imperial: $asunto", $body);
// var_dump($rta);

$body = <<<HTML
    <h1>Contacto de la web </h1>
    <p> de $nombre / $email</p>
    <h2>Mensaje</h2>
    $mensaje
HTML;

$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->SMTPDebug = 0;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'cafeteriaimperialconctact@gmail.com';                     //SMTP username
    $mail->Password   = 'cafeteriaimperial2024';                               //SMTP password
    $mail->SMTPSecure = 'ssl';            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom( $email, "$nombre");
    $mail->addAddress('cafeteriaimperialcontact@gmail.com', "Sitio Web");     //Add a recipient

    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = "Mensaje Web: $asunto";
    $mail->Body    = "$body";

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}