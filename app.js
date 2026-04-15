// Importa o framework Express DotENV e CORS
require('dotenv').config()

const cors = require('cors')

const requiredEnv = Object.freeze(['WEATHER_API_KEY', 'WEATHER_URL']);

requiredEnv.forEach((key) => {
    if (!process.env[key]) {
        throw new Error(`Variavel ausente: ${key}`);
    }
});

const express = require('express')

//Importa as rotas
const routes = require('./src/routes')

// Importa o arquivo central de configurações (config/index.js)
const index = require('./src/config/index');
const { methods } = require('./src/config/cors.config');

// Pega a porta definida no express.config.js (ex: 3000)
const port = index.express.port

// Define as configurações do cors
const corsOptions = {
    origin: index.cors.origin,
    methods: index.cors.methods,
    optionsSuccessStatus: index.cors.optionsSuccessStatus,
    preflightContinue: index.cors.preflightContinue
}

console.log(index.cors.origin)

// Cria a instância do servidor Express
const app = express()

// Estamos utilizando cors com as configs definidas acima
app.use(cors(corsOptions))

// Utilizado para aceitar json nos requests
// app.use(express.json())  

// Utilizado para aceitar Content-Type: application/x-www-form-urlencoded
app.use(express.urlencoded(index.express.urlencoded))

// Registra todas as rotas sob o prefixo definido no config (ex: /api)
app.use(index.express.apiPrefix, routes)


// Rota de teste simples
app.get('/helth', (req, res) => {
    res.send('Hello world')
})

// Inicia o servidor na porta configurada
app.listen(port, () => {
    console.log('Example app listening on port', port)
})