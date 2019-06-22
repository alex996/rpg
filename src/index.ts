import './index.scss'
import { Game } from './engine'

window.addEventListener('load', (): void => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement

  const game = new Game({ canvas })

  game.play()
})
