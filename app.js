const express = require('express');
const app = express();
const path = require('path')
const fs = require('fs');
const bcrypt = require('bcrypt');
const session = require('express-session');
const { exec } = require('child_process');
const mime = {
    ".html": "text/html",
    ".css":  "text/css"
    // 読み取りたいMIMEタイプはここに追記
  };
app.use(express.urlencoded({extended: true}));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));


app.post('/login.php', (req, res) => {
  const errmessage = [];
  if (!req.body.e) {
    errmessage.push("emailを入力してください。");
  } else if (req.body.e.length > 200 || !/^\S+@\S+\.\S+$/.test(req.body.e)) {
    errmessage.push("正しい形式のメールアドレスを入力してください。");
  }

  if (!req.body.p) {
    errmessage.push("パスワードを入力してください。");
  }

  if (errmessage.length > 0) {
    return res.json({ success: false, errors: errmessage });
  }

  // ユーザー認証
  const userfile = path.join(__dirname, 'private', 'userinfo.txt');
  if (fs.existsSync(userfile)) {
    const users = fs.readFileSync(userfile, 'utf-8').split('\n');
    let authenticated = false;

    for (const user of users) {
      const [email, hashedPassword] = user.split(',');

      if (email === req.body.e && bcrypt.compareSync(req.body.p, hashedPassword)) {
        authenticated = true;
        req.session.e = req.body.e; // セッションにユーザー情報を保存
        break;
      }
    }

    if (authenticated) {
      return res.json({ success: true });
    } else {
      errmessage.push("ユーザー名またはパスワードが正しくありません。");
      return res.json({ success: false, errors: errmessage });
    }
  } else {
    errmessage.push("ユーザーリストファイルが見つかりません。");
    return res.json({ success: false, errors: errmessage });
  }
});

app.get('/login.php', (req, res) => {
  exec('php-cgi ' + path.join(__dirname, './public/login.php'), (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing PHP: ${error}`);
      return res.status(500).send('Internal Server Error');
    }
    res.type('html').send(stdout);
  });
});



// 静的ファイルの提供
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
  response.send('Hello World!');
});


app.get('/select.html', (request, req) => {
    if (req.url == '/') {
        filePath = '/select.html';
      } else {
        filePath = req.url;
      }
      var fullPath = __dirname + filePath;
    
      res.writeHead(200, {"Content-Type": mime[path.extname(fullPath)] || "text/plain"});
      fs.readFile(fullPath, function(err, data) {
        if (err) {
          // エラー時の応答
        } else {
          res.end(data, 'UTF-8');
        }
      });
});

app.listen(8080, () => {
  console.log('server running on port 8080');
});

//メイリー追加
//const path = require('path')
//↓これでpublicフォルダ内にあるファイルを表示できる


app.get('/input/list', (req, res) => {
  res.sendFile(__dirname + '/public/input-list.html');
  console.log(`Hello, ${req.query.name}`);
})


app.get('/quiz/select', (req, res) => {
  res.sendFile(__dirname + '/public/select.html');
})

app.get('/quiz/list', (req, res) => {
  res.sendFile(__dirname + '/public/quiz-list.html');
})