<?php
require '../db.php';

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE username='$username' AND password='$password'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Tài khoản hợp lệ, đăng nhập thành công
    session_start();
    $_SESSION['loggedin'] = true;
    $_SESSION['username'] = $username;
    echo json_encode(["message" => "Login successful", "username" => $username]);
} else {
    // Tài khoản không hợp lệ
    http_response_code(401); // Unauthorized
    echo json_encode(["message" => "Login failed. Invalid credentials."]);
}

$conn->close();
?>
