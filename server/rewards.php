<?php
header("Access-Control-Allow-Origin: *");
$servername = "localhost";
$username = "ouradv5_hack";
$password = "hackathon!";
$dbname = "ouradv5_hackathon";


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  //nothing, we just implement get

  $familyId = 1;

  if(isset($_POST['familyId'])){
    $familyId = $_POST['familyId'];
    $rewardName = $_POST['rewardName'];
    $rewardScore = $_POST['rewardScore'];


    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "INSERT INTO REWARD (FAMILY_ID, REWARD_NAME, SCORE)
    VALUES ($familyId, '$rewardName', $rewardScore)";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();

  }
}else{

  $familyId = 1;

  if(isset($_GET['familyId'])){
    $familyId = $_GET['familyId'];


    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT * FROM REWARD where FAMILY_ID=".$familyId;
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {

      $rows = array();
        // output data of each row
        while($row = $result->fetch_assoc()) {
            //echo "id: " . $row["FAMILY_ID"]. " - Name: " . $row["FAMILY_NAME"]. "<br>";
            $rows[] = $row;
        }

        echo json_encode($rows);
    } else {
        echo "0 results";
    }
    $conn->close();


  }

}

?>
