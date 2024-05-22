<?php
require '../db.php';

$id = $_POST['id'];
$name = $_POST['name'];
$position = $_POST['position'];
$department = $_POST['department'];
$salary = $_POST['salary'];

$sql = "UPDATE employees SET name='$name', position='$position', department='$department', salary='$salary' WHERE id='$id'";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["id" => $id, "name" => $name, "position" => $position, "department" => $department, "salary" => $salary]);
} else {
    echo json_encode(["error" => $conn->error]);
}

$conn->close();
?>
