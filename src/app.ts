import dotenv from 'dotenv'

import Darksky from './darksky'

class App {
  private darksky: Darksky

  public start (): void {
    dotenv.config()
    this.darksky = new Darksky(process.env.DARKSKY_KEY)
    this.darksky.getData('-22.9151418', '-43.2255954').then((f): void => console.log(f))
  }
}

const app = new App()
app.start()
