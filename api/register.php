<?php
require '../db.php';

$username = $_POST['username'];
$password = $_POST['password'];

// Kiểm tra xem username đã tồn tại chưa
$sql_check = "SELECT * FROM users WHERE username='$username'";
$result_check = $conn->query($sql_check);

if ($result_check->num_rows > 0) {
    // Username đã tồn tại
    http_response_code(409); // Conflict
    echo json_encode(["message" => "Username already exists"]);
} else {
    // Thêm tài khoản mới vào database
    $sql_insert = "INSERT INTO users (username, password) VALUES ('$username', '$password')";

    if ($conn->query($sql_insert) === TRUE) {
        echo json_encode(["message" => "Registration successful", "username" => $username]);
    } else {
        http_response_code(500); // Internal Server Error
        echo json_encode(["message" => "Registration failed", "error" => $conn->error]);
    }
}

$conn->close();
?>
