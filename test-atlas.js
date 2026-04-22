// test-atlas.js
const mongoose = require('mongoose');

const uri = 'mongodb+srv://rpalafox:6Hw72kuy1GnDUgPu@cluster0.8kpyudq.mongodb.net/mcbrokers?retryWrites=true&w=majority'; // Pega tu URI completa

async function test() {
  try {
    await mongoose.connect(uri);
    console.log('✅ Conexión exitosa');
    
    // Probar insertar
    const Test = mongoose.model('Test', new mongoose.Schema({
      msg: String
    }, { collection: 'quizninos' }));
    
    await Test.create({ msg: 'prueba' });
    console.log('✅ Insertado correctamente');
    
    const docs = await Test.find();
    console.log('📄 Documentos:', docs);
    
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await mongoose.disconnect();
  }
}

test();