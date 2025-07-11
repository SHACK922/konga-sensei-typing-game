// ゲーム設定
const GAME_TIME = 60;
const PRODUCTS = [
    { name: 'みかん', price: 150 },
    { name: 'おにぎり', price: 120 },
    { name: 'きゅうり', price: 80 },
    { name: 'さしみ', price: 500 },
    { name: 'たまご', price: 200 },
    { name: 'お茶', price: 100 },
    { name: 'お弁当', price: 480 },
    { name: '牛乳', price: 250 },
    { name: 'パン', price: 180 },
    { name: '豆腐', price: 90 },
    { name: '味噌', price: 350 },
    { name: '醤油', price: 400 },
    { name: '塩', price: 70 },
    { name: '砂糖', price: 130 },
    { name: '米', price: 800 },
    { name: '魚', price: 650 },
    { name: '肉', price: 720 },
    { name: '野菜', price: 230 },
    { name: '果物', price: 300 },
    { name: '菓子', price: 280 }
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