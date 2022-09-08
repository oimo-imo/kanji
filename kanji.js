let quizData = {};
let currentQuizNo = 0;
let correctCount = 0;

//問題データの取得
get_quiz_data();

//トップ画面の生成
generate_top_content();

//問題開始のイベント設定
register_start_event();

//問題のデータを取得する
function get_quiz_data(){
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
            quizData = xhr.response;
    }
    xhr.open('GET', 'quiz.json');
    xhr.responseType = "json";
    xhr.send();
}

//問題開始のイベントを設定する
function register_start_event(){
    document.querySelector(".quiz-start").addEventListener("click", function(){
        //問題画面の生成
        generate_quiz_content();
        //
        refiste_choice_event();
    }, false);
}

//問題の選択肢を選択したときのイベントを設定する
function register_choice_event() {
    for (var i = 0; i < document.querySelectorAll('.p-choice').length; i++) {
        document.querySelectorAll('.p-choice')[i].addEventListener('click', function(e) {
            // 回答・解説画面の生成
            generate_answer_content(parseFloat(this.getAttribute('data-quiz_choice')));
            // 未回答の問題がある場合
            if(currentQuizNo + 1 < quizData['quiz'].length) {
                // 次の問題へ遷移するときのイベント設定
                register_nextquiz_event();
            // 全て回答済の場合
            } else {
                // 結果画面へ遷移するときのイベント設定
                register_result_event();
            }
        }, false);
    }
}

//次の問題へ遷移するときのイベントを設定する
function register_nextquiz_event() {
    document.querySelector('.quiz_next').addEventListener('click', function(){
        currentQuizNo++;
        // 問題画面の生成
        generate_quiz_content();
        // 問題の選択肢を選択したときのイベント設定
        register_choice_event();
    }, false);
}

//結果画面へ遷移するときのイベントを設定する
function register_result_event() {
    document.querySelector('.js-quiz-result').addEventListener('click', function() {
        // 結果画面の生成
        generate_result_content();
        // トップへ遷移するときのイベント設定
        register_top_event();
    }, false);
}

//トップへ遷移するときのイベントを設定する
function register_top_event() {
    document.querySelector('.js-quiz-top').addEventListener('click', function() {
        // 値のリセット
        currentQuizNo = 0;
        correctCount = 0;
        // トップ画面の生成
        generate_top_content();
        // 問題開始のイベント設定
        register_start_event();
    }, false);
}

//トップ画面を生成する
function generate_top_content() {
    var ins = '<h2 class="quiz_ttl">漢字読み方クイズ</h2>';
    ins += '<div class="quiz_next">';
        ins += '<button class="quiz-start">はじめる</button>';
    ins += '</div>';

    document.querySelector('.quiz_content').innerHTML = ins;
}

//問題画面を生成する
function generate_quiz_content() {
    var ins = '<h2 class="p-ttl">' + quizData['quiz'][currentQuizNo]['q'] + '</h2>';
    ins += '<ol vlass="p-choice">';
        for (var i = 0; i < quizData['quiz'][currentQuizNo]['a'].length; i++) {
            ins += '<li class="choice-item">';
                ins += '<button class="choicr-btn"' + (i+1) + '">' + quizData['quiz'][currentQuizNo]['a'][i] + '</button>';
            ins += '</li>';
        }
    ins += '</ol>';
 
    document.querySelector('.quiz_content').innerHTML = ins;
}





