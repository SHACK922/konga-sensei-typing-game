// ゲーム設定
const GAME_TIME = 60;
const PRODUCTS = [
    { name: '咲耶', price: 200 },
    { name: 'ネム', price: 260 },
    { name: 'シャオラン', price: 280 },
    { name: 'コンガ', price: 300 },
    { name: '岩爺', price: 2 },
    { name: 'エマ', price: 1000 },
    { name: 'タルト', price: 900 },
    { name: 'リーリー', price: 100 },
    { name: 'ミタマ', price: 400 },
    { name: 'ナルカミ', price: 300 },
    { name: 'アトザ', price: 130 },
    { name: 'アウン', price: 290 },
    { name: 'カルマ', price: 240 },
    { name: '狐白', price: 22 },
    { name: '結', price: 170 },
    { name: 'ハヤテ', price: 140 },
    { name: '弁天', price: 21 },
    { name: 'ひなのじょう', price: 110 },
    { name: '甲賀', price: 100 },
    { name: '雑賀', price: 200 },
    { name: '伊賀', price: 300 },
    { name: '風魔', price: 400 },
    { name: '甲賀シティ', price: 500 },
    { name: '口寄せの術', price: 600 },
    { name: 'シシャソセイシュジュツチュウ', price: 700 },
    { name: 'えほう巻', price: 350 },
    { name: 'クリプト絵巻', price: 3 },
    { name: '大きなカエル', price: 250 },
    { name: '咲耶！撮影をやめろ', price: 333 },
    { name: 'フルーツサンド', price: 500 },
    { name: 'はじめての任務', price: 100 },
    { name: 'ライジョウシャスウゾウショクチュウブンシン', price: 600 },
    { name: '分身の術', price: 222 },
    { name: '風魔忍者', price: 45 },
    { name: '手裏剣', price: 198 },
    { name: '火の玉', price: 30 },
    { name: 'かわり身の術', price: 666 },
    { name: 'フクロウ', price: 777 },
    { name: 'ひょうろう丸', price: 130 },
    { name: '刃', price: 100 },
    { name: '伝説の忍者', price: 100 },
    { name: 'ほろびの術', price: 438 },
    { name: '忘却の忍術', price: 30 },
    { name: 'シノビマート', price: 3000 },
    { name: 'フリースタイルラップバトル', price: 800 },
    { name: 'YoYo!', price: 900 },
    { name: 'きつね', price: 300 },
    { name: '巨大化', price: 500 },
    { name: '火の龍', price: 600 },
    { name: '忍者やしき', price: 1500 },
    { name: '魚肉ソーセージ', price: 138 },
    { name: '鬼', price: 20 },
    { name: '鬼道衆', price: 24 },
    { name: 'クリプトニンジャ咲耶', price: 12 },
    { name: '鬼チューブ', price: 512 },
    { name: '鬼のパンツ', price: 375 },
    { name: 'チェンジ', price: 4 },
    { name: '咲耶です。忍びません', price: 1 },
    { name: 'コンガ師匠、お願いしますよ', price: 6 },
    { name: '大ピンチ！風魔シティ', price: 7 },
    { name: '岩爺の力', price: 8 },
    { name: '戦の始まり', price: 9 },
    { name: 'バトル', price: 10 },
    { name: 'さよなら、おじいちゃん', price: 11 },
    { name: '大丈夫', price: 13 },
    { name: '新たなる戦い', price: 15 },
    { name: '二人のハヤテ', price: 16 },
    { name: '甲賀の宝物', price: 17 },
    { name: 'アウンとアトザ', price: 18 },
    { name: 'おまつり', price: 19 },
    { name: '咲耶VS狐白', price: 23 },
    { name: '滅びの術', price: 25 },
    { name: '大団円', price: 26 }
];

// ゲーム状態
let gameState = {
    currentScreen: 'title',
    timeRemaining: GAME_TIME,
    score: 0,
    mistakes: 0,
    correctInputs: 0,
    currentProduct: null,
    inputPhase: 'name', // 'name' または 'price'
    gameTimer: null,
    isGameRunning: false,
    justCleared: false // 入力欄がクリアされたばかりかのフラグ
};

// DOM要素
const elements = {
    titleScreen: document.getElementById('title-screen'),
    gameScreen: document.getElementById('game-screen'),
    resultScreen: document.getElementById('result-screen'),
    startButton: document.getElementById('start-button'),
    retryButton: document.getElementById('retry-button'),
    timer: document.getElementById('timer'),
    score: document.getElementById('score'),
    mistakes: document.getElementById('mistakes'),
    currentProduct: document.getElementById('current-product'),
    currentPrice: document.getElementById('current-price'),
    typingInput: document.getElementById('typing-input'),
    typedText: document.getElementById('typed-text'),
    remainingText: document.getElementById('remaining-text'),
    progressIndicator: document.querySelector('.progress-text'),
    finalScore: document.getElementById('final-score'),
    correctCount: document.getElementById('correct-count'),
    finalMistakes: document.getElementById('final-mistakes'),
    accuracy: document.getElementById('accuracy'),
    resultComment: document.getElementById('result-comment')
};

// 初期化
function init() {
    // ローディング画面を表示し、4秒後にタイトル画面に遷移
    showLoadingScreen();
    
    elements.startButton.addEventListener('click', startGame);
    elements.retryButton.addEventListener('click', resetGame);
    elements.typingInput.addEventListener('input', handleInput);
    elements.typingInput.addEventListener('keydown', handleKeyDown);
}

// ローディング画面表示
function showLoadingScreen() {
    // 最初はローディング画面を表示
    elements.titleScreen.classList.add('hidden');
    elements.gameScreen.classList.add('hidden');
    elements.resultScreen.classList.add('hidden');
    
    // 7秒後にタイトル画面に遷移（カットイン演出完了後）
    setTimeout(() => {
        document.getElementById('loading-screen').style.opacity = '0';
        document.getElementById('loading-screen').style.transition = 'opacity 0.5s ease-out';
        
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
            elements.titleScreen.classList.remove('hidden');
        }, 500);
    }, 7000);
}

// ゲーム開始
function startGame() {
    gameState.isGameRunning = true;
    gameState.timeRemaining = GAME_TIME;
    gameState.score = 0;
    gameState.mistakes = 0;
    gameState.correctInputs = 0;
    gameState.inputPhase = 'name';
    
    showScreen('game');
    selectRandomProduct();
    updateDisplay();
    startTimer();
    elements.typingInput.focus();
}

// 画面切り替え
function showScreen(screenName) {
    elements.titleScreen.classList.add('hidden');
    elements.gameScreen.classList.add('hidden');
    elements.resultScreen.classList.add('hidden');
    
    switch(screenName) {
        case 'title':
            elements.titleScreen.classList.remove('hidden');
            break;
        case 'game':
            elements.gameScreen.classList.remove('hidden');
            break;
        case 'result':
            elements.resultScreen.classList.remove('hidden');
            break;
    }
    gameState.currentScreen = screenName;
}

// ランダム商品選択
function selectRandomProduct() {
    const randomIndex = Math.floor(Math.random() * PRODUCTS.length);
    gameState.currentProduct = PRODUCTS[randomIndex];
    elements.currentProduct.textContent = gameState.currentProduct.name;
    elements.currentPrice.textContent = gameState.currentProduct.price;
}

// タイマー開始
function startTimer() {
    gameState.gameTimer = setInterval(() => {
        gameState.timeRemaining--;
        updateDisplay();
        
        if (gameState.timeRemaining <= 0) {
            endGame();
        }
    }, 1000);
}

// 表示更新
function updateDisplay() {
    elements.timer.textContent = gameState.timeRemaining;
    elements.score.textContent = gameState.score;
    elements.mistakes.textContent = gameState.mistakes;
    
    // 進行状況表示
    if (gameState.inputPhase === 'name') {
        elements.progressIndicator.textContent = '商品名を入力してEnterキー';
        elements.typingInput.placeholder = '商品名を入力';
    } else {
        elements.progressIndicator.textContent = '金額を入力してEnterキー';
        elements.typingInput.placeholder = '金額を入力';
    }
}

// 入力処理
function handleInput(event) {
    if (!gameState.isGameRunning) return;
    
    // 入力欄がクリアされたばかりの場合は処理をスキップ
    if (gameState.justCleared) {
        gameState.justCleared = false;
        return;
    }
    
    const inputValue = event.target.value;
    const targetText = gameState.inputPhase === 'name' 
        ? gameState.currentProduct.name 
        : gameState.currentProduct.price.toString();
    
    updateInputFeedback(inputValue, targetText);
}

// 入力フィードバック更新
function updateInputFeedback(inputValue, targetText) {
    let typedCorrect = '';
    let remaining = '';
    let hasError = false;
    
    for (let i = 0; i < Math.max(inputValue.length, targetText.length); i++) {
        if (i < inputValue.length && i < targetText.length) {
            if (inputValue[i] === targetText[i]) {
                typedCorrect += inputValue[i];
            } else {
                hasError = true;
                break;
            }
        } else if (i >= inputValue.length) {
            remaining += targetText[i];
        }
    }
    
    if (hasError) {
        elements.typedText.innerHTML = typedCorrect + '<span class="error-text">' + inputValue.slice(typedCorrect.length) + '</span>';
        elements.remainingText.textContent = targetText.slice(inputValue.length);
    } else {
        elements.typedText.textContent = typedCorrect;
        elements.remainingText.textContent = remaining;
    }
}

// キー入力処理
function handleKeyDown(event) {
    if (!gameState.isGameRunning) return;
    
    if (event.key === 'Enter') {
        // IME変換中かどうかをチェック
        if (event.isComposing || event.keyCode === 229) {
            // IME変換確定のEnterの場合は何もしない
            return;
        }
        
        event.preventDefault();
        const inputValue = elements.typingInput.value.trim();
        const targetText = gameState.inputPhase === 'name' 
            ? gameState.currentProduct.name 
            : gameState.currentProduct.price.toString();
        
        if (inputValue === targetText) {
            // 正解 - 即座に入力欄をクリア
            gameState.justCleared = true;
            elements.typingInput.value = '';
            elements.typedText.textContent = '';
            elements.remainingText.textContent = '';
            handleCorrectInput();
        } else if (inputValue !== '') {
            // 間違い
            handleIncorrectInput();
        }
    }
}

// 正解処理
function handleCorrectInput() {
    gameState.correctInputs++;
    
    if (gameState.inputPhase === 'name') {
        // 商品名が正解 → 金額入力フェーズへ
        gameState.inputPhase = 'price';
        gameState.score += 5; // 商品名正解で5点
    } else {
        // 金額も正解 → 次の商品へ
        gameState.score += 10; // 金額正解で10点（合計15点）
        gameState.inputPhase = 'name';
        selectRandomProduct();
    }
    
    updateDisplay();
    
    // 入力欄にフォーカスを戻す
    setTimeout(() => {
        elements.typingInput.focus();
    }, 50);
}

// 間違い処理
function handleIncorrectInput() {
    gameState.mistakes++;
    elements.typingInput.value = '';
    elements.typedText.textContent = '';
    elements.remainingText.textContent = '';
    updateDisplay();
    
    // エラーフィードバック
    elements.typingInput.style.borderColor = '#c44536';
    setTimeout(() => {
        elements.typingInput.style.borderColor = '#d4c4a8';
    }, 500);
}

// ゲーム終了
function endGame() {
    gameState.isGameRunning = false;
    clearInterval(gameState.gameTimer);
    
    // 結果計算
    const totalAttempts = gameState.correctInputs + gameState.mistakes;
    const accuracy = totalAttempts > 0 ? Math.round((gameState.correctInputs / totalAttempts) * 100) : 0;
    
    // 結果画面更新
    elements.finalScore.textContent = gameState.score;
    elements.correctCount.textContent = gameState.correctInputs;
    elements.finalMistakes.textContent = gameState.mistakes;
    elements.accuracy.textContent = accuracy + '%';
    
    // コメント生成
    let comment = '';
    if (accuracy >= 90) {
        comment = 'すばらしい！レジ打ちの達人ですね！';
    } else if (accuracy >= 75) {
        comment = 'よくできました！もう少しで達人です！';
    } else if (accuracy >= 50) {
        comment = 'まずまずです。練習を続けましょう！';
    } else {
        comment = 'まだまだ修行が必要ですね。頑張りましょう！';
    }
    elements.resultComment.textContent = comment;
    
    showScreen('result');
}

// ゲームリセット
function resetGame() {
    clearInterval(gameState.gameTimer);
    gameState.isGameRunning = false;
    showScreen('title');
}

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', init);