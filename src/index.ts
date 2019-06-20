import './index.scss'
import { mapSrc, playerSrc } from './images'
import { Player, TileMap } from './entities'

const loadImage = (path: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject): void => {
    const img = new Image()
    img.src = path
    img.onload = (): void => resolve(img)
    img.onerror = (err): void => reject(err)
  })

window.addEventListener(
  'load',
  async (): Promise<void> => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement

    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

    const context = canvas.getContext('2d') as CanvasRenderingContext2D

    const [mapImg, playerImg] = await Promise.all(
      [mapSrc, playerSrc].map(loadImage)
    )

    const playerWidth = playerImg.width / 3
    const playerHeight = playerImg.height / 4

    const player = new Player({
      // This is where the player will spawn in the map
      x: (mapImg.width - playerWidth) / 2,
      y: (mapImg.height - playerHeight) / 2,
      width: playerWidth,
      height: playerHeight,
      image: playerImg,
      canvas,
      context
    })

    const map = new TileMap({
      playerX: player.x,
      playerY: player.y,
      width: mapImg.width,
      height: mapImg.height,
      image: mapImg,
      canvas,
      context
    })

    const main = (): void => {
      requestAnimationFrame(main)

      context.clearRect(0, 0, canvas.width, canvas.height)

      map.draw()

      player.draw()
    }

    requestAnimationFrame(main)
  }
)
