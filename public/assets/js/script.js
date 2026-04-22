       // ==================== PROTECCIÓN ANTI-CLIC DERECHO Y DEVTOOLS ====================
        
        // Deshabilitar clic derecho
        /*document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });*/

        // Deshabilitar atajos de teclado para desarrollador
       /* document.addEventListener('keydown', function(e) {
            // F12
            if (e.key === 'F12') {
                e.preventDefault();
                return false;
            }
            // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C
            if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
                e.preventDefault();
                return false;
            }
            // Ctrl+U (ver código fuente)
            if (e.ctrlKey && e.key === 'u') {
                e.preventDefault();
                return false;
            }
            // Ctrl+S (guardar página)
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                return false;
            }
        });*/

        // Detectar apertura de DevTools (método básico)
        //let devtoolsOpen = false;
        const threshold = 160;
        
        setInterval(() => {
            const widthThreshold = window.outerWidth - window.innerWidth > threshold;
            const heightThreshold = window.outerHeight - window.innerHeight > threshold;
            
            if ((widthThreshold || heightThreshold) && !devtoolsOpen) {
                devtoolsOpen = true;
                // Opcional: redirigir o mostrar mensaje
                // window.location.href = 'about:blank';
            } else if (!widthThreshold && !heightThreshold) {
                devtoolsOpen = false;
            }
        }, 500);

        // Deshabilitar arrastrar imágenes
        document.addEventListener('dragstart', function(e) {
            e.preventDefault();
        });

        // Deshabilitar selección de texto en elementos sensibles
        document.addEventListener('selectstart', function(e) {
            if (e.target.tagName === 'IMG' || e.target.classList.contains('option-btn')) {
                e.preventDefault();
            }
        });

        // ==================== CONFIGURACIÓN API ====================
        const API_BASE_URL = window.location.origin; // Se ajusta automáticamente al servidor

        // ==================== BASE DE DATOS DE PREGUNTAS ====================
        const questionDatabase = {
            landmarks: [
                {
                    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
                    correct: "Taj Mahal",
                    options: ["Taj Mahal", "Palacio de Buckingham", "Machu Picchu", "Coliseo Romano"]
                },
                {
                    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800",
                    correct: "Torre Eiffel",
                    options: ["Torre Eiffel", "Torre de Pisa", "Big Ben", "Torre CN"]
                },
                {
                    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800",
                    correct: "Coliseo Romano",
                    options: ["Partenón", "Coliseo Romano", "Panteón", "Circo Máximo"]
                },
                {
                    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800",
                    correct: "Gran Muralla China",
                    options: ["Muralla de Berlín", "Gran Muralla China", "Muralla de Ávila", "Murallas de Dubrovnik"]
                },
                {
                    image: "https://images.unsplash.com/photo-1565881606991-789a8d57993f?w=800",
                    correct: "Machu Picchu",
                    options: ["Chichén Itzá", "Tikal", "Machu Picchu", "Ciudad Perdida"]
                },
                {
                    image: "https://images.unsplash.com/photo-1533929736562-6a4c4f30e49c?w=800",
                    correct: "Estatua de la Libertad",
                    options: ["Estatua de la Libertad", "Cristo Redentor", "El David", "El Pensador"]
                },
                {
                    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800",
                    correct: "Ópera de Sydney",
                    options: ["Ópera de Sydney", "Teatro Real", "Metropolitan Opera", "La Scala"]
                },
                {
                    image: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800",
                    correct: "Pirámides de Giza",
                    options: ["Pirámides de Giza", "Pirámides de Teotihuacán", "Pirámides de Meroe", "Nimrud"]
                }
            ],
            animals: [
                {
                    image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800",
                    correct: "León",
                    options: ["Tigre", "León", "Leopardo", "Guepardo"]
                },
                {
                    image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800",
                    correct: "Panda",
                    options: ["Oso Polar", "Panda", "Oso Pardo", "Oso Negro"]
                },
                {
                    image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=800",
                    correct: "Elefante",
                    options: ["Rinoceronte", "Hipopótamo", "Elefante", "Mamut"]
                },
                {
                    image: "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=800",
                    correct: "Zorro",
                    options: ["Lobo", "Zorro", "Coyote", "Chacal"]
                },
                {
                    image: "https://images.unsplash.com/photo-1552728089-57bdde30beb8?w=800",
                    correct: "Flamenco",
                    options: ["Cigüeña", "Grulla", "Flamenco", "Pelícano"]
                },
                {
                    image: "https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?w=800",
                    correct: "Tucán",
                    options: ["Loro", "Tucán", "Guacamaya", "Cacatúa"]
                },
                {
                    image: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800",
                    correct: "Delfín",
                    options: ["Ballena", "Delfín", "Orca", "Foca"]
                },
                {
                    image: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=800",
                    correct: "Leopardo",
                    options: ["Jaguar", "Leopardo", "Guepardo", "Puma"]
                }
            ],
            movies: [
                {
                    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800",
                    correct: "Harry Potter",
                    options: ["Harry Potter", "Ron Weasley", "Hermione", "Dumbledore"]
                },
                {
                    image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800",
                    correct: "Iron Man",
                    options: ["Iron Man", "Batman", "Superman", "Capitán América"]
                },
                {
                    image: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=800",
                    correct: "Spider-Man",
                    options: ["Spider-Man", "Ant-Man", "Deadpool", "Venom"]
                },
                {
                    image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800",
                    correct: "Batman",
                    options: ["Daredevil", "Batman", "Moon Knight", "Punisher"]
                },
                {
                    image: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=800",
                    correct: "Groot",
                    options: ["Groot", "Rocket", "Hulk", "Drax"]
                },
                {
                    image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800",
                    correct: "Spider-Man (Miles)",
                    options: ["Spider-Man", "Miles Morales", "Spider-Gwen", "Silk"]
                },
                {
                    image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=800",
                    correct: "Capitán América",
                    options: ["Capitán América", "Winter Soldier", "Falcon", "Red Skull"]
                },
                {
                    image: "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=800",
                    correct: "Hulk",
                    options: ["Hulk", "Thing", "Abominación", "Juggernaut"]
                }
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
        let startTime = null;
        let hasAnswered = false;

        // ==================== FUNCIONES DEL JUEGO ====================

        function shuffleArray(array) {
            const newArray = [...array];
            for (let i = newArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
            }
            return newArray;
        }

        function startGame() {
            playerName = document.getElementById('playerName').value.trim();
            const category = document.getElementById('categorySelect').value;
            
            if (!playerName) {
                alert('Por favor ingresa tu nombre');
                return;
            }
            
            // Seleccionar preguntas
            if (category === 'mixed') {
                const allQuestions = [
                    ...questionDatabase.landmarks,
                    ...questionDatabase.animals,
                    ...questionDatabase.movies
                ];
                currentQuestions = shuffleArray(allQuestions).slice(0, 10);
            } else {
                currentQuestions = shuffleArray([...questionDatabase[category]]).slice(0, 10);
            }
            
            // Resetear variables
            currentQuestionIndex = 0;
            score = 0;
            correctCount = 0;
            totalTime = 0;
            
            // Cambiar pantallas
            document.getElementById('startScreen').style.display = 'none';
            document.getElementById('gameScreen').style.display = 'block';
            document.getElementById('gameScreen').classList.add('fade-in');
            
            document.getElementById('gamePlayerName').textContent = playerName;
            document.getElementById('totalQuestions').textContent = currentQuestions.length;
            
            showQuestion();
        }

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
            
            shuffledOptions.forEach(option => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.textContent = option;
                btn.onclick = () => selectAnswer(option, btn);
                optionsContainer.appendChild(btn);
            });
            
            startTimer();
        }

        function startTimer() {
            timeLeft = 15;
            const timerBar = document.getElementById('timerBar');
            timerBar.style.width = '100%';
            timerBar.style.background = 'linear-gradient(90deg, #667eea, #764ba2)';
            
            if (timer) clearInterval(timer);
            
            startTime = Date.now();
            
            timer = setInterval(() => {
                timeLeft -= 0.1;
                const percentage = (timeLeft / 15) * 100;
                timerBar.style.width = percentage + '%';
                
                if (timeLeft <= 5) {
                    timerBar.style.background = 'linear-gradient(90deg, #dc3545, #ff6b6b)';
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
                if (btn.textContent === question.correct) {
                    btn.classList.add('correct');
                }
            });
            
            if (isCorrect) {
                correctCount++;
                const timeBonus = Math.floor(timeLeft * 10);
                const points = 100 + timeBonus;
                score += points;
                
                if (btnElement) {
                    btnElement.classList.add('correct');
                }
            } else {
                if (btnElement) {
                    btnElement.classList.add('incorrect');
                }
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

        async function endGame() {
            document.getElementById('gameScreen').style.display = 'none';
            document.getElementById('resultScreen').style.display = 'block';
            document.getElementById('resultScreen').classList.add('fade-in');
            
            // Mostrar estadísticas
            document.getElementById('finalScore').textContent = score;
            document.getElementById('correctAnswers').textContent = `${correctCount}/${currentQuestions.length}`;
            document.getElementById('totalTime').textContent = `${totalTime.toFixed(1)}s`;
            document.getElementById('accuracy').textContent = `${Math.round((correctCount / currentQuestions.length) * 100)}%`;
            
            const accuracy = correctCount / currentQuestions.length;
            let message = '';
            if (accuracy === 1) message = '🌟 ¡Perfecto! Eres un experto';
            else if (accuracy >= 0.8) message = '🎉 ¡Excelente! Casi perfecto';
            else if (accuracy >= 0.6) message = '👍 ¡Muy bien! Buen trabajo';
            else if (accuracy >= 0.4) message = '😐 Regular, puedes mejorar';
            else message = '💪 ¡Sigue practicando!';
            document.getElementById('scoreMessage').textContent = message;
            
            // Guardar en MongoDB vía API
            const dbStatus = document.getElementById('dbStatus');
            dbStatus.className = 'db-status loading';
            dbStatus.textContent = '💾 Guardando puntaje en MongoDB...';
            
            try {
                const response = await fetch(`${API_BASE_URL}/api/scores`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        playerName: playerName,
                        score: score,
                        correctAnswers: correctCount,
                        totalQuestions: currentQuestions.length,
                        accuracy: Math.round((correctCount / currentQuestions.length) * 100),
                        time: totalTime.toFixed(1),
                        category: document.getElementById('categorySelect').value
                    })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    dbStatus.className = 'db-status success';
                    dbStatus.innerHTML = `✅ Puntaje guardado en MongoDB<br><small>ID: ${result.data.id} | ${new Date().toLocaleString()}</small>`;
                } else {
                    throw new Error(result.message);
                }
                
                // Cargar leaderboard
                await updateLeaderboard();
                
            } catch (error) {
                dbStatus.className = 'db-status error';
                dbStatus.innerHTML = `❌ Error al guardar: ${error.message}<br><small>Verifica que el servidor esté corriendo</small>`;
            }
        }

        async function updateLeaderboard() {
            try {
                const response = await fetch(`${API_BASE_URL}/api/scores/leaderboard?limit=10`);
                const result = await response.json();
                
                const container = document.getElementById('leaderboardList');
                container.innerHTML = '';
                
                if (!result.success || result.data.length === 0) {
                    container.innerHTML = '<div style="text-align: center; color: #999;">No hay puntajes registrados aún</div>';
                    return;
                }
                
                result.data.forEach((entry, index) => {
                    const div = document.createElement('div');
                    div.className = 'leaderboard-item';
                    
                    if (entry.playerName === playerName && entry.score === score) {
                        div.classList.add('current-player');
                    }
                    
                    const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '•';
                    const date = new Date(entry.date).toLocaleDateString();
                    
                    div.innerHTML = `
                        <div style="display: flex; align-items: center;">
                            <span class="rank">${medal} ${index + 1}</span>
                            <div>
                                <div>${entry.playerName}</div>
                                <div style="font-size: 0.75rem; color: #999;">${date}</div>
                            </div>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-weight: bold; color: #667eea;">${entry.score} pts</div>
                            <div style="font-size: 0.75rem; color: #999;">${entry.accuracy}% acierto</div>
                        </div>
                    `;
                    container.appendChild(div);
                });
                
            } catch (error) {
                document.getElementById('leaderboardList').innerHTML = 
                    '<div style="text-align: center; color: #999;">Error cargando clasificación</div>';
            }
        }

        function restartGame() {
            document.getElementById('resultScreen').style.display = 'none';
            document.getElementById('startScreen').style.display = 'block';
            document.getElementById('startScreen').classList.add('fade-in');
            document.getElementById('playerName').value = playerName;
        }