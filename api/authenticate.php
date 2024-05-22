<?php
session_start();

if (isset($_SESSION['user_id'])) {
    echo json_encode(['message' => 'Authenticated']);
} else {
    http_response_code(401);
    echo json_encode(['message' => 'Unauthorized']);
}
?>
