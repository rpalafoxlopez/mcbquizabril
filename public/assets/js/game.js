// ==================== CONFIGURACIÓN DE FECHA LÍMITE ====================
// El juego deja de estar disponible el 29 de abril de 2026 a las 12:00 PM (hora Centro de México, UTC-6)
const DEADLINE_DATE = new Date('2026-04-29T12:00:00-06:00'); // Hora Centro de México (UTC-6)

// ==================== PROTECCIÓN ANTI-CLIC DERECHO ====================
/*document.addEventListener('contextmenu', e => { e.preventDefault(); return false; });
document.addEventListener('keydown', e => {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I','J','C'].includes(e.key)) || 
        (e.ctrlKey && ['u','s'].includes(e.key))) {
        e.preventDefault(); return false;
    }
});
document.addEventListener('dragstart', e => e.preventDefault());*/

// ==================== CONFIGURACIÓN API ====================
const API_BASE_URL = 'https://mcbquizabril.onrender.com'; //window.location.origin;

// ==================== VERIFICACIÓN DE FECHA Y PARTICIPACIÓN ====================

function isGameExpired() {
    const now = new Date();
    return now >= DEADLINE_DATE;
}

function getTimeRemaining() {
    const now = new Date();
    const diff = DEADLINE_DATE - now;
    if (diff <= 0) return null;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return { days, hours, minutes, seconds, total: diff };
}

function hasPlayed() {
    return localStorage.getItem('neonquiz_played') === 'true';
}

function markAsPlayed(score) {
    localStorage.setItem('neonquiz_played', 'true');
    localStorage.setItem('neonquiz_score', score);
    localStorage.setItem('neonquiz_date', new Date().toISOString());
}

function getPlayedScore() {
    return localStorage.getItem('neonquiz_score') || '0';
}

// ==================== BASE DE DATOS DE PREGUNTAS ====================
const questionDatabase = {};

let questionsLoaded = false;
let loadingQuestions = false;

function normalizeCategory(value) {
    const category = String(value || '')
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '_');

    if (!category) return 'mixed';
    if (['landmarks', 'lugares', 'monumentos'].includes(category)) return 'landmarks';
    if (['animals', 'animales'].includes(category)) return 'animals';
    if (['movies', 'peliculas', 'cine'].includes(category)) return 'movies';
    return category;
}

function getAllQuestions() {
    return Object.values(questionDatabase).flat();
}

function normalizeQuestion(rawQuestion) {
    const image = rawQuestion.image || rawQuestion.imageUrl || rawQuestion.url || '';
    const correct = rawQuestion.correct || rawQuestion.correctAnswer || rawQuestion.answer || '';
    const optionsSource = Array.isArray(rawQuestion.options)
        ? rawQuestion.options
        : (Array.isArray(rawQuestion.optionList) ? rawQuestion.optionList : []);
    const options = optionsSource
        .map(opt => String(opt || '').trim())
        .filter(Boolean);

    if (correct && !options.includes(correct)) {
        options.push(correct);
    }

    if (!image || !correct || options.length < 2) {
        return null;
    }

    return {
        image,
        correct,
        options,
        category: normalizeCategory(rawQuestion.category || rawQuestion.categoria)
    };
}

async function loadQuestionsFromDatabase() {
    if (questionsLoaded || loadingQuestions) return;
    loadingQuestions = true;

    try {
        const response = await fetch(`${API_BASE_URL}/api/questionsquiz`);
        const result = await response.json();

        if (!result.success || !Array.isArray(result.data)) {
            throw new Error(result.message || 'No se pudieron cargar las preguntas');
        }

        Object.keys(questionDatabase).forEach(category => {
            questionDatabase[category] = [];
        });

        result.data.forEach(raw => {
            const question = normalizeQuestion(raw);
            if (!question) return;

            const category = question.category || 'mixed';
            if (!questionDatabase[category]) {
                questionDatabase[category] = [];
            }
            questionDatabase[category].push(question);
        });
        const totalQuestions = getAllQuestions().length;
        if (totalQuestions === 0) {
            throw new Error('La colección questionsquiz no tiene preguntas válidas');
        }

        questionsLoaded = true;
    } catch (error) {
        alert(`❌ Error cargando preguntas: ${error.message}`);
        throw error;
    } finally {
        loadingQuestions = false;
    }
}

// ==================== VARIABLES DEL JUEGO ====================
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let correctCount = 0;
let timer = null;
let timeLeft = 15;
let totalTime = 0;
let playerName = "";
let hasAnswered = false;

// ==================== FUNCIONES AUXILIARES ====================
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function selectCategory(btn) {
    document.querySelectorAll('.category-btn').forEach(b => {
        b.classList.remove('selected');
    });
    btn.classList.add('selected');
    document.getElementById('categorySelect').value = btn.dataset.category;
}

// ==================== COUNTDOWN TIMER ====================
function updateCountdown() {
    const countdownBox = document.getElementById('countdownBox');
    const countdownTime = document.getElementById('countdownTime');
    
    if (isGameExpired()) {
        countdownBox.classList.remove('active');
        countdownTime.textContent = 'JUEGO FINALIZADO';
        return;
    }
    
    const remaining = getTimeRemaining();
    if (!remaining) {
        countdownBox.classList.remove('active');
        countdownTime.textContent = 'JUEGO FINALIZADO';
        return;
    }
    
    countdownBox.classList.add('active');
    
    const parts = [];
    if (remaining.days > 0) parts.push(`${remaining.days}d`);
    if (remaining.hours > 0 || remaining.days > 0) parts.push(`${remaining.hours}h`);
    if (remaining.minutes > 0 || remaining.hours > 0 || remaining.days > 0) parts.push(`${remaining.minutes}m`);
    parts.push(`${remaining.seconds}s`);
    
    countdownTime.textContent = parts.join(' ');
}

// ==================== INICIALIZACIÓN DE PANTALLA DE INICIO ====================
function initStartScreen() {
    // Verificar si el juego ya expiró
    if (isGameExpired()) {
        showExpiredScreen();
        return;
    }
    
    // Verificar si ya jugó
    if (hasPlayed()) {
        document.getElementById('gameForm').style.display = 'none';
        document.getElementById('playedBox').style.display = 'block';
        document.getElementById('playedScore').textContent = `Tu puntaje: ${getPlayedScore()} pts`;
        document.getElementById('startBtn').disabled = true;
    }
    
    // Iniciar countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);

    loadQuestionsFromDatabase().catch(() => {
        const startBtn = document.getElementById('startBtn');
        if (startBtn) startBtn.disabled = true;
    });
}

function showExpiredScreen() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('expiredScreen').style.display = 'flex';
    document.getElementById('expiredScreen').classList.add('active');
}

function viewLeaderboardOnly() {
    document.getElementById('expiredScreen').classList.remove('active');
    document.getElementById('resultScreen').classList.add('active');
    updateLeaderboard();
}

// ==================== INICIO DEL JUEGO ====================
async function startGame() {
    // Verificar fecha límite
    if (isGameExpired()) {
        alert('⏰ El periodo de participación ha terminado.');
        showExpiredScreen();
        return;
    }
    
    // Verificar si ya jugó
    if (hasPlayed()) {
        alert('🎮 Ya has participado. Solo se permite una participación por persona.');
        return;
    }
    
    playerName = document.getElementById('playerName').value.trim();
    const categoryValue = document.getElementById('categorySelect').value;
    const category = normalizeCategory(categoryValue);
    
    if (!playerName) {
        const input = document.getElementById('playerName');
        input.style.borderColor = '#ff4444';
        input.style.boxShadow = '0 0 15px rgba(255, 68, 68, 0.3)';
        setTimeout(() => {
            input.style.borderColor = '';
            input.style.boxShadow = '';
        }, 1000);
        return;
    }
    
    try {
        await loadQuestionsFromDatabase();
    } catch (error) {
        return;
    }
    const allQuestions = getAllQuestions();

    if (category === 'mixed') {
        currentQuestions = shuffleArray(allQuestions).slice(0, 10);
    } else {
        const categoryQuestions = questionDatabase[category] || [];
        if (categoryQuestions.length === 0) {
            currentQuestions = shuffleArray(allQuestions).slice(0, 10);
        } else {
            currentQuestions = shuffleArray([...categoryQuestions]).slice(0, 10);
        }
    }

    if (currentQuestions.length === 0) {
        alert('❌ No hay preguntas disponibles para jugar.');
        return;
    }
    
    currentQuestionIndex = 0;
    score = 0;
    correctCount = 0;
    totalTime = 0;
    
    document.getElementById('startScreen').classList.remove('active');
    document.getElementById('gameScreen').classList.add('active');
    
    document.getElementById('gamePlayerName').textContent = playerName.toUpperCase();
    document.getElementById('totalQuestions').textContent = currentQuestions.length;
    
    showQuestion();
}

// ==================== PANTALLA DEL JUEGO ====================
function showQuestion() {
    hasAnswered = false;
    const question = currentQuestions[currentQuestionIndex];
    
    document.getElementById('questionNumber').textContent = currentQuestionIndex + 1;
    document.getElementById('currentScore').textContent = score;
    
    const img = document.getElementById('questionImage');
    img.src = question.image;
    img.alt = `Adivina: ${question.correct}`;
    
    const shuffledOptions = shuffleArray([...question.options]);
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    const labels = ['A', 'B', 'C', 'D'];
    
    shuffledOptions.forEach((option, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `
            <span class="option-label">${labels[i]}</span>
            ${option}
        `;
        btn.onclick = () => selectAnswer(option, btn);
        optionsContainer.appendChild(btn);
    });
    
    startTimer();
}

function startTimer() {
    timeLeft = 15;
    const bar = document.getElementById('timerBar');
    const text = document.getElementById('timerText');
    bar.style.width = '100%';
    bar.classList.remove('warning');
    
    if (timer) clearInterval(timer);
    
    timer = setInterval(() => {
        timeLeft -= 0.1;
        const percentage = (timeLeft / 15) * 100;
        bar.style.width = percentage + '%';
        text.textContent = timeLeft.toFixed(1) + 's';
        
        if (timeLeft <= 5) {
            bar.classList.add('warning');
        }
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            if (!hasAnswered) {
                selectAnswer(null, null);
            }
        }
    }, 100);
}

function selectAnswer(selectedOption, btnElement) {
    if (hasAnswered) return;
    hasAnswered = true;
    clearInterval(timer);
    
    const question = currentQuestions[currentQuestionIndex];
    const isCorrect = selectedOption === question.correct;
    const timeTaken = (15 - timeLeft).toFixed(1);
    totalTime += parseFloat(timeTaken);
    
    const allBtns = document.querySelectorAll('.option-btn');
    allBtns.forEach(btn => {
        btn.classList.add('disabled');
        const btnText = btn.textContent.trim();
        if (btnText.includes(question.correct)) {
            btn.classList.add('correct');
        }
    });
    
    if (isCorrect) {
        correctCount++;
        const timeBonus = Math.floor(timeLeft * 10);
        const points = 100 + timeBonus;
        score += points;
        if (btnElement) btnElement.classList.add('correct');
    } else {
        if (btnElement) btnElement.classList.add('incorrect');
    }
    
    document.getElementById('currentScore').textContent = score;
    
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuestions.length) {
            showQuestion();
        } else {
            endGame();
        }
    }, 1500);
}

// ==================== PANTALLA DE RESULTADOS ====================
async function endGame() {
    // Marcar como jugado (solo una vez)
    markAsPlayed(score);
    
    document.getElementById('gameScreen').classList.remove('active');
    document.getElementById('resultScreen').classList.add('active');
    
    const accuracy = correctCount / currentQuestions.length;
    
    document.getElementById('finalScore').textContent = score;
    document.getElementById('correctAnswers').textContent = `${correctCount}/${currentQuestions.length}`;
    document.getElementById('totalTime').textContent = `${totalTime.toFixed(1)}s`;
    document.getElementById('accuracy').textContent = `${Math.round(accuracy * 100)}%`;
    
    let title, message;
    if (accuracy === 1) { title = 'LEGEND'; message = '¡Puntuación perfecta!'; }
    else if (accuracy >= 0.8) { title = 'ELITE'; message = '¡Rendimiento excepcional!'; }
    else if (accuracy >= 0.6) { title = 'EXPERT'; message = '¡Buen trabajo!'; }
    else if (accuracy >= 0.4) { title = 'ROOKIE'; message = 'Sigue practicando...'; }
    else { title = 'NEWBIE'; message = '¡Inténtalo de nuevo!'; }
    
    document.getElementById('scoreMessage').innerHTML = `<span class="neon-glow-cyan">${title}</span><br><span style="font-size: 0.9rem; color: #a098b0;">${message}</span>`;
    
    // Guardar en MongoDB
    const dbStatus = document.getElementById('dbStatus');
    dbStatus.className = 'db-status loading';
    dbStatus.textContent = '💾 Guardando en MongoDB Atlas...';
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/scores`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                playerName: playerName,
                score: score,
                correctAnswers: correctCount,
                totalQuestions: currentQuestions.length,
                accuracy: Math.round(accuracy * 100),
                time: totalTime.toFixed(1),
                category: document.getElementById('categorySelect').value
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            dbStatus.className = 'db-status success';
            dbStatus.innerHTML = `✅ Ya estas participando en el ranking de <span class="neon-glow-cyan">MCB, Adivina ¿Quién es?.</span>`;
        } else {
            throw new Error(result.message);
        }
        
        await updateLeaderboard();
        
    } catch (error) {
        dbStatus.className = 'db-status error';
        dbStatus.innerHTML = `❌ Error: ${error.message}`;
    }
}

async function updateLeaderboard() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/scores/leaderboard?limit=10`);
        const result = await response.json();
        
        const container = document.getElementById('leaderboardList');
        container.innerHTML = '';
        
        if (!result.success || result.data.length === 0) {
            container.innerHTML = '<div style="text-align: center; color: #a098b0; padding: 1rem;">No hay puntajes aún</div>';
            return;
        }
        
        result.data.forEach((entry, index) => {
            const div = document.createElement('div');
            div.className = 'leaderboard-item';
            
            if (entry.playerName === playerName && entry.score === score) {
                div.classList.add('current-player');
            }
            
            const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`;
            const date = new Date(entry.date).toLocaleDateString();
            
            div.innerHTML = `
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <span class="leaderboard-rank">${medal}</span>
                    <div class="leaderboard-info">
                        <div class="leaderboard-name">${entry.playerName}</div>
                        <div class="leaderboard-date">${date}</div>
                    </div>
                </div>
                <div class="leaderboard-score">
                    <div class="leaderboard-score-value">${entry.score}</div>
                    <div class="leaderboard-score-label">${entry.accuracy}%</div>
                </div>
            `;
            container.appendChild(div);
        });
        
    } catch (error) {
        document.getElementById('leaderboardList').innerHTML = 
            '<div style="text-align: center; color: #a098b0; padding: 1rem;">Error cargando rankings</div>';
    }
}

function goHome() {
    window.location.reload();
}

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    
    if (path === '/' || path === '/index.html') {
        initStartScreen();
    }
});