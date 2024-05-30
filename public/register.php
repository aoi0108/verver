<?php
$errmessage = array();
if ($_POST) {

    //入力チェック
    if (!$_POST["e"]) {
        $errmessage[] = "emailを入力してください";
    } else if (strlen($_POST["e"]) > 200) {
        $errmessage[] = "emailは200文字以内にしてください。";
    } else if (!filter_var($_POST["e"], FILTER_VALIDATE_EMAIL)) {
        $errmessage[] = "メールアドレスが不正です。";
    }
    if (!$_POST["p"]) {
        $errmessage[] = "パスワードを入力してください";
    } else if (strlen($_POST["p"]) > 100) {
        $errmessage[] = "パスワードは100文字以内にしてください。";
    }

    if ($_POST["p"] != $_POST["p2"]) {
        $errmessage[] = "確認用パスワードが一致しません。";
    }


    $userfile = "./private/userinfo.txt";
    $users = array();
    if (file_exists($userfile)) {
        $users = file_get_contents($userfile);
        $users = explode("\n", $users);
        foreach ($users as $k => $v) {
            $v_ary = str_getcsv($v);
            if ($v_ary[0] == $_POST["e"]) {
                $errmessage[] = "そのemailはすでに登録されています。";
                break;
            }
        }
    }

    //新規ユーザー登録処理
    //インターネット上では見れないフォルダに入れないと行けない
    if (!$errmessage) {

        $ph = password_hash($_POST["p"], PASSWORD_DEFAULT);
        $line = '"' . $_POST["e"] . '","' . $ph . '"' . "\n";
        $ret = file_put_contents($userfile, $line, FILE_APPEND);
    }

    //ログイン画面にリダイレクト
    if (!$errmessage) {
        $host = $_SERVER["HTTP_HOST"];
        $uri = rtrim(dirname($_SERVER["PHP_SELF"]), "/\\");
        header("Location: //$host$uri/login.php");
        exit;
    }
} else {
    $_POST["e"] = "";
}
?>

<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="utf-8">
    <title>Register</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
        integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
    <link rel="icon" href="../public/icon.png">
    <style>
    div.button {
        text-align: center;
    }
    </style>
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
            <h1>ユーザー新規登録</h1>

            <?php
            if ($errmessage) {
                echo '<div class = "alert-danger role = "alert">';
                echo implode('<br>', $errmessage);
                echo '</div>';
            }

            ?>
            <form action="./register.php" method="post">
                Eメール <input type="email" name="e" value="<?php echo htmlspecialchars($_POST["e"]) ?>"
                    class="form-control"><br>
                パスワード <input type="password" name="p" value="" class="form-control"><br>
                パスワード（確認） <input type="password" name="p2" value="" class="form-control"><br>
                <div class="button">
                    <input type="submit" name="register" value="登録" class="btn-warning btn-lg">
                </div>
            </form>
        </div>
    </div>
</body>

</html>