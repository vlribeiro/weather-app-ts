import * as rp from 'request-promise-native'

import Forecast from './model/forecast'

class Darksky {
  private url = 'https://api.darksky.net/forecast/'
  private lang = 'pt'
  private units = 'si'
  private apiKey: string

  public constructor (apiKey: string, lang?: string, units?: string) {
    this.apiKey = apiKey
    this.lang = lang || this.lang
    this.units = units || this.units
  }

  public async getData (lat: string, long: string): Promise<Forecast> {
    return rp.get({
      url: `${this.url}${this.apiKey}/${lat},${long}?lang=${this.lang}&units=${this.units}`
    }).then((result): Forecast => new Forecast(JSON.parse(result)))
  }
}

export default Darksky
