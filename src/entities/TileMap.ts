import Player from './Player'

class TileMap {
  public x: number
  public y: number
  public width: number
  public height: number
  private player: Player
  private image: HTMLImageElement
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D

  public constructor ({
    player,
    width,
    height,
    image,
    canvas,
    context
  }: {
    player: Player
    width: number
    height: number
    image: HTMLImageElement
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
  }) {
    this.x = player.x - canvas.width / 2
    this.y = player.y - canvas.height / 2
    this.width = width
    this.height = height
    this.player = player
    this.image = image
    this.canvas = canvas
    this.context = context
  }

  public draw (): void {
    const { image, x, y, width, height } = this

    this.context.drawImage(image, x, y, width, height, 0, 0, width, height)
  }

  public shift (): void {
    this.x = this.player.x - this.canvas.width / 2
    this.y = this.player.y - this.canvas.height / 2
  }
}

export default TileMap
