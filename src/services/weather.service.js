class WeatherService {
    constructor() {
        this.apiKey = process.env.WEATHER_API_KEY,
            this.baseUrl = process.env.WEATHER_URL
    }

    async getWeather(city) {
        try {
            const response = await fetch(
                `${this.baseUrl}weather?q=${city}&appid=${this.apiKey}&units=metric`
            )

            const data = await response.json()

            if (!response.ok) {
                return {
                    success: false,
                    error: {
                        status: response.status,
                        message: data.message || 'Erro na API externa'
                    }
                }
            }

            return {
                success: true,
                data: {
                    nome: data.name,
                    lon: data.coord.lon,
                    lat: data.coord.lat,
                    temperatura: Math.round(data.main.temp),
                    umidade: data.main.humidity,
                    vento: data.wind.speed,
                    clima: data.weather[0].description
                }
            }

        } catch (error) {
            console.error('Erro ao obter dados do clima:', error)

            return {
                success: false,
                error: {
                    status: 500,
                    message: 'Erro interno do servidor'
                }
            }
        }
    }

    async getPrevByCity(city) {
        try {
            const response = await fetch(`${this.baseUrl}forecast?q=${city}&appid=${this.apiKey}&dt_txt=24h&units=metric`)

            const data = await response.json()

            if (!response.ok) {
                console.log(data)
                return {
                    success: false,
                    error: {
                        status: response.status,
                        message: data.message || 'Erro na API externa'
                    }
                }
            }

            const previsao = {};

            data.list.forEach(item => {
                const dia = item.dt_txt.split(" ")[0];

                if (!previsao[dia]) {
                    previsao[dia] = {
                        somaTemp: 0,
                        somaMin: 0,
                        somaMax: 0,
                        count: 0
                    }
                }

                previsao[dia].somaTemp += item.main.temp;
                previsao[dia].somaMin += item.main.temp_min;
                previsao[dia].somaMax += item.main.temp_max;
                previsao[dia].count++;
            });

            Object.keys(previsao).forEach(dia => {
                const d = previsao[dia]
                d.mediaTemp = d.somaTemp / d.count;
                d.mediaMin = d.somaMin / d.count;
                d.mediaMax = d.somaMax / d.count;

                // opcional: remover dados brutos
                delete d.somaTemp;
                delete d.somaMin;
                delete d.somaMax;
                delete d.count;
            })

            return {
                success: true,
                data: previsao
            }

        } catch (error) {
            console.error('Error ao obter dados do clima:', error)
            return {
                success: false,
                error: {
                    status: 500,
                    message: 'Erro interno do servidor'
                }
            }
        }
    }
}

module.exports = new WeatherService()