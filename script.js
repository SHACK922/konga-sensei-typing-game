// ゲーム設定
const GAME_TIME = 60;

// 半角数字を全角数字に変換する関数
function toFullWidth(str) {
    return str.replace(/[0-9]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
    });
}

// 称号システム
const TITLES = [
    { minScore: 0, name: 'レジ打ち研修中', color: '#8b5a2b', icon: '🦍' },
    { minScore: 50, name: 'バーコード読み取り名人', color: '#4a7c59', icon: '🦍' },
    { minScore: 100, name: '袋詰めマスター', color: '#ff6b9d', icon: '🦍' },
    { minScore: 150, name: 'お弁当温め職人', color: '#ffa726', icon: '🦍' },
    { minScore: 200, name: '公共料金取扱士', color: '#42a5f5', icon: '🦍' },
    { minScore: 250, name: '収入印紙マスター', color: '#ab47bc', icon: '🥷' },
    { minScore: 300, name: '秘伝の継承者', color: '#c44536', icon: '🥷' },
    { minScore: 350, name: '店長', color: '#d4af37', icon: '🥷' },
    { minScore: 400, name: '伝説の忍', color: '#2c1810', icon: '🥷' },
    { minScore: 450, name: 'コンガ流免許皆伝', color: '#8b0000', icon: '🥷' },
    { minScore: 500, name: 'シノビマートの神', color: '#ffd700', icon: '🥷' }
];
const DIFFICULTY_SETTINGS = {
    genin: { questionTimeLimit: null, name: '下忍' },
    chunin: { questionTimeLimit: 10, name: '中忍' },
    jonin: { questionTimeLimit: 5, name: '上忍' }
};
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
    { name: '大団円', price: 26 },
    { name: '咲耶です。元気です', price: 26 },
    { name: 'アプリかよ', price: 27 },
    { name: 'コンガ祐三', price: 28 }
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
    questionTimer: null,
    isGameRunning: false,
    justCleared: false, // 入力欄がクリアされたばかりかのフラグ
    difficulty: null,
    questionTimeRemaining: null,
    shurikenPoints: 0, // 手裏剣メーターポイント
    currentBGM: null, // 現在再生中のBGM
    audioEnabled: false // 音楽が有効かどうか
};

// DOM要素
const elements = {
    titleScreen: document.getElementById('title-screen'),
    difficultyScreen: document.getElementById('difficulty-screen'),
    readyScreen: document.getElementById('ready-screen'),
    countdownScreen: document.getElementById('countdown-screen'),
    gameScreen: document.getElementById('game-screen'),
    resultScreen: document.getElementById('result-screen'),
    startButton: document.getElementById('start-button'),
    retryButton: document.getElementById('retry-button'),
    countdownNumber: document.getElementById('countdown-number'),
    questionTimer: document.getElementById('question-timer'),
    questionTime: document.getElementById('question-time'),
    meterFill: document.getElementById('meter-fill'),
    meterPoints: document.getElementById('meter-points'),
    timer: document.getElementById('timer'),
    score: document.getElementById('score'),
    mistakes: document.getElementById('mistakes'),
    currentProduct: document.getElementById('current-product'),
    currentPrice: document.getElementById('current-price'),
    typingInput: document.getElementById('typing-input'),
    typedText: document.getElementById('typed-text'),
    remainingText: document.getElementById('remaining-text'),
    progressIndicator: document.querySelector('.progress-indicator'),
    progressText: document.querySelector('.progress-text'),
    titleIcon: document.getElementById('title-icon'),
    earnedTitle: document.getElementById('earned-title'),
    achievementLevel: document.getElementById('achievement-level'),
    nextTitleName: document.getElementById('next-title-name'),
    progressFill: document.getElementById('progress-fill'),
    progressTextResult: document.getElementById('progress-text'),
    finalScore: document.getElementById('final-score'),
    correctCount: document.getElementById('correct-count'),
    finalMistakes: document.getElementById('final-mistakes'),
    accuracy: document.getElementById('accuracy'),
    
    // ランキング関連要素
    rankingScreen: document.getElementById('ranking-screen'),
    rankingButton: document.getElementById('ranking-button'),
    resultRankingButton: document.getElementById('result-ranking-button'),
    rankingBackButton: document.getElementById('ranking-back-button'),
    overallTab: document.getElementById('overall-tab'),
    weeklyTab: document.getElementById('weekly-tab'),
    rankingList: document.getElementById('ranking-list'),
    
    // 名前入力モーダル関連要素
    nameInputModal: document.getElementById('name-input-modal'),
    achievedRankNumber: document.getElementById('achieved-rank-number'),
    achievedScore: document.getElementById('achieved-score'),
    playerName: document.getElementById('player-name'),
    saveRankingButton: document.getElementById('save-ranking-button'),
    skipRankingButton: document.getElementById('skip-ranking-button')
};

// 初期化
function init() {
    // 週間ランキングのリセットチェック
    RankingManager.checkWeeklyReset();
    
    // ユーザーインタラクションで音楽を有効化
    setupAudioActivation();
    
    // ローディング画面を表示し、7秒後にタイトル画面に遷移
    showLoadingScreen();
    
    elements.startButton.addEventListener('click', showDifficultyScreen);
    elements.retryButton.addEventListener('click', resetGame);
    elements.typingInput.addEventListener('input', handleInput);
    elements.typingInput.addEventListener('keydown', handleKeyDown);
    
    // X投稿ボタンのイベントリスナー
    const shareButton = document.getElementById('share-button');
    if (shareButton) {
        shareButton.addEventListener('click', shareToX);
    }
    
    // ランキング関連のイベントリスナー
    if (elements.rankingButton) {
        elements.rankingButton.addEventListener('click', showRankingScreen);
    }
    if (elements.resultRankingButton) {
        elements.resultRankingButton.addEventListener('click', showRankingScreen);
    }
    if (elements.rankingBackButton) {
        elements.rankingBackButton.addEventListener('click', () => {
            showScreen('title');
        });
    }
    if (elements.overallTab) {
        elements.overallTab.addEventListener('click', () => switchRankingTab('overall'));
    }
    if (elements.weeklyTab) {
        elements.weeklyTab.addEventListener('click', () => switchRankingTab('weekly'));
    }
    
    // 名前入力モーダルのイベントリスナー
    if (elements.saveRankingButton) {
        elements.saveRankingButton.addEventListener('click', savePlayerRanking);
    }
    if (elements.skipRankingButton) {
        elements.skipRankingButton.addEventListener('click', skipRankingInput);
    }
    
    // 難易度選択ボタンイベント
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const difficulty = e.currentTarget.dataset.difficulty;
            selectDifficulty(difficulty);
        });
    });
    
    // グローバルEnterキーイベント
    document.addEventListener('keydown', handleGlobalKeyDown);
    
    // ゲーム画面クリック時に入力欄にフォーカス
    elements.gameScreen.addEventListener('click', () => {
        if (gameState.isGameRunning && elements.typingInput) {
            elements.typingInput.focus();
        }
    });
}

// ローディング画面表示
function showLoadingScreen() {
    // 最初はローディング画面を表示
    elements.titleScreen.classList.add('hidden');
    elements.gameScreen.classList.add('hidden');
    elements.resultScreen.classList.add('hidden');
    
    // 音楽が有効ならコンビニ入店メロディーを再生
    console.log('ローディング画面でコンビニ入店メロディを再生開始');
    tryPlayLoadingSound();
    
    // 音楽有効化のメッセージを表示
    if (!gameState.audioEnabled) {
        showAudioPrompt();
    }
    
    // 7秒後にタイトル画面に遷移（カットイン演出完了後）
    setTimeout(() => {
        document.getElementById('loading-screen').style.opacity = '0';
        document.getElementById('loading-screen').style.transition = 'opacity 0.5s ease-out';
        
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
            elements.titleScreen.classList.remove('hidden');
            // タイトル画面に遷移したことを記録
            console.log('タイトル画面に遷移完了');
            
            // 音楽が有効でない場合はメッセージを表示
            if (!gameState.audioEnabled) {
                showAudioPrompt();
            }
        }, 500);
    }, 7000);
}

// 音楽有効化のセットアップ
function setupAudioActivation() {
    const events = ['click', 'keydown', 'touchstart'];
    
    function enableAudio() {
        if (!gameState.audioEnabled) {
            console.log('🎵 音楽を有効化しました');
            gameState.audioEnabled = true;
            
            // メッセージを非表示
            hideAudioPrompt();
            
            // 現在の画面に応じて音楽を再生
            console.log('🎮 現在の画面:', gameState.currentScreen);
            if (gameState.currentScreen === 'loading' || document.getElementById('loading-screen').style.display !== 'none') {
                console.log('📻 ローディング音楽を再生開始');
                playLoadingSound();
            } else if (gameState.currentScreen === 'title') {
                console.log('📻 オープニング音楽を再生開始');
                playOpeningSound();
            }
            
            // イベントリスナーを削除
            events.forEach(eventType => {
                document.removeEventListener(eventType, enableAudio);
            });
        }
    }
    
    // イベントリスナーを登録
    events.forEach(eventType => {
        document.addEventListener(eventType, enableAudio);
    });
}

// 音楽有効化メッセージ表示
function showAudioPrompt() {
    let audioPrompt = document.getElementById('audio-prompt');
    if (!audioPrompt) {
        audioPrompt = document.createElement('div');
        audioPrompt.id = 'audio-prompt';
        audioPrompt.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                font-size: 16px;
                z-index: 10000;
                text-align: center;
                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                animation: fadeInDown 0.5s ease;
            ">
                🎵 音楽を有効にするにはクリックまたはキーを押してください 🎵
            </div>
        `;
        document.body.appendChild(audioPrompt);
    }
}

// 音楽有効化メッセージ非表示
function hideAudioPrompt() {
    const audioPrompt = document.getElementById('audio-prompt');
    if (audioPrompt) {
        audioPrompt.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            audioPrompt.remove();
        }, 500);
    }
}

// ローディング音楽再生試行
function tryPlayLoadingSound() {
    if (!gameState.audioEnabled) {
        console.log('音楽が有効ではありません、ユーザーインタラクションを待機中');
        return;
    }
    playLoadingSound();
}

// ローディング音楽再生
function playLoadingSound() {
    const soundPath = './効果音/コンビニ入店メロディ.mp3';
    
    try {
        const audio = new Audio(soundPath);
        audio.volume = 0.3;
        audio.muted = false;
        
        // 音楽が終了したらオープニング音楽を再生
        audio.addEventListener('ended', () => {
            console.log('ローディング音楽終了、オープニング音楽を開始');
            setTimeout(() => {
                tryPlayOpeningSound();
            }, 500);
        });
        
        // エラー時もオープニング音楽を再生
        audio.addEventListener('error', () => {
            console.log('ローディング音楽エラー、オープニング音楽を開始');
            setTimeout(() => {
                tryPlayOpeningSound();
            }, 1000);
        });
        
        audio.play().then(() => {
            console.log('ローディング音楽再生成功');
        }).catch(error => {
            console.log('ローディング音楽再生失敗:', error);
            // 自動再生が失敗した場合もオープニング音楽を再生
            setTimeout(() => {
                tryPlayOpeningSound();
            }, 2000);
        });
    } catch (error) {
        console.log('ローディング音楽作成エラー:', error);
        // エラー時もオープニング音楽を再生
        setTimeout(() => {
            tryPlayOpeningSound();
        }, 2000);
    }
}

// オープニング音楽再生試行
function tryPlayOpeningSound() {
    if (!gameState.audioEnabled) {
        console.log('音楽が有効ではありません、ユーザーインタラクションを待機中');
        return;
    }
    playOpeningSound();
}

// オープニング音楽再生
function playOpeningSound() {
    const soundPath = './効果音/オープニング.mp3';
    
    try {
        // 既存のBGMを停止
        stopBGM();
        
        const audio = new Audio(soundPath);
        audio.volume = 0.4;
        audio.loop = true;
        audio.muted = false;
        gameState.currentBGM = audio;
        
        audio.play().then(() => {
            console.log('オープニング音楽再生成功');
        }).catch(error => {
            console.log('オープニング音楽再生失敗:', error);
        });
    } catch (error) {
        console.log('オープニング音楽作成エラー:', error);
    }
}

// 難易度選択画面表示
function showDifficultyScreen() {
    // 修行開始ボタンの効果音を再生
    if (gameState.audioEnabled) {
        playSound('./効果音/決定ボタンを押す10.mp3', 0.5);
    }
    showScreen('difficulty');
}

// 難易度選択
function selectDifficulty(difficulty) {
    // 難易度選択ボタンの効果音を再生
    if (gameState.audioEnabled) {
        playSound('./効果音/決定ボタンを押す10.mp3', 0.5);
    }
    gameState.difficulty = difficulty;
    showScreen('ready');
}

// Ready画面表示
function showReadyScreen() {
    showScreen('ready');
}

// グローバルキーイベント処理
function handleGlobalKeyDown(event) {
    if (event.key === 'Enter' && gameState.currentScreen === 'ready') {
        event.preventDefault();
        // Enterキーの効果音を再生
        if (gameState.audioEnabled) {
            playSound('./効果音/和太鼓でドドン.mp3', 0.6);
        }
        startCountdown();
    }
}

// カウントダウン開始
function startCountdown() {
    showScreen('countdown');
    
    const countNumbers = ['伍', '四', '参', '弐', '壱'];
    let currentCount = 0;
    
    function showNextCount() {
        if (currentCount < countNumbers.length) {
            // カウントダウン音を再生
            if (gameState.audioEnabled) {
                playSound('./効果音/和太鼓でドン.mp3', 0.5);
            }
            
            elements.countdownNumber.textContent = countNumbers[currentCount];
            elements.countdownNumber.style.animation = 'none';
            elements.countdownNumber.offsetHeight; // リフロー強制
            elements.countdownNumber.style.animation = 'countdownBounce 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            
            currentCount++;
            setTimeout(showNextCount, 1000);
        } else {
            // カウントダウン終了時にもう一度ドン音を再生
            if (gameState.audioEnabled) {
                playSound('./効果音/和太鼓でドン.mp3', 0.5);
            }
            
            elements.countdownNumber.classList.add('countdown-fade-out');
            
            // 0.75秒後にカカッ音を再生してゲーム開始
            setTimeout(() => {
                if (gameState.audioEnabled) {
                    playSound('./効果音/和太鼓でカカッ.mp3', 0.6);
                }
                setTimeout(startGame, 200);
            }, 750);
        }
    }
    
    showNextCount();
}

// ゲーム開始
function startGame() {
    console.log('ゲーム開始!');
    gameState.isGameRunning = true;
    gameState.timeRemaining = GAME_TIME;
    gameState.score = 0;
    gameState.mistakes = 0;
    gameState.correctInputs = 0;
    gameState.inputPhase = 'name';
    gameState.shurikenPoints = 0;
    gameState.justCleared = false;
    
    // ゲーム開始音楽を再生（BGMとして設定）
    playBGM('./効果音/任侠ゴリラ.mp3', 0.4, true);
    
    // 入力欄を即座にリセット
    if (elements.typingInput) {
        elements.typingInput.value = '';
        elements.typingInput.blur();
    }
    if (elements.typedText) {
        elements.typedText.textContent = '';
    }
    if (elements.remainingText) {
        elements.remainingText.textContent = '';
    }
    
    showScreen('game');
    
    setTimeout(() => {
        selectRandomProduct();
        updateDisplay();
        updateShurikenMeter();
        startTimer();
        
        // 入力欄を完全にリセット
        if (elements.typingInput) {
            elements.typingInput.value = '';
            elements.typingInput.focus();
        }
        if (elements.typedText) {
            elements.typedText.textContent = '';
        }
        if (elements.remainingText) {
            elements.remainingText.textContent = '';
        }
    }, 200);
}

// 画面切り替え
function showScreen(screenName) {
    elements.titleScreen.classList.add('hidden');
    elements.difficultyScreen.classList.add('hidden');
    elements.readyScreen.classList.add('hidden');
    elements.countdownScreen.classList.add('hidden');
    elements.gameScreen.classList.add('hidden');
    elements.resultScreen.classList.add('hidden');
    elements.rankingScreen.classList.add('hidden');
    
    switch(screenName) {
        case 'title':
            elements.titleScreen.classList.remove('hidden');
            break;
        case 'difficulty':
            elements.difficultyScreen.classList.remove('hidden');
            break;
        case 'ready':
            elements.readyScreen.classList.remove('hidden');
            break;
        case 'countdown':
            elements.countdownScreen.classList.remove('hidden');
            break;
        case 'game':
            elements.gameScreen.classList.remove('hidden');
            break;
        case 'result':
            elements.resultScreen.classList.remove('hidden');
            break;
        case 'ranking':
            elements.rankingScreen.classList.remove('hidden');
            break;
    }
    gameState.currentScreen = screenName;
    console.log('🎮 画面遷移:', screenName, '| audioEnabled:', gameState.audioEnabled);
}

// ランダム商品選択
function selectRandomProduct() {
    const randomIndex = Math.floor(Math.random() * PRODUCTS.length);
    gameState.currentProduct = PRODUCTS[randomIndex];
    elements.currentProduct.textContent = gameState.currentProduct.name;
    elements.currentPrice.textContent = gameState.currentProduct.price;
    
    // 全角数字の価格を保存
    gameState.currentProduct.fullWidthPrice = toFullWidth(gameState.currentProduct.price.toString());
    
    // 難易度に応じて問題タイマーを開始
    startQuestionTimer();
}

// タイマー開始
function startTimer() {
    console.log('タイマー開始 - timeRemaining:', gameState.timeRemaining);
    
    if (gameState.gameTimer) {
        clearInterval(gameState.gameTimer);
        gameState.gameTimer = null;
    }
    
    gameState.gameTimer = setInterval(() => {
        if (gameState.isGameRunning && gameState.timeRemaining > 0) {
            gameState.timeRemaining--;
            console.log('残り時間:', gameState.timeRemaining);
            updateDisplay();
            
            if (gameState.timeRemaining <= 0) {
                endGame();
            }
        }
    }, 1000);
    
    console.log('タイマー設定完了');
}

// 表示更新
function updateDisplay() {
    if (elements.timer) {
        elements.timer.textContent = gameState.timeRemaining;
    }
    if (elements.score) {
        elements.score.textContent = gameState.score;
    }
    if (elements.mistakes) {
        elements.mistakes.textContent = gameState.mistakes;
    }
    
    // 進行状況表示
    if (gameState.inputPhase === 'name') {
        if (elements.progressText) {
            elements.progressText.textContent = '商品名を入力してEnterキー';
        }
        if (elements.typingInput) {
            elements.typingInput.placeholder = '商品名を入力';
        }
    } else {
        if (elements.progressText) {
            elements.progressText.textContent = '金額を入力してEnterキー';
        }
        if (elements.typingInput) {
            elements.typingInput.placeholder = '金額を入力';
        }
    }
    
    // 問題タイマー表示切り替え
    const diffSetting = DIFFICULTY_SETTINGS[gameState.difficulty];
    if (diffSetting && diffSetting.questionTimeLimit) {
        elements.questionTimer.classList.remove('hidden');
        elements.questionTime.textContent = gameState.questionTimeRemaining || diffSetting.questionTimeLimit;
    } else {
        elements.questionTimer.classList.add('hidden');
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
        : gameState.currentProduct.fullWidthPrice;
    
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
            : gameState.currentProduct.fullWidthPrice;
        
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
    
    // 正解音を再生
    if (gameState.audioEnabled) {
        playSound('./効果音/レジスターで精算.mp3', 0.4);
    }
    
    // 問題タイマーをクリア
    clearQuestionTimer();
    
    // 手裏剣ポイント加算（Enter押下時）
    const targetText = gameState.inputPhase === 'name' 
        ? gameState.currentProduct.name 
        : gameState.currentProduct.fullWidthPrice;
    
    gameState.shurikenPoints += targetText.length;
    updateShurikenMeter();
    
    // 10ポイント達成で時間ボーナス
    if (gameState.shurikenPoints >= 10) {
        gameState.timeRemaining += 2;
        gameState.shurikenPoints -= 10;
        updateShurikenMeter();
        
        // ボーナス演出
        elements.timer.style.color = '#4a7c59';
        setTimeout(() => {
            elements.timer.style.color = '#c44536';
        }, 1000);
    }
    
    if (gameState.inputPhase === 'name') {
        // 商品名が正解 → 金額入力フェーズへ
        gameState.inputPhase = 'price';
        gameState.score += 5; // 商品名正解で5点
        startQuestionTimer(); // 金額入力の制限時間開始
    } else {
        // 金額も正解 → 次の商品へ
        gameState.score += 10; // 金額正解で10点（合計15点）
        gameState.inputPhase = 'name';
        selectRandomProduct();
    }
    
    updateDisplay();
    
    // 入力欄にフォーカスを戻す
    setTimeout(() => {
        if (elements.typingInput) {
            elements.typingInput.focus();
            elements.typingInput.value = ''; // 入力欄をクリア
        }
    }, 100);
}

// 間違い処理
function handleIncorrectInput() {
    gameState.mistakes++;
    gameState.justCleared = true;
    
    // エラー音を再生
    if (gameState.audioEnabled) {
        playSound('./効果音/ビープ音4.mp3', 0.3);
    }
    
    // 入力欄を完全にリセット
    if (elements.typingInput) {
        elements.typingInput.value = '';
    }
    if (elements.typedText) {
        elements.typedText.textContent = '';
    }
    if (elements.remainingText) {
        elements.remainingText.textContent = '';
    }
    
    updateDisplay();
    
    // エラーフィードバック
    elements.typingInput.style.borderColor = '#c44536';
    setTimeout(() => {
        elements.typingInput.style.borderColor = '#d4c4a8';
        gameState.justCleared = false;
    }, 500);
}

// ゲーム終了
function endGame() {
    gameState.isGameRunning = false;
    if (gameState.gameTimer) {
        clearInterval(gameState.gameTimer);
        gameState.gameTimer = null;
    }
    clearQuestionTimer();
    
    // 時間切れ効果音を再生
    if (gameState.audioEnabled) {
        playSound('./効果音/警官のホイッスル2.mp3', 0.5);
    }
    
    // 結果計算
    const totalAttempts = gameState.correctInputs + gameState.mistakes;
    const accuracy = totalAttempts > 0 ? Math.round((gameState.correctInputs / totalAttempts) * 100) : 0;
    
    // 称号計算
    const earnedTitle = calculateTitle(gameState.score);
    const nextTitle = getNextTitle(gameState.score);
    
    // 基本情報設定（アニメーション前）
    setupResultScreen(earnedTitle, nextTitle, accuracy);
    
    showScreen('result');
    
    // 現在のBGMを停止してリザルト音楽を再生
    stopBGM();
    setTimeout(() => {
        playBGM('./効果音/リザルト.mp3', 0.4);
    }, 200);
    
    // リザルト画面の効果音を再生
    if (gameState.audioEnabled) {
        // 1秒後に金額表示音
        setTimeout(() => {
            playSound('./効果音/金額表示.mp3', 0.5);
            
            // さらに0.5秒後に歓声と拍手音
            setTimeout(() => {
                playSound('./効果音/歓声と拍手.mp3', 0.4);
            }, 500);
        }, 1000);
    }
    
    // 段階的アニメーション開始
    startResultAnimation(accuracy);
    
    // ランキングチェック（アニメーション完了後）
    setTimeout(() => {
        checkAndShowRankingInput(gameState.score, earnedTitle);
    }, 3000);
}

// 称号計算
function calculateTitle(score) {
    // スコアに基づいて最適な称号を見つける
    for (let i = TITLES.length - 1; i >= 0; i--) {
        if (score >= TITLES[i].minScore) {
            return TITLES[i];
        }
    }
    return TITLES[0]; // 最低称号
}

// 次の称号取得
function getNextTitle(score) {
    for (let i = 0; i < TITLES.length; i++) {
        if (score < TITLES[i].minScore) {
            return TITLES[i];
        }
    }
    return null; // 最高称号を達成済み
}

// リザルト画面初期設定
function setupResultScreen(earnedTitle, nextTitle, accuracy) {
    // 称号情報設定
    if (elements.titleIcon) {
        elements.titleIcon.textContent = earnedTitle.icon;
        elements.titleIcon.style.color = earnedTitle.color;
    }
    if (elements.earnedTitle) {
        elements.earnedTitle.textContent = earnedTitle.name;
        elements.earnedTitle.style.color = earnedTitle.color;
    }
    
    // 基本統計（初期状態は0に設定）
    if (elements.finalScore) elements.finalScore.textContent = '0';
    if (elements.correctCount) elements.correctCount.textContent = '0';
    if (elements.finalMistakes) elements.finalMistakes.textContent = '0';
    if (elements.accuracy) elements.accuracy.textContent = '0%';
    
    
    // 達成度レベル設定
    let achievementLevel = '初級';
    if (accuracy >= 90) achievementLevel = '伝説級';
    else if (accuracy >= 80) achievementLevel = '上級';
    else if (accuracy >= 70) achievementLevel = '中級';
    else if (accuracy >= 50) achievementLevel = '初級';
    else achievementLevel = '研修中';
    
    if (elements.achievementLevel) {
        elements.achievementLevel.textContent = achievementLevel;
    }
    
    // 次の称号情報
    if (nextTitle) {
        const pointsNeeded = nextTitle.minScore - gameState.score;
        const progressPercentage = Math.min(100, (gameState.score % 50) / 50 * 100);
        
        if (elements.nextTitleName) {
            elements.nextTitleName.textContent = nextTitle.name;
        }
        if (elements.progressTextResult) {
            elements.progressTextResult.textContent = `あと${pointsNeeded}ポイント`;
        }
        if (elements.progressFill) {
            elements.progressFill.style.width = '0%';
        }
    } else {
        // 最高称号達成済み
        if (elements.nextTitleName) {
            elements.nextTitleName.textContent = '称号コンプリート！';
        }
        if (elements.progressTextResult) {
            elements.progressTextResult.textContent = 'おめでとうございます！';
        }
        if (elements.progressFill) {
            elements.progressFill.style.width = '100%';
        }
    }
    
}

// リザルトアニメーション開始
function startResultAnimation(accuracy) {
    // 統計項目のアニメーション（0.5秒間隔）
    const statItems = document.querySelectorAll('.stat-item');
    
    // 各統計項目を順番に表示
    statItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('show');
            
            // 数値のカウントアップアニメーション
            const valueElement = item.querySelector('.stat-value');
            if (valueElement && index < 4) { // 最初の4つの統計項目
                let targetValue;
                let suffix = '';
                
                switch (index) {
                    case 0: // スコア
                        targetValue = gameState.score;
                        break;
                    case 1: // 正確な入力数
                        targetValue = gameState.correctInputs;
                        break;
                    case 2: // ミス数
                        targetValue = gameState.mistakes;
                        break;
                    case 3: // 正確率
                        targetValue = accuracy;
                        suffix = '%';
                        break;
                }
                
                animateNumber(valueElement, 0, targetValue, 800, suffix);
            }
        }, index * 500); // 0.5秒間隔
    });
    
    // プログレスバーアニメーション
    setTimeout(() => {
        const nextTitle = getNextTitle(gameState.score);
        if (nextTitle && elements.progressFill) {
            const progressPercentage = Math.min(100, (gameState.score % 50) / 50 * 100);
            elements.progressFill.style.width = progressPercentage + '%';
        }
    }, statItems.length * 500 + 500);
}

// 数値カウントアップアニメーション
function animateNumber(element, start, end, duration, suffix = '') {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // イージング関数（ease-out）
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.round(start + (end - start) * easeOut);
        
        element.textContent = currentValue + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// ゲームリセット
function resetGame() {
    if (gameState.gameTimer) {
        clearInterval(gameState.gameTimer);
        gameState.gameTimer = null;
    }
    clearQuestionTimer();
    gameState.isGameRunning = false;
    gameState.difficulty = null;
    gameState.shurikenPoints = 0;
    gameState.justCleared = false;
    
    // 入力欄を完全にリセット
    if (elements.typingInput) {
        elements.typingInput.value = '';
        elements.typingInput.blur();
    }
    if (elements.typedText) {
        elements.typedText.textContent = '';
    }
    if (elements.remainingText) {
        elements.remainingText.textContent = '';
    }
    
    showScreen('title');
}

// 問題タイマー開始
function startQuestionTimer() {
    clearQuestionTimer();
    
    const diffSetting = DIFFICULTY_SETTINGS[gameState.difficulty];
    if (!diffSetting || !diffSetting.questionTimeLimit) {
        return; // 制限時間なしの場合は何もしない
    }
    
    gameState.questionTimeRemaining = diffSetting.questionTimeLimit;
    updateDisplay();
    
    gameState.questionTimer = setInterval(() => {
        gameState.questionTimeRemaining--;
        updateDisplay();
        
        if (gameState.questionTimeRemaining <= 0) {
            // 時間切れ：自動的に次の問題に移行
            skipToNextQuestion();
        }
    }, 1000);
}

// 問題タイマークリア
function clearQuestionTimer() {
    if (gameState.questionTimer) {
        clearInterval(gameState.questionTimer);
        gameState.questionTimer = null;
        gameState.questionTimeRemaining = null;
    }
}

// 次の問題にスキップ
function skipToNextQuestion() {
    clearQuestionTimer();
    gameState.justCleared = true;
    
    // 入力欄を完全にリセット
    if (elements.typingInput) {
        elements.typingInput.value = '';
    }
    if (elements.typedText) {
        elements.typedText.textContent = '';
    }
    if (elements.remainingText) {
        elements.remainingText.textContent = '';
    }
    
    if (gameState.inputPhase === 'name') {
        // 商品名で時間切れ → 金額入力へ
        gameState.inputPhase = 'price';
        startQuestionTimer();
    } else {
        // 金額で時間切れ → 次の商品へ
        gameState.inputPhase = 'name';
        selectRandomProduct();
    }
    
    updateDisplay();
    setTimeout(() => {
        if (elements.typingInput) {
            elements.typingInput.focus();
            elements.typingInput.value = '';
        }
        gameState.justCleared = false;
    }, 100);
}

// 手裏剣メーター更新
function updateShurikenMeter() {
    elements.meterPoints.textContent = gameState.shurikenPoints;
    const fillPercentage = (gameState.shurikenPoints / 10) * 100;
    elements.meterFill.style.width = fillPercentage + '%';
    
    // 手裏剣アイコンの表示更新
    const shurikenIcons = document.querySelectorAll('.shuriken');
    const activeCount = Math.floor(gameState.shurikenPoints / 2); // 2ポイントごとに1つ光る
    
    shurikenIcons.forEach((icon, index) => {
        if (index < activeCount) {
            icon.classList.add('active');
        } else {
            icon.classList.remove('active');
        }
    });
}

// X投稿機能
function shareToX() {
    // 現在の結果データを取得
    const earnedTitle = calculateTitle(gameState.score);
    const totalAttempts = gameState.correctInputs + gameState.mistakes;
    const accuracy = totalAttempts > 0 ? Math.round((gameState.correctInputs / totalAttempts) * 100) : 0;
    const diffName = DIFFICULTY_SETTINGS[gameState.difficulty]?.name || '不明';
    
    // 投稿テキストを生成
    const shareText = 
        `コンガ先生のレジ打ち修行で「${earnedTitle.name}」の称号を獲得！\n` +
        `📊 最終スコア: ${gameState.score}点\n` +
        `🎯 正確率: ${accuracy}%\n` +
        `⚔️ 難易度: ${diffName}\n` +
        `\n#コンガ先生のレジ打ち修行 #タイピングゲーム`;
    
    // X投稿用URLを生成
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    
    // 新しいウィンドウで開く
    window.open(shareUrl, '_blank', 'width=600,height=400');
}


// 効果音再生関数
function playSound(soundPath, volume = 0.5) {
    console.log('🎵 効果音再生開始:', soundPath, '| audioEnabled:', gameState.audioEnabled);
    
    if (!gameState.audioEnabled) {
        console.log('❌ 音楽が有効ではありません');
        return;
    }
    
    try {
        const audio = new Audio(soundPath);
        audio.volume = volume;
        audio.muted = false;
        
        // ファイル読み込み成功
        audio.addEventListener('canplaythrough', () => {
            console.log('✅ 効果音ファイル読み込み成功:', soundPath);
        });
        
        // ファイル読み込み失敗
        audio.addEventListener('error', (e) => {
            console.log('❌ 効果音ファイル読み込み失敗:', soundPath, e);
        });
        
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('✅ 効果音再生成功:', soundPath);
            }).catch(error => {
                console.log('❌ 効果音の再生に失敗:', error, soundPath);
            });
        }
    } catch (error) {
        console.log('❌ 効果音作成エラー:', error, soundPath);
    }
}

// BGM再生関数
function playBGM(soundPath, volume = 0.5, loop = false) {
    console.log('BGM再生開始:', soundPath);
    try {
        // 既存のBGMを停止
        stopBGM();
        
        const audio = new Audio(soundPath);
        audio.volume = volume;
        audio.loop = loop;
        audio.muted = false;
        gameState.currentBGM = audio;
        
        audio.play().then(() => {
            console.log('BGM再生成功:', soundPath);
        }).catch(error => {
            console.log('BGMの再生に失敗:', error, soundPath);
        });
    } catch (error) {
        console.log('BGMファイルの読み込みに失敗:', error, soundPath);
    }
}

// BGM停止関数
function stopBGM() {
    if (gameState.currentBGM) {
        gameState.currentBGM.pause();
        gameState.currentBGM.currentTime = 0;
        gameState.currentBGM = null;
    }
}

// Firebase Firestore ランキングシステム
const MAX_RANKING_SIZE = 20;

// ランキングデータ構造
class RankingEntry {
    constructor(name, score, title, difficulty, date = new Date()) {
        this.name = name;
        this.score = score;
        this.title = title;
        this.difficulty = difficulty;
        this.date = date.toISOString();
        this.timestamp = date.getTime();
        this.createdAt = null; // Firestoreサーバータイムスタンプ用
    }
}

// Firebase ランキング管理クラス
class RankingManager {
    static isFirebaseReady() {
        return typeof window.firebaseDB !== 'undefined' && window.firebaseUtils;
    }
    
    static async getRankings(type = 'overall') {
        if (!this.isFirebaseReady()) {
            console.log('Firebase not ready, using localStorage fallback');
            return this.getLocalRankings(type);
        }
        
        try {
            const { collection, getDocs, query, orderBy, limit } = window.firebaseUtils;
            const collectionName = type === 'weekly' ? 'weeklyRankings' : 'overallRankings';
            
            const q = query(
                collection(window.firebaseDB, collectionName),
                orderBy('score', 'desc'),
                limit(MAX_RANKING_SIZE)
            );
            
            const querySnapshot = await getDocs(q);
            const rankings = [];
            
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                rankings.push({
                    id: doc.id,
                    ...data,
                    date: data.date || data.createdAt?.toDate()?.toISOString() || new Date().toISOString()
                });
            });
            
            console.log(`✅ Firestore ${type} rankings loaded:`, rankings.length, 'entries');
            return rankings;
            
        } catch (error) {
            console.log('❌ Firestore読み込みエラー、localStorageにフォールバック:', error);
            return this.getLocalRankings(type);
        }
    }
    
    static async addRanking(entry, type = 'overall') {
        if (!this.isFirebaseReady()) {
            console.log('Firebase not ready, using localStorage fallback');
            return this.addLocalRanking(entry, type);
        }
        
        try {
            const { collection, addDoc, serverTimestamp } = window.firebaseUtils;
            const collectionName = type === 'weekly' ? 'weeklyRankings' : 'overallRankings';
            
            const firestoreEntry = {
                ...entry,
                createdAt: serverTimestamp(),
                type: type,
                version: '1.0'
            };
            
            const docRef = await addDoc(collection(window.firebaseDB, collectionName), firestoreEntry);
            console.log(`✅ Firestore ${type} ranking saved with ID:`, docRef.id);
            
            return await this.getRankings(type);
            
        } catch (error) {
            console.log('❌ Firestore保存エラー、localStorageにフォールバック:', error);
            return this.addLocalRanking(entry, type);
        }
    }
    
    static async isTopScore(score, type = 'overall') {
        const rankings = await this.getRankings(type);
        return rankings.length < MAX_RANKING_SIZE || score > (rankings[MAX_RANKING_SIZE - 1]?.score || 0);
    }
    
    static async getRank(score, type = 'overall') {
        const rankings = await this.getRankings(type);
        let rank = 1;
        for (const entry of rankings) {
            if (score > entry.score) break;
            rank++;
        }
        return rank;
    }
    
    // ローカルストレージフォールバック（既存の機能）
    static getLocalRankings(type = 'overall') {
        const key = type === 'weekly' ? 'kongoTypingWeeklyRanking' : 'kongoTypingRanking';
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }
    
    static saveLocalRankings(rankings, type = 'overall') {
        const key = type === 'weekly' ? 'kongoTypingWeeklyRanking' : 'kongoTypingRanking';
        localStorage.setItem(key, JSON.stringify(rankings));
    }
    
    static addLocalRanking(entry, type = 'overall') {
        const rankings = this.getLocalRankings(type);
        rankings.push(entry);
        rankings.sort((a, b) => b.score - a.score);
        rankings.splice(MAX_RANKING_SIZE);
        this.saveLocalRankings(rankings, type);
        return rankings;
    }
    
    static checkWeeklyReset() {
        // 週間ランキングのリセット（Firestoreでは手動管理またはCloud Functions使用）
        const lastReset = localStorage.getItem('kongoTypingLastReset');
        const now = new Date();
        const oneWeek = 7 * 24 * 60 * 60 * 1000;
        
        if (!lastReset || (now.getTime() - parseInt(lastReset)) > oneWeek) {
            localStorage.removeItem('kongoTypingWeeklyRanking');
            localStorage.setItem('kongoTypingLastReset', now.getTime().toString());
            console.log('📅 Weekly ranking reset check completed');
        }
    }
}

// ランキング機能
function showRankingScreen() {
    if (gameState.audioEnabled) {
        playSound('./効果音/決定ボタンを押す10.mp3', 0.5);
    }
    showScreen('ranking');
    displayRanking('overall');
}

function switchRankingTab(type) {
    if (gameState.audioEnabled) {
        playSound('./効果音/決定ボタンを押す10.mp3', 0.3);
    }
    
    elements.overallTab.classList.toggle('active', type === 'overall');
    elements.weeklyTab.classList.toggle('active', type === 'weekly');
    displayRanking(type);
}

async function displayRanking(type) {
    const container = elements.rankingList;
    
    // ローディング表示
    container.innerHTML = `
        <div class="ranking-empty">
            <div class="empty-icon">⏳</div>
            <div class="empty-message">ランキングを読み込み中...</div>
        </div>
    `;
    
    try {
        const rankings = await RankingManager.getRankings(type);
        
        if (rankings.length === 0) {
            container.innerHTML = `
                <div class="ranking-empty">
                    <div class="empty-icon">🏆</div>
                    <div class="empty-message">まだランキングデータがありません</div>
                    <div class="empty-subtitle">ゲームをプレイしてランキングに挑戦しよう！</div>
                </div>
            `;
            return;
        }
        
        container.innerHTML = rankings.map((entry, index) => {
            const rank = index + 1;
            const date = new Date(entry.date);
            const difficultyName = DIFFICULTY_SETTINGS[entry.difficulty]?.name || entry.difficulty;
            
            return `
                <div class="ranking-item rank-${rank} ${rank <= 3 ? 'top-3' : ''}">
                    <div class="ranking-rank rank-${rank}">${rank}</div>
                    <div class="ranking-info">
                        <div class="ranking-name">${escapeHtml(entry.name)}</div>
                        <div class="ranking-title-text" style="color: ${entry.title.color}">${entry.title.name}</div>
                    </div>
                    <div class="ranking-score">${entry.score}点</div>
                </div>
            `;
        }).join('');
        
        console.log(`✅ ${type} ranking display updated with ${rankings.length} entries`);
        
    } catch (error) {
        console.log('❌ ランキング表示エラー:', error);
        container.innerHTML = `
            <div class="ranking-empty">
                <div class="empty-icon">❌</div>
                <div class="empty-message">ランキングの読み込みに失敗しました</div>
                <div class="empty-subtitle">しばらく時間をおいて再度お試しください</div>
            </div>
        `;
    }
}

async function checkAndShowRankingInput(score, title) {
    try {
        const isOverallTop = await RankingManager.isTopScore(score, 'overall');
        const isWeeklyTop = await RankingManager.isTopScore(score, 'weekly');
        
        if (isOverallTop || isWeeklyTop) {
            const overallRank = await RankingManager.getRank(score, 'overall');
            const weeklyRank = await RankingManager.getRank(score, 'weekly');
            const rank = Math.min(overallRank, weeklyRank);
            
            showNameInputModal(score, rank);
        }
    } catch (error) {
        console.log('❌ ランキングチェックエラー:', error);
    }
}

function showNameInputModal(score, rank) {
    elements.achievedRankNumber.textContent = rank;
    elements.achievedScore.textContent = `${score}点`;
    elements.playerName.value = '';
    elements.nameInputModal.classList.remove('hidden');
    
    // 入力欄にフォーカス
    setTimeout(() => {
        elements.playerName.focus();
    }, 100);
}

async function savePlayerRanking() {
    const name = elements.playerName.value.trim();
    if (!name) {
        alert('お名前を入力してください');
        return;
    }
    
    if (gameState.audioEnabled) {
        playSound('./効果音/決定ボタンを押す10.mp3', 0.5);
    }
    
    // 保存中表示
    const saveButton = elements.saveRankingButton;
    const originalText = saveButton.innerHTML;
    saveButton.innerHTML = '<span class="btn-text">保存中...</span>';
    saveButton.disabled = true;
    
    try {
        const earnedTitle = calculateTitle(gameState.score);
        const entry = new RankingEntry(name, gameState.score, earnedTitle, gameState.difficulty);
        
        // 総合と週間の両方に追加
        await Promise.all([
            RankingManager.addRanking(entry, 'overall'),
            RankingManager.addRanking(entry, 'weekly')
        ]);
        
        elements.nameInputModal.classList.add('hidden');
        
        // ランキング登録完了のフィードバック
        setTimeout(() => {
            alert(`ランキングに登録されました！\n${name}さん、おめでとうございます！`);
        }, 100);
        
        console.log(`✅ Player ranking saved: ${name} - ${gameState.score}pts`);
        
    } catch (error) {
        console.log('❌ ランキング保存エラー:', error);
        alert('ランキングの保存に失敗しました。もう一度お試しください。');
    } finally {
        // ボタンを元に戻す
        saveButton.innerHTML = originalText;
        saveButton.disabled = false;
    }
}

function skipRankingInput() {
    if (gameState.audioEnabled) {
        playSound('./効果音/決定ボタンを押す10.mp3', 0.3);
    }
    elements.nameInputModal.classList.add('hidden');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', init);