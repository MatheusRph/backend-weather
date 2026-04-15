// routes/index.js

// Importa o Express
const express = require('express')

// Cria um roteador central — vai agrupar todas as rotas da aplicação
const router = express.Router()

// Importa as rotas específicas de weather
const weatherRoutes = require('./weather.routes')

// Registra as rotas de weather sob o prefixo /weather
// URL final ficará: /api/weather
router.use('/weather', weatherRoutes)

// Exporta o roteador central para ser usado no app.js
module.exports = router