<?php
require '../db.php';

$id = $_POST['id'];
$status = $_POST['status'];

$sql = "UPDATE employees SET status='$status' WHERE id='$id'";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["id" => $id, "status" => $status]);
} else {
    echo json_encode(["error" => $conn->error]);
}

$conn->close();
?>
