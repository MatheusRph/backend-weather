// routes/weather.routes.js
const express = require('express')

// Cria um roteador específico para weather
const router = express.Router()

// Importa o controller de weather
const weatherController = require('../api/weather.controller')

// GET /api/v1/weather?city=São Paulo
// Busca o clima de uma cidade
router.get('/', weatherController.getWeather)

router.get('/prev', weatherController.getPrevByCity)

module.exports = router