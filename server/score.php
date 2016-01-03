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
    $childId = $_POST['childId'];
    $activityId = $_POST['activityId'];
    $score = $_POST['score'];


    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "update CHILDREN set SCORE=SCORE+".$score." where CHILD_ID=".$childId;

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();

  }
}else{

  $familyId = 1;

  if(isset($_GET['childId'])){
    $childId = $_GET['childId'];


    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "select c.SCORE-a.SCORE as toal_score from CHILDREN c, ACTIVITY a where c.FAMILY_ID = a.FAMILY_ID and c.CHILD_ID=".$childId;

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {

      $rows = array();
        // output data of each row

        $row = $result->fetch_assoc();

        echo json_encode($row);
    } else {
        echo "0 results";
    }
    $conn->close();


  }

}

?>
