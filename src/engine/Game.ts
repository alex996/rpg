import { TileMap, Player, Camera, Controls } from '.'

class Game {
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D

  private map: TileMap
  private player: Player
  private camera: Camera
  private controls: Controls

  private nowMs: number = 0 // current timestamp in ms
  private lastMs: number = 0 // last frame in ms
  private diffSec: number = 0 // time between frames in sec

  public constructor ({ canvas }: { canvas: HTMLCanvasElement }) {
    this.canvas = canvas
    // Make canvas full-screen
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    this.context = canvas.getContext('2d') as CanvasRenderingContext2D
    this.map = new TileMap({ width: 4992, height: 3968 })
    this.player = new Player({ x: 60, y: 80, width: 60, height: 80 })
    this.camera = new Camera({
      x: 0,
      y: 0,
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,
      mapWidth: this.map.width,
      mapHeight: this.map.height
    })
    this.controls = new Controls()
  }

  public play (): void {
    this.map.generate()

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

    this.lastMs = this.nowMs
    this.nowMs = ms
    this.diffSec = (this.nowMs - this.lastMs) / 1000

    this.update()

    this.draw()
  }

  private update (): void {
    this.player.update(
      this.controls,
      this.diffSec,
      this.map.width,
      this.map.height
    )

    this.camera.update()
  }

  private draw (): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.map.draw(this.context, this.camera.x, this.camera.y)

    this.player.draw(this.context, this.camera.x, this.camera.y)
  }
}

export default Game
