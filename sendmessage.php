<?php
$sendto   = "info@modelingvalue.nl,rkrijgsheld@gmail.com,tombrus@gmail.com";

$usermail = $_POST['emailSender'];
$content  = $_POST['emailMessage'];

$subject  = "[mvg-web]: vraag vanuit web";

$headers  = "From: MVG<jenkins@modelingvalue.nl>\r\n";
$headers .= "Reply-To: ". strip_tags($usermail) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html;charset=utf-8 \r\n";

$msg  = "<html><body style='font-family:Arial,sans-serif;'>";
$msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>Er heeft iemand een reactie via de website gegeven:</h2>\r\n";
$msg .= "<p><strong>Afzender:</strong> ".$usermail."</p>\r\n";
$msg .= "<p><strong>Bericht:</strong> ".nl2br($content)."</p>\r\n";
$msg .= "</body></html>";

if(@mail($sendto, $subject, $msg, $headers)) {
	echo "true";
} else {
	echo "false";
}
?>
