<?php
require '../db.php';

$name = $_POST['name'];
$position = $_POST['position'];
$department = $_POST['department'];
$salary = $_POST['salary'];

$sql = "INSERT INTO employees (name, position, department, salary) VALUES ('$name', '$position', '$department', '$salary')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["id" => $conn->insert_id, "name" => $name, "position" => $position, "department" => $department, "salary" => $salary]);
} else {
    echo json_encode(["error" => $conn->error]);
}

$conn->close();
?>
