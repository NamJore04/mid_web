<?php
require '../db.php';

$offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;
$limit = 10; // Số lượng nhân viên hiển thị mỗi lần

$sql = "SELECT * FROM employees LIMIT $limit OFFSET $offset";
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
