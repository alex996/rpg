import { tilesSrc } from '../images'
import { field } from '../maps'
import { Images, MapArea, Tilemap, Player, Camera, Controls } from '.'

class Game {
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D

  private images: Images
  private map: MapArea
  private player: Player
  private camera: Camera
  private controls: Controls

  private lastMs: number = 0 // timestamp of the last frame in ms
  private diffSec: number = 0 // seconds between current and last frames

  public constructor ({ canvas }: { canvas: HTMLCanvasElement }) {
    this.canvas = canvas
    this.context = canvas.getContext('2d') as CanvasRenderingContext2D
    this.context.imageSmoothingEnabled = false // retain pixel sharpness

    this.images = new Images([tilesSrc])
    this.map = new MapArea({
      tilemap: new Tilemap(field),
      spritesheet: this.images.cache[tilesSrc]
    })

    // Make canvas full-screen except when the map is smaller than the viewport
    canvas.width = Math.min(window.innerWidth, this.map.width)
    canvas.height = Math.min(window.innerHeight, this.map.height)

    this.player = new Player({ x: 60, y: 80, width: 60, height: 80 })
    this.camera = new Camera({
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,
      mapWidth: this.map.width,
      mapHeight: this.map.height
    })
    this.controls = new Controls()
  }

  public async play (): Promise<void> {
    await this.images.download()

    await this.map.generate()

    this.camera.follow(
      this.player,
      this.canvas.width / 2,
      this.canvas.height / 2
    )

    this.controls.activate()

    requestAnimationFrame(this.loop)
  }

  private loop = (ms: number): void => {
    requestAnimationFrame(this.loop)

    this.diffSec = (ms - this.lastMs) / 1000
    this.lastMs = ms

    this.update()

    this.draw()
  }

  private update (): void {
    this.player.update(this.controls, this.map, this.diffSec)

    this.camera.update()
  }

  private draw (): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.map.drawBottom(this.context, this.camera) // ground walkable layer

    this.map.drawMiddle(this.context, this.camera) // object non-walkable layer

    this.player.draw(this.context, this.camera)

    this.map.drawTop(this.context, this.camera) // aerial walkable layer
  }
}

export default Game
