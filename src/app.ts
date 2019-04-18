import dotenv from 'dotenv'

import Darksky from './darksky'
import Mapbox from './mapbox'
import Forecast from './model/forecast'

class App {
  private darksky: Darksky
  private mapbox: Mapbox

  public async start (): Promise<Forecast> {
    dotenv.config()
    this.darksky = new Darksky(process.env.DARKSKY_KEY)
    this.mapbox = new Mapbox(process.env.MAPBOX_KEY)

    try {
      const forecast = await this.getWeather()
      console.log(forecast.weatherNow())

      return forecast
    } catch (e) {
      console.log(e.message)
    }
  }

  private async getWeather (): Promise<Forecast> {
    const mbResponse = await this.mapbox
      .getData('Rio de Janeiro')

    const dsResponse = this.darksky
      .getData(mbResponse.features[0].center)

    return dsResponse
  }
}

const app = new App()
app.start()
