import './index.scss'
import mapSrc from './images/map.jpg'
import playerSrc from './images/player.png'

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

    const main = (): void => {
      requestAnimationFrame(main)

      context.clearRect(0, 0, canvas.width, canvas.height)

      context.drawImage(
        mapImg,
        0,
        0,
        canvas.width,
        canvas.height,
        0,
        0,
        canvas.width,
        canvas.height
      )

      context.drawImage(
        playerImg,
        playerImg.width / 3, // offset by 33.3%
        playerImg.height / 2, // offset by 50%
        playerImg.width / 3,
        playerImg.height / 4,
        0,
        0,
        playerImg.width / 3,
        playerImg.height / 4
      )
    }

    requestAnimationFrame(main)
  }
)
