     // Base de datos de preguntas
        const questionDatabase = {
            landmarks: [
                {
                    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
                    correct: "Taj Mahal",
                    options: ["Taj Mahal", "Palacio de Buckingham", "Machu Picchu", "Coliseo Romano"],
                    answer: "India"
                },
                {
                    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800",
                    correct: "Torre Eiffel",
                    options: ["Torre Eiffel", "Torre de Pisa", "Big Ben", "Torre CN"],
                    answer: "Francia"
                },
                {
                    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800",
                    correct: "Coliseo Romano",
                    options: ["Partenón", "Coliseo Romano", "Panteón", "Circo Máximo"],
                    answer: "Italia"
                },
                {
                    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800",
                    correct: "Gran Muralla China",
                    options: ["Muralla de Berlín", "Gran Muralla China", "Muralla de Ávila", "Murallas de Dubrovnik"],
                    answer: "China"
                },
                {
                    image: "https://images.unsplash.com/photo-1565881606991-789a8d57993f?w=800",
                    correct: "Machu Picchu",
                    options: ["Chichén Itzá", "Tikal", "Machu Picchu", "Ciudad Perdida"],
                    answer: "Perú"
                },
                {
                    image: "https://images.unsplash.com/photo-1533929736562-6a4c4f30e49c?w=800",
                    correct: "Estatua de la Libertad",
                    options: ["Estatua de la Libertad", "Cristo Redentor", "El David", "El Pensador"],
                    answer: "Estados Unidos"
                },
                {
                    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800",
                    correct: "Ópera de Sydney",
                    options: ["Ópera de Sydney", "Teatro Real", "Metropolitan Opera", "La Scala"],
                    answer: "Australia"
                },
                {
                    image: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800",
                    correct: "Pirámides de Giza",
                    options: ["Pirámides de Giza", "Pirámides de Teotihuacán", "Pirámides de Meroe", "Nimrud"],
                    answer: "Egipto"
                }
            ],
            animals: [
                {
                    image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800",
                    correct: "León",
                    options: ["Tigre", "León", "Leopardo", "Guepardo"],
                    answer: "Rey de la selva"
                },
                {
                    image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800",
                    correct: "Panda",
                    options: ["Oso Polar", "Panda", "Oso Pardo", "Oso Negro"],
                    answer: "Bambú"
                },
                {
                    image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=800",
                    correct: "Elefante",
                    options: ["Rinoceronte", "Hipopótamo", "Elefante", "Mamut"],
                    answer: "Trompa"
                },
                {
                    image: "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=800",
                    correct: "Zorro",
                    options: ["Lobo", "Zorro", "Coyote", "Chacal"],
                    answer: "Astuto"
                },
                {
                    image: "https://images.unsplash.com/photo-1552728089-57bdde30beb8?w=800",
                    correct: "Flamenco",
                    options: ["Cigüeña", "Grulla", "Flamenco", "Pelícano"],
                    answer: "Rosa"
                },
                {
                    image: "https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?w=800",
                    correct: "Tucán",
                    options: ["Loro", "Tucán", "Guacamaya", "Cacatúa"],
                    answer: "Pico grande"
                },
                {
                    image: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800",
                    correct: "Delfín",
                    options: ["Ballena", "Delfín", "Orca", "Foca"],
                    answer: "Inteligente"
                },
                {
                    image: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=800",
                    correct: "Leopardo",
                    options: ["Jaguar", "Leopardo", "Guepardo", "Puma"],
                    answer: "Manchas"
                }
            ],
            movies: [
                {
                    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800",
                    correct: "Harry Potter",
                    options: ["Harry Potter", "Ron Weasley", "Hermione", "Dumbledore"],
                    answer: "Magia"
                },
                {
                    image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800",
                    correct: "Iron Man",
                    options: ["Iron Man", "Batman", "Superman", "Capitán América"],
                    answer: "Tecnología"
                },
                {
                    image: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=800",
                    correct: "Spider-Man",
                    options: ["Spider-Man", "Ant-Man", "Deadpool", "Venom"],
                    answer: "Telaraña"
                },
                {
                    image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800",
                    correct: "Batman",
                    options: ["Daredevil", "Batman", "Moon Knight", "Punisher"],
                    answer: "Oscuridad"
                },
                {
                    image: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=800",
                    correct: "Groot",
                    options: ["Groot", "Rocket", "Hulk", "Drax"],
                    answer: "Soy Groot"
                },
                {
                    image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800",
                    correct: "Spider-Man (Miles Morales)",
                    options: ["Spider-Man", "Miles Morales", "Spider-Gwen", "Silk"],
                    answer: "Multiverso"
                },
                {
                    image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=800",
                    correct: "Capitán América",
                    options: ["Capitán América", "Winter Soldier", "Falcon", "Red Skull"],
                    answer: "Escudo"
                },
                {
                    image: "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=800",
                    correct: "Hulk",
                    options: ["Hulk", "Thing", "Abominación", "Juggernaut"],
                    answer: "Fuerza"
                }
            ]
        };

        // Variables del juego
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

        // Simulación de base de datos MongoDB (localStorage como respaldo)
        const mockDatabase = {
            scores: JSON.parse(localStorage.getItem('photoquiz_scores') || '[]'),
            
            async saveScore(playerData) {
                // Simulación de guardado en MongoDB
                return new Promise((resolve) => {
                    setTimeout(() => {
                        this.scores.push({
                            ...playerData,
                            date: new Date().toISOString(),
                            id: Date.now().toString()
                        });
                        // Ordenar por puntaje descendente
                        this.scores.sort((a, b) => b.score - a.score);
                        // Mantener solo top 50
                        this.scores = this.scores.slice(0, 50);
                        localStorage.setItem('photoquiz_scores', JSON.stringify(this.scores));
                        resolve({ success: true, id: Date.now().toString() });
                    }, 800); // Simular latencia de red
                });
            },
            
            getLeaderboard(limit = 10) {
                return this.scores.slice(0, limit);
            }
        };

        function startGame() {
            playerName = document.getElementById('playerName').value.trim();
            const category = document.getElementById('categorySelect').value;
            
            if (!playerName) {
                alert('Por favor ingresa tu nombre');
                return;
            }
            
            // Seleccionar preguntas según categoría
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
            
            // Actualizar contador
            document.getElementById('questionNumber').textContent = currentQuestionIndex + 1;
            document.getElementById('currentScore').textContent = score;
            
            // Mostrar imagen
            const img = document.getElementById('questionImage');
            img.src = question.image;
            img.alt = `Adivina: ${question.correct}`;
            
            // Generar opciones mezcladas
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
            
            // Iniciar temporizador
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
                
                // Cambiar color cuando queda poco tiempo
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
            
            // Deshabilitar todos los botones
            const allBtns = document.querySelectorAll('.option-btn');
            allBtns.forEach(btn => {
                btn.classList.add('disabled');
                if (btn.textContent === question.correct) {
                    btn.classList.add('correct');
                }
            });
            
            if (isCorrect) {
                correctCount++;
                // Calcular puntos: base 100 + bonus por tiempo rápido
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
            
            // Esperar y pasar a siguiente pregunta
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
            
            // Mensaje según puntaje
            const accuracy = correctCount / currentQuestions.length;
            let message = '';
            if (accuracy === 1) message = '🌟 ¡Perfecto! Eres un experto';
            else if (accuracy >= 0.8) message = '🎉 ¡Excelente! Casi perfecto';
            else if (accuracy >= 0.6) message = '👍 ¡Muy bien! Buen trabajo';
            else if (accuracy >= 0.4) message = '😐 Regular, puedes mejorar';
            else message = '💪 ¡Sigue practicando!';
            document.getElementById('scoreMessage').textContent = message;
            
            // Guardar en "MongoDB"
            const dbStatus = document.getElementById('dbStatus');
            dbStatus.className = 'db-status loading';
            dbStatus.textContent = '💾 Guardando puntaje en la base de datos...';
            
            try {
                const result = await mockDatabase.saveScore({
                    playerName: playerName,
                    score: score,
                    correctAnswers: correctCount,
                    totalQuestions: currentQuestions.length,
                    accuracy: Math.round((correctCount / currentQuestions.length) * 100),
                    time: totalTime.toFixed(1),
                    category: document.getElementById('categorySelect').value
                });
                
                dbStatus.className = 'db-status success';
                dbStatus.innerHTML = `✅ Puntaje guardado exitosamente en MongoDB<br><small>ID: ${result.id} | ${new Date().toLocaleString()}</small>`;
                
                // Mostrar leaderboard
                updateLeaderboard();
            } catch (error) {
                dbStatus.className = 'db-status error';
                dbStatus.textContent = '❌ Error al guardar: ' + error.message;
            }
        }

        function updateLeaderboard() {
            const leaderboard = mockDatabase.getLeaderboard(10);
            const container = document.getElementById('leaderboardList');
            container.innerHTML = '';
            
            leaderboard.forEach((entry, index) => {
                const div = document.createElement('div');
                div.className = 'leaderboard-item';
                
                // Destacar al jugador actual
                if (entry.playerName === playerName && entry.score === score) {
                    div.classList.add('current-player');
                }
                
                const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '•';
                
                div.innerHTML = `
                    <div style="display: flex; align-items: center;">
                        <span class="rank">${medal} ${index + 1}</span>
                        <span>${entry.playerName}</span>
                    </div>
                    <div style="font-weight: bold; color: #667eea;">
                        ${entry.score} pts
                    </div>
                `;
                container.appendChild(div);
            });
            
            if (leaderboard.length === 0) {
                container.innerHTML = '<div style="text-align: center; color: #999;">No hay puntajes registrados aún</div>';
            }
        }

        function restartGame() {
            document.getElementById('resultScreen').style.display = 'none';
            document.getElementById('startScreen').style.display = 'block';
            document.getElementById('startScreen').classList.add('fade-in');
            document.getElementById('playerName').value = playerName;
        }

        // Utilidad para mezclar array
        function shuffleArray(array) {
            const newArray = [...array];
            for (let i = newArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
            }
            return newArray;
        }

        // Inicializar leaderboard al cargar
        window.onload = () => {
            // Pre-cargar algunos datos de ejemplo si está vacío
            if (mockDatabase.scores.length === 0) {
                const demoScores = [
                    { playerName: "María", score: 1250, correctAnswers: 9, totalQuestions: 10, accuracy: 90, time: "45.2", category: "mixed", date: new Date(Date.now() - 86400000).toISOString() },
                    { playerName: "Carlos", score: 980, correctAnswers: 8, totalQuestions: 10, accuracy: 80, time: "52.1", category: "landmarks", date: new Date(Date.now() - 172800000).toISOString() },
                    { playerName: "Ana", score: 1450, correctAnswers: 10, totalQuestions: 10, accuracy: 100, time: "38.5", category: "animals", date: new Date(Date.now() - 259200000).toISOString() }
                ];
                mockDatabase.scores = demoScores;
                localStorage.setItem('photoquiz_scores', JSON.stringify(demoScores));
            }
        };