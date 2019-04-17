import dotenv from 'dotenv'

import Darksky from './darksky'
import Mapbox from './mapbox'
import Forecast from './model/forecast'

class App {
  private darksky: Darksky
  private mapbox: Mapbox

  public start (): void {
    dotenv.config()
    this.darksky = new Darksky(process.env.DARKSKY_KEY)
    this.mapbox = new Mapbox(process.env.MAPBOX_KEY)

    this.getWeather()
      .then((f): void => console.log(f.weatherNow()))
  }

  private async getWeather (): Promise<Forecast> {
    var mbResponse = await this.mapbox
      .getData('Rio de Janeiro')

    return this.darksky
      .getData(mbResponse.features[0].center)
  }
}

const app = new App()
app.start()
