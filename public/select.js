///////////モードについて///////////
//各モードのデータ
let quizDataEsp;
import { quizDataAr } from './quizDataAr.js';
import { quizDataIr } from './quizDataIr.js';
import { quizDataEr } from './quizDataEr.js';
import { quizDataHukisoku } from './quizDataHukisoku.js';

//URLに含まれるすべてのパラメータを取得する
const params = new URLSearchParams(window.location.search);

//その中で指定したキー（この場合はmode）に対応する値を取得する
const quizMode = params.get('mode');
console.log(quizMode);
if(quizMode === "ar"){
    quizDataEsp = quizDataAr;
}else if(quizMode === "ir"){
    quizDataEsp = quizDataIr;
}else if(quizMode === "er"){
    quizDataEsp = quizDataEr;
}else if(quizMode === "hukisoku"){
    quizDataEsp = quizDataHukisoku;
};
/////////////////////////////////////////
//総クイズ数
let quizDataNum = quizDataEsp.length;
console.log(quizDataNum);

//今のクイズ番号
let quizNum = 0;
console.log(quizNum);

//間違った問題の配列
let incorrectQs = [];

//選択肢要素取得
const selectButton1 = document.getElementById('select1');
const selectButton2 = document.getElementById('select2');
const selectButton3 = document.getElementById('select3');
let text1 = document.getElementById('text1');
let text2 = document.getElementById('text2');
let text3 = document.getElementById('text3');

text1.innerHTML = quizDataEsp[quizNum]["1"];
text2.innerHTML = quizDataEsp[quizNum]["2"];
text3.innerHTML = quizDataEsp[quizNum]["3"];
//質問文要素取得
const questionElm = document.getElementById('question');
//正解文要素取得
const correctText = document.getElementById('correctText');
 // 質問文を表示
questionElm.innerHTML = quizDataEsp[quizNum]["question"];  
//次の問題へのボタン取得
const nextElm = document.getElementById('nextSelect');
let next= document.getElementById('next');

//リザルト取得
let result = document.getElementById('result');
let result2 = document.getElementById('result2');
////////////////////////////////////////
//解答
let correct;

//回答と解答を取得し、正誤判定
function judge(selectedValue){
    correct = quizDataEsp[quizNum]["correct"];
    select1.style.visibility = "hidden";
    select2.style.visibility = "hidden";
    select3.style.visibility = "hidden";
    //正解
    if(selectedValue == correct){
        questionElm.innerHTML = "正解";
        correctText.style.visibility = "visible";
        correctText.innerHTML = quizDataEsp[quizNum]["display"];
        quizNum++; 
    //不正解
    }else{
        questionElm.innerHTML = "不正解!もう一度！";
        next.innerHTML = "←"
        if(incorrectQs.includes(quizDataEsp[quizNum]["display"])){
        }else{
        incorrectQs.push(quizDataEsp[quizNum]["display"]);
        };
        console.log(incorrectQs);
    }
}
selectButton1.addEventListener('click',event =>{
    event.preventDefault();
    judge("1");
});
selectButton2.addEventListener('click',event =>{
    event.preventDefault();
    judge("2");
});
selectButton3.addEventListener('click',event =>{
    event.preventDefault();
    judge("3");
});
//////////////////////////////////////////////

//問題をロード
nextElm.addEventListener('click',event =>{
    correctText.style.visibility = "hidden";
    if(quizNum < quizDataNum){
    event.preventDefault();
    console.log(quizNum);
    select1.style.visibility = "visible";
    select2.style.visibility = "visible";
    select3.style.visibility = "visible";
    // 選択肢を表示
    text1.innerHTML = quizDataEsp[quizNum]["1"];
    text2.innerHTML = quizDataEsp[quizNum]["2"];
    text3.innerHTML = quizDataEsp[quizNum]["3"];
    // 質問文を表示
    questionElm.innerHTML = quizDataEsp[quizNum]["question"];  
    next.innerHTML = "次の問題へ"
    }else{
        questionElm.innerHTML = "リザルト"; 
        nextElm.style.visibility = "hidden";
        result.innerHTML = "正解数："+(quizDataNum-incorrectQs.length);
        result2.innerHTML = "間違えた問題"

        for (var i = 0; i < incorrectQs.length; i++) { 
        var incorrectList = document.createElement('h3'); 
        incorrectList.textContent = incorrectQs[i]; 
        result3.appendChild(incorrectList); 
        }   
    };
});


/*
    if(quizNum < quizDataNum-1){
        quizNum++; 
    }
    console.log(quizNum);
selectButton1.addEventListener('click',selectedEvent,false);
selectButton2.addEventListener('click',selectedEvent,false);
selectButton3.addEventListener('click',selectedEvent,false);
*/

//////////anim/////////////////
/*
const shape = document.querySelector(".shape");

//角度の初期状態(0°)
let angle = 0;

function drawCircle() {
    //角度が365°未満のとき
    if( angle < 365 ) {
        //角度を2°ずつ増やす
        angle += 10;
        //角度をconic-gradientの角度に代入
        shape.style.backgroundImage = `conic-gradient(black ${angle}deg, white ${angle}deg)`;
        //requestAnimationFrameを再度呼び出す
        requestAnimationFrame(drawCircle);
    } else {
        console.log("アニメーションが終了しました");
    }
}

//アニメーションを開始
requestAnimationFrame(drawCircle);
*/
/////////////////////////////////////


/*
function selectedEvent(){
    correct = quizDataEsp[quizNum]["correct"];
    selectedValue = "1";
    select1.style.visibility = "hidden";
    select2.style.visibility = "hidden";
    select3.style.visibility = "hidden";
    //正解
    if(selectedValue == correct){
        //location.replace("./correct.html");
        questionElm.innerHTML = "正解";
        correctNum ++;
    //不正解
    }else{
        //location.replace("./incorrect.html");
        questionElm.innerHTML = "不正解";
    }
}
*/
