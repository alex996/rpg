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

    const playerWidth = 60
    const playerHeight = 80

    const mapWidth = mapImg.width
    const mapHeight = mapImg.height

    const canvasWidth = canvas.width
    const canvasHeight = canvas.height

    const player = new Player({
      // This is where the player will spawn in the map
      x: (mapWidth - playerWidth) / 2,
      y: (mapHeight - playerHeight) / 2,
      width: playerWidth,
      height: playerHeight,
      mapWidth,
      mapHeight,
      canvasWidth,
      canvasHeight,
      image: playerImg
    })

    const map = new TileMap({
      width: mapWidth,
      height: mapHeight,
      canvasWidth,
      canvasHeight,
      playerX: player.x,
      playerY: player.y,
      image: mapImg
    })

    document.addEventListener('keydown', (e: KeyboardEvent): void => {
      const { key } = e

      // Gets invoked repeatedly, hence the last AND check
      if ((key === 'ArrowUp' || key === 'w') && !player.upKey) {
        player.upKey = true
      } else if ((key === 'ArrowRight' || key === 'd') && !player.rightKey) {
        player.rightKey = true
      } else if ((key === 'ArrowDown' || key === 's') && !player.downKey) {
        player.downKey = true
      } else if ((key === 'ArrowLeft' || key === 'a') && !player.leftKey) {
        player.leftKey = true
      }
    })

    document.addEventListener('keyup', (e: KeyboardEvent): void => {
      const { key } = e

      if (key === 'ArrowUp' || key === 'w') {
        player.upKey = false
      } else if (key === 'ArrowRight' || key === 'd') {
        player.rightKey = false
      } else if (key === 'ArrowDown' || key === 's') {
        player.downKey = false
      } else if (key === 'ArrowLeft' || key === 'a') {
        player.leftKey = false
      }
    })

    const main = (): void => {
      requestAnimationFrame(main)

      context.clearRect(0, 0, canvas.width, canvas.height)

      if (player.isMoving) {
        player.move()

        map.onPlayerMove(player.x, player.y)
      }

      map.draw(context)

      player.draw(context)
    }

    requestAnimationFrame(main)
  }
)
