// ==================== CONFIGURACIÓN DE FECHA LÍMITE ====================
// El juego deja de estar disponible el 29 de abril de 2026 a las 12:00 PM (hora Centro de México, UTC-6)
const DEADLINE_DATE = new Date('2026-04-29T12:00:00-06:00'); // Hora Centro de México (UTC-6)

// ==================== PROTECCIÓN ANTI-CLIC DERECHO ====================
document.addEventListener('contextmenu', e => { e.preventDefault(); return false; });
document.addEventListener('keydown', e => {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I','J','C'].includes(e.key)) || 
        (e.ctrlKey && ['u','s'].includes(e.key))) {
        e.preventDefault(); return false;
    }
});
document.addEventListener('dragstart', e => e.preventDefault());

// ==================== CONFIGURACIÓN API ====================
const API_BASE_URL = window.location.origin;

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
const questionDatabase = {
    landmarks: [
        { image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800", correct: "Taj Mahal", options: ["Taj Mahal", "Palacio de Buckingham", "Machu Picchu", "Coliseo Romano"] },
        { image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800", correct: "Torre Eiffel", options: ["Torre Eiffel", "Torre de Pisa", "Big Ben", "Torre CN"] },
        { image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800", correct: "Coliseo Romano", options: ["Partenón", "Coliseo Romano", "Panteón", "Circo Máximo"] },
        { image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800", correct: "Gran Muralla China", options: ["Muralla de Berlín", "Gran Muralla China", "Muralla de Ávila", "Murallas de Dubrovnik"] },
        { image: "https://images.unsplash.com/photo-1565881606991-789a8d57993f?w=800", correct: "Machu Picchu", options: ["Chichén Itzá", "Tikal", "Machu Picchu", "Ciudad Perdida"] },
        { image: "https://images.unsplash.com/photo-1533929736562-6a4c4f30e49c?w=800", correct: "Estatua de la Libertad", options: ["Estatua de la Libertad", "Cristo Redentor", "El David", "El Pensador"] },
        { image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800", correct: "Ópera de Sydney", options: ["Ópera de Sydney", "Teatro Real", "Metropolitan Opera", "La Scala"] },
        { image: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800", correct: "Pirámides de Giza", options: ["Pirámides de Giza", "Pirámides de Teotihuacán", "Pirámides de Meroe", "Nimrud"] }
    ],
    animals: [
        { image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800", correct: "León", options: ["Tigre", "León", "Leopardo", "Guepardo"] },
        { image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800", correct: "Panda", options: ["Oso Polar", "Panda", "Oso Pardo", "Oso Negro"] },
        { image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=800", correct: "Elefante", options: ["Rinoceronte", "Hipopótamo", "Elefante", "Mamut"] },
        { image: "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=800", correct: "Zorro", options: ["Lobo", "Zorro", "Coyote", "Chacal"] },
        { image: "https://images.unsplash.com/photo-1552728089-57bdde30beb8?w=800", correct: "Flamenco", options: ["Cigüeña", "Grulla", "Flamenco", "Pelícano"] },
        { image: "https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?w=800", correct: "Tucán", options: ["Loro", "Tucán", "Guacamaya", "Cacatúa"] },
        { image: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800", correct: "Delfín", options: ["Ballena", "Delfín", "Orca", "Foca"] },
        { image: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=800", correct: "Leopardo", options: ["Jaguar", "Leopardo", "Guepardo", "Puma"] }
    ],
    movies: [
        { image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800", correct: "Harry Potter", options: ["Harry Potter", "Ron Weasley", "Hermione", "Dumbledore"] },
        { image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800", correct: "Iron Man", options: ["Iron Man", "Batman", "Superman", "Capitán América"] },
        { image: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=800", correct: "Spider-Man", options: ["Spider-Man", "Ant-Man", "Deadpool", "Venom"] },
        { image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800", correct: "Batman", options: ["Daredevil", "Batman", "Moon Knight", "Punisher"] },
        { image: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=800", correct: "Groot", options: ["Groot", "Rocket", "Hulk", "Drax"] },
        { image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800", correct: "Spider-Man (Miles)", options: ["Spider-Man", "Miles Morales", "Spider-Gwen", "Silk"] },
        { image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=800", correct: "Capitán América", options: ["Capitán América", "Winter Soldier", "Falcon", "Red Skull"] },
        { image: "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=800", correct: "Hulk", options: ["Hulk", "Thing", "Abominación", "Juggernaut"] }
    ]
};

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
function startGame() {
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
    const category = 'mixto';
    
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
    
    if (category === 'mixed') {
        const allQuestions = [...questionDatabase.landmarks, ...questionDatabase.animals, ...questionDatabase.movies];
        currentQuestions = shuffleArray(allQuestions).slice(0, 10);
    } else {
        currentQuestions = shuffleArray([...questionDatabase[category]]).slice(0, 10);
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
            dbStatus.innerHTML = `✅ Guardado en Atlas<br><small>ID: ${result.data.id}</small>`;
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