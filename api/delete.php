<?php
require '../db.php';

$id = $_POST['id'];

$sql = "DELETE FROM employees WHERE id='$id'";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["id" => $id]);
} else {
    echo json_encode(["error" => $conn->error]);
}

$conn->close();
?>
