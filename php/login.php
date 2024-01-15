<?php
    session_start();

    if (isset($_POST['submit'])) {
        $username = $_POST['username'];
        $password = $_POST['password'];

        if ($username == 'Admin' && $password == 'Admin') {
            $_SESSION['username'] = $username;
            header("Location: welcome.php");
        } else {
            echo "Invalid username or password!";
        }
    }
?>