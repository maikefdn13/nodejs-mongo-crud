const mongoose = require('mongoose')

// CONFIGURACOES DE VAR DE AMVIENTE
require('dotenv').config({path:'variables.env'});

// CONFIGURACAO DO BANCO DE DADOS
mongoose.connect(process.env.DATABASE, { 
    useNewUrlParser: true, // Depreciado
    useUnifiedTopology: true, // Depreciado
    useFindAndModify: false // Depreciado
});

//
require('./models/Post');

const app = require('./app');

mongoose.Promise = global.Promise; // CONFIGURA QUE O MONGO QUE PODE USAR ECMAScript6, PROMISE E ASYNC.
//LOG DE ERROR
mongoose.connection.on('error',(error)=>{
    console.error("ERRO: "+error.message);
});

// CONFIGURACAO DO SERVIDOR
app.set('port',process.env.PORT || 7777); // USO DE PORTA DEFINIDA NO ARQUIVO (variables.env)
const server = app.listen(app.get('port'), ()=>{
    console.log("Servidor rodando na porta: "+server.address().port);
});