// api/weather.controller.js
const { json } = require('express')
const weatherService = require('../services/weather.service')

module.exports = {
  async getWeather(req, res) {

    const { city } = req.query

    if (!city) {
      return res.status(400).json({ error: 'Informe uma cidade' })
    }

    const result = await weatherService.getWeather(city)

    if (!result.success) {
      return res
        .status(result.error.status)
        .json({ error: result.error.message })
    }

    return res.status(200).json(result.data)
  },

  // async getWeatherByCity(req, res) {
  //   const { city } = req.query
  //   if (!city) {
  //     return res.status(400).json({ error: 'Informe uma cidade' })
  //   }

  //   const data = await weatherService.getWeather(city)

  //   if (!data.success) {
  //     return res.status(Number(data.cod)).json({ erro: data.message })
  //   }

  //   res.json(data)
  // },

  async getPrevByCity(req, res) {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ error: 'Informe uma cidade' })
    }

    const result = await weatherService.getPrevByCity(city)

    if (!result.success) {
      return res
        .status(result.error.status)
        .json({ error: result.error.message })
    }

    return res.status(200).json(result.data)
  }
} 