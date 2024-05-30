const subjectList = ["yo", "tú", "ella", "nosotros", "vosotras", "ustedes"];
/*const conjugationList = [
  ["VIVIR | 住む", "vivo", "vives", "vive", "vivimos", "vivís", "viven"],
  ["COMER | 食べる", "como", "comes", "come", "comemos", "coméis", "comen"],
["ESTUDIAR | 勉強する]","estudio", "estudias","estudia","estudiamos","estudiáis", "estudian"],
  ["VER | 見る", "veo", "ves",'ve', 'vemos', "veis", "ven" ],
  ["ESCUCHAR | 歌う", "escucho", "escuchas", "escucha", "escuchamos", "escucháis", "escuchan"]
];
*/

//URLに含まれるすべてのパラメータを取得する
const params = new URLSearchParams(window.location.search);

//その中で指定したキー（この場合はlevel）に対応する値を取得する
const paramLevel = params.get('level');
console.log(paramLevel, 'paramLevel');

//conjugationListを取得する
import {conjugationList} from '/conjugationList.js';
//conjugatinoListからparamLevelをキーにもつ活用が入った配列を取得する
const newConjugationList = conjugationList[paramLevel]

/*主語と動詞の部分とかを取得する*/
const verbName = document.getElementById("verb_name");
const s1 = document.getElementById("s1");
const s2 = document.getElementById("s2");
const s3 = document.getElementById("s3");
const s4 = document.getElementById("s4");
const s5 = document.getElementById("s5");
const s6 = document.getElementById("s6");
const v1 = document.getElementById("v1");
const v2 = document.getElementById("v2");
const v3 = document.getElementById("v3");
const v4 = document.getElementById("v4");
const v5 = document.getElementById("v5");
const v6 = document.getElementById("v6");

const end_txt = document.getElementById("end_txt")
let verbNumber = 0;

/*スタート画面とbgm取得 */
const startButton = document.getElementById('startButton');
const start_title = document.getElementById('start_title');
const start_description = document.getElementById('start_description');
const backgroundMusic = new Audio('/audio_bgm_input.mp3');

/*最初のスタートボタン押された時の処理*/
startButton.addEventListener('click', () => {
    /*スタート画面消す*/
    startButton.style.display = 'none';
    start_title.style.display = 'none';
    start_description.style.display = 'none';

    /*cssファイルを変える*/
    document.querySelector("link[href='/input.css']").href = "/practice.css";
    /*bgmスタートする*/
    backgroundMusic.play();
    setContent();
    /*時間指定して繰り返し処理する*/
    const interval = setInterval(setContent, 16000);
    /*繰り返したい処理ここから*/
  function setContent() {
    //練習終了後に表示するもの
    if (verbNumber === newConjugationList.length) {
      clearInterval(interval);
      end_txt.innerHTML = "Muy bien! <br> お疲れさまでした💫";
      verbName.textContent = "";
      s1.textContent = "";
      s2.textContent = "";
      s3.textContent = "";
      s4.textContent = "";
      s5.textContent = "";
      s6.textContent = "";

      v1.textContent = "";
      v2.textContent = "";
      v3.textContent = "";
      v4.textContent = "";
      v5.textContent = "";
      v6.textContent = "";

  } else {
      verbName.textContent = newConjugationList[verbNumber][0];
      /*主語と動詞の表示を更新する*/
      s1.textContent = subjectList[0];
      s2.textContent = subjectList[1];
      s3.textContent = subjectList[2];
      s4.textContent = subjectList[3];
      s5.textContent = subjectList[4];
      s6.textContent = subjectList[5];

      v1.textContent = newConjugationList[verbNumber][1];
      v2.textContent = newConjugationList[verbNumber][2];
      v3.textContent = newConjugationList[verbNumber][3];
      v4.textContent = newConjugationList[verbNumber][4];
      v5.textContent = newConjugationList[verbNumber][5];
      v6.textContent = newConjugationList[verbNumber][6];

      verbNumber++;
  }
  }
  /*ここまで*/

})






/*
  s1.textContent = '';
  s2.textContent = '';
  s3.textContent = '';
  s4.textContent = '';
  s5.textContent = '';
  s6.textContent = '';

  v1.textContent = '';
  v2.textContent = '';
  v3.textContent = '';
  v4.textContent = '';
  v5.textContent = '';
  v6.textContent = '';
*/
