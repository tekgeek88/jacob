<?php
header("Access-Control-Allow-Origin: *");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  //nothing, we just implement get

  $familyId = 1;

  if(isset($_POST['familyId'])){
    $familyId = $_POST['familyId'];
    $childName = $_POST['childName'];

  }
}else{

  $familyId = 1;

  if(isset($_GET['familyId'])){
    $familyId = $_GET['familyId'];


    $servername = "localhost";
    $username = "ouradv5_hack";
    $password = "hackathon!";
    $dbname = "ouradv5_hackathon";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT * FROM FAMILY where FAMILY_ID=".$familyId;
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {

      $rows = array();
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }

        print json_encode($rows[0]);
    } else {
        echo "0 results";
    }
    $conn->close();


  }

}

?>
