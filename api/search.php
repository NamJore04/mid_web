<?php
require '../db.php';

$searchTerm = $_GET['term'];
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 6;

$sql = "SELECT * FROM employees WHERE name LIKE '%$searchTerm%' OR position LIKE '%$searchTerm%' OR department LIKE '%$searchTerm%' LIMIT $limit";
$result = $conn->query($sql);

$employees = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $employees[] = $row;
    }
}

echo json_encode($employees);

$conn->close();
?>
