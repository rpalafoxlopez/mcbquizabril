const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// 1. MIDDLEWARE (primero)
// ============================================
app.use(cors());
app.use(express.json());

// ============================================
// 2. CONFIGURACIÓN MONGODB ATLAS
// ============================================
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ ERROR: No se encontró MONGODB_URI en el archivo .env');
  console.error('💡 Crea un archivo .env con:');
  console.error('   MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/mcbrokers?retryWrites=true&w=majority');
  process.exit(1);
}

console.log('========================================');
console.log('🚀 INICIANDO SERVIDOR PHOTOQUIZ');
console.log('========================================');
console.log(`🔗 Conectando a MongoDB Atlas...`);

// Opciones recomendadas para Atlas
const mongooseOptions = {
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  maxPoolSize: 10,
};

mongoose.connect(MONGODB_URI, mongooseOptions)
  .then(() => {
    console.log('✅ MongoDB Atlas conectado correctamente');
    console.log(`📊 Base de datos activa: ${mongoose.connection.name}`);
    console.log(`🎯 Host: ${mongoose.connection.host}`);
  })
  .catch(err => {
    console.error('❌ ERROR al conectar a MongoDB Atlas:');
    console.error(err.message);
    console.error('\n💡 SOLUCIONES COMUNES:');
    console.error('   1. Verifica que la URI sea correcta en .env');
    console.error('   2. Asegúrate de que la contraseña no tenga caracteres especiales sin codificar');
    console.error('   3. En Atlas → Network Access → añade tu IP actual (0.0.0.0/0 para permitir todas)');
    console.error('   4. Verifica que el usuario tenga permisos de readWrite');
    console.error('   5. Si la contraseña tiene @, #, $, etc., codifícala en la URI');
    process.exit(1);
  });

mongoose.connection.on('error', (err) => {
  console.error('❌ Error en conexión MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB desconectado');
});

// ============================================
// 3. DEFINIR MODELOS (antes de rutas)
// ============================================

// Schema y Modelo - Colección quizninos
const quizScoreSchema = new mongoose.Schema({
  playerName: { 
    type: String, 
    required: [true, 'El nombre del jugador es obligatorio'], 
    trim: true,
    maxlength: 20
  },
  score: { 
    type: Number, 
    required: [true, 'El puntaje es obligatorio'], 
    min: 0 
  },
  correctAnswers: { 
    type: Number, 
    required: true,
    min: 0
  },
  totalQuestions: { 
    type: Number, 
    required: true,
    min: 1
  },
  accuracy: { 
    type: Number, 
    required: true, 
    min: 0, 
    max: 100 
  },
  time: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    default: Date.now 
  }
}, {
  collection: 'quizninos',
  timestamps: true
});

quizScoreSchema.index({ score: -1 });
quizScoreSchema.index({ date: -1 });

const QuizScore = mongoose.model('QuizScore', quizScoreSchema);

// Schema y Modelo - Colección questionsquiz
const questionQuizSchema = new mongoose.Schema({
  category: { type: String, default: 'mixed' },
  image: { type: String },
  imageUrl: { type: String },
  correct: { type: String },
  correctAnswer: { type: String },
  answer: { type: String },
  options: [{ type: String }],
  optionList: [{ type: String }]
}, {
  collection: 'questionsquiz',
  strict: false
});

const QuestionQuiz = mongoose.model('QuestionQuiz', questionQuizSchema);

console.log('📋 Modelos configurados: quizninos, questionsquiz');

// ============================================
// 4. RUTAS API (antes de static y catch-all)
// ============================================

// OBTENER PREGUNTAS DESDE questionsquiz
app.get('/api/questionsquiz', async (req, res) => {
  try {
    const questions = await QuestionQuiz.aggregate([{ $sample: { size: await QuestionQuiz.countDocuments() } }])

    res.json({
      success: true,
      count: questions.length,
      data: questions
    });
  } catch (error) {
    console.error('❌ Error al obtener questionsquiz:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno al cargar preguntas'
    });
  }
});

// GUARDAR PUNTAJE
app.post('/api/scores', async (req, res) => {
  console.log('\n📥 POST /api/scores');
  console.log('Datos recibidos:', req.body);

  try {
    const { playerName, score, correctAnswers, totalQuestions, accuracy, time, category } = req.body;

    if (!playerName?.trim()) {
      return res.status(400).json({ 
        success: false, 
        message: 'El nombre del jugador es requerido' 
      });
    }

    if (score === undefined || score === null) {
      return res.status(400).json({ 
        success: false, 
        message: 'El puntaje es requerido' 
      });
    }

    const newScore = new QuizScore({
      playerName: playerName.trim().substring(0, 20),
      score: Math.max(0, parseInt(score) || 0),
      correctAnswers: parseInt(correctAnswers) || 0,
      totalQuestions: parseInt(totalQuestions) || 10,
      accuracy: Math.min(100, Math.max(0, parseInt(accuracy) || 0)),
      time: String(time || '0').substring(0, 10),
      category: String(category || 'mixed').substring(0, 20)
    });

    const saved = await newScore.save();
    console.log('✅ Guardado en Atlas - ID:', saved._id.toString());

    res.status(201).json({
      success: true,
      message: 'Puntaje guardado en MongoDB Atlas',
      data: {
        id: saved._id,
        playerName: saved.playerName,
        score: saved.score,
        date: saved.date
      }
    });

  } catch (error) {
    console.error('❌ ERROR al guardar:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ 
        success: false, 
        message: 'Error de validación', 
        errors: messages 
      });
    }

    res.status(500).json({ 
      success: false, 
      message: 'Error interno: ' + error.message 
    });
  }
});

// LEADERBOARD
app.get('/api/scores/leaderboard', async (req, res) => {
  try {
      const limit = Math.min(parseInt(req.query.limit) || 10, 50);
      const scores = await QuizScore.find()
          .sort({ score: -1, date: 1 })
          .limit(limit)
          .lean();

      res.json({ success: true, count: scores.length, data: scores });
  } 
  catch (error) {
      console.error('❌ Error leaderboard:', error);
      res.status(500).json({ success: false, message: 'Error interno' });
  }
});

// DEBUG - Ver estado de la colección
app.get('/api/debug/collection', async (req, res) => {
  try {
    const count = await QuizScore.countDocuments();
    const sample = await QuizScore.findOne().sort({ date: -1 });

    res.json({
      success: true,
      database: mongoose.connection.name,
      collection: 'quizninos',
      totalDocuments: count,
      lastDocument: sample,
      connected: mongoose.connection.readyState === 1
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// HEALTH CHECK
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    database: mongoose.connection.name,
    collection: 'quizninos',
    connected: mongoose.connection.readyState === 1,
    host: mongoose.connection.host,
    timestamp: new Date().toISOString()
  });
});

// ============================================
// 5. ARCHIVOS ESTÁTICOS (después de rutas API)
// ============================================
app.use(express.static(path.join(__dirname, 'public')));

// ============================================
// 6. CATCH-ALL PARA SPA (al final)
// ============================================
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ============================================
// 7. INICIAR SERVIDOR
// ============================================
app.listen(PORT, () => {
  console.log('\n========================================');
  console.log(`🌐 Servidor: http://localhost:${PORT}`);
  console.log(`🔍 Health:   http://localhost:${PORT}/api/health`);
  console.log(`🐛 Debug:    http://localhost:${PORT}/api/debug/collection`);
  console.log('========================================\n');
});