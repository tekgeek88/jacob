<?php
echo "OK";


//Email
try{
  $message = "Basement Liquid Sensor Trip Alert!!";
  $message = wordwrap($message, 70, "\r\n");
  mail('contact@DeepakShah.com', 'Basement Liquid Sensor Tripped!!!', $message);
}catch(Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
}


//SMS
$kandyAPIKey = 'DAK40e9333a0fa8404c88feccf46d34f434';
$kandyAPISecret = 'DAS74a8f906a36d4e0c894194b9176f775b';

$user1Login = 'user1';
$user1Password = '1enimdelectuscorr1';

$response = file_get_contents('https://api.kandy.io/v1.2/domains/users/accesstokens?key='.$kandyAPIKey.'&domain_api_secret='.$kandyAPISecret.'&user_id='.$user1Login);
$responseObj = json_decode($response);

$userAccessToken = $responseObj->result->user_access_token;


$url = 'https://api.kandy.io/v1.2/users/devices?key='.$userAccessToken;
$response = file_get_contents($url);
$responseObj = json_decode($response);

$deviceID = $responseObj->result->devices[0]->id;

$url = 'https://api.kandy.io/v1.2/devices/smss?device_id='.$deviceID.'&key='.$userAccessToken;


$messageObj = array("text"=>"ALERT - Basement Water Sensor TRIPPED!!");
$data = array("source" => "senderId", "destination" => "16504836372", "message"=>$messageObj);
$bodyObj = array("message"=>$data);


$postBody = json_encode($bodyObj);

$postBodyObj = json_encode($postBody);
$ch = curl_init();
curl_setopt($ch,CURLOPT_URL,$url);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postBody);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);                                                                      curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json','Content-Length: ' .strlen($postBody))
);

$output = curl_exec($ch);

$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

curl_close($ch);


 ?>
