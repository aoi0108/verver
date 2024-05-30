<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
session_start();
$errmessage = array();
if ($_POST) {

    //入力チェック
    if (!$_POST["e"]) {
        $errmessage[] = "emailを入力してください。";
    } else if (mb_strlen($_POST["e"]) > 200) {
        $errmessage[] = "emailは200文字以内にしてください。";
    } else if (!filter_var($_POST["e"], FILTER_VALIDATE_EMAIL)) {
        $errmessage[] = "メールアドレスが不正です。";
    }

    if (!$_POST["p"]) {
        $errmessage[] = "パスワードを入力してください。";
    } else if (mb_strlen($_POST["p"]) > 100) {
        $errmessage[] = "emailは100文字以内にしてください。";
    }

    //認証チェック
    $userfile = "../private/userinfo.txt";
    if (file_exists($userfile)) {
        $users = file_get_contents($userfile);
        $users = explode("\n", $users);
        foreach ($users as $k => $v) {
            $v_ary = str_getcsv($v);
            if ($v_ary[0] == $_POST["e"]) {
                if (password_verify($_POST["p"], $v_ary[1])) {
                    $_SESSION["e"] = $_POST["e"];
                    //ログイン後の画面へのリダイレクト
                    $host = $_SERVER["HTTP_HOST"];
                    $uri = rtrim(dirname($_SERVER["PHP_SELF"]), "/\\");
                    header("Location: //$host$uri/index.html");
                    exit;
                }
            }
        }
        $errmessage[] = "ユーザー名またはパスワードが正しくありません。";
    } else {
        $errmessage[] = "ユーザーリストファイルが見つかりません。";
    }
} else {

    if (isset($_SESSION["e"]) && $_SESSION["e"]) {
        $host = $_SERVER["HTTP_HOST"];
        $uri = rtrim(dirname($_SERVER["PHP_SELF"]), "/\\");
        header("Location: //$host$uri/index.html");
        exit;
    }

    $_POST = array();
    $_POST["e"] = "";
}
?>

<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="utf-8">
    <title>ログインフォーム</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
        integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
    <link rel="icon" href="icon.png">
    <style>
    div.button {
        text-align: center;
    }
    </style>
</head>

<body>
    <div class="container">
        <div class="mx-auto" style="width: 400px;">
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
            <h1>スペイン語学習をはじめる</h1>

            <?php
            if ($errmessage) {
                echo '<div class = "alert-danger role = "alert">';
                echo implode('<br>', $errmessage);
                echo '</div>';
            }

            ?>

            <form action="./login.php" method="post">
                Eメール <input type="email" name="e" value="<?php echo htmlspecialchars($_POST["e"]) ?>"
                    class="form-control"><br>
                パスワード <input type="password" name="p" value="" class="form-control"><br>
                <div class="button">
                    <input type="submit" name="login" value="ログイン" class="btn-warning btn-lg">
                </div>
            </form>

            <div style="text-align: center; margin-top: 10px;">
                <a href="./register.php">新規登録</a>
            </div>
        </div>

    </div>
</body>

</html>