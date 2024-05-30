<?php
session_start();
$_SESSION = array();

?>



<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="utf-8">
    <title>ログアウト</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
        integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
    <link rel="icon" href="../public/icon.png">

</head>

<style>
.container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.form-container {
    width: 400px;
    text-align: center;
}

body {
    background-color: #FFF3B8;
}

h1 {
    font-size: 32px;
    text-align: center;
    margin-bottom: 20px;
}

div.button {
    text-align: center;
}
</style>

<body>
    <div class="container">
        <div class="mx-auto" style="width: 400px;">
            <h1>ログアウトしました</h1>
            <div style="text-align: center; margin-top: 10px;">
                <a href="login.php">ログインする</a>
            </div>
        </div>
    </div>
</body>

</html>