class TileMap {
  public x: number
  public y: number
  public width: number
  public height: number
  private image: HTMLImageElement
  private context: CanvasRenderingContext2D

  public constructor ({
    playerX,
    playerY,
    width,
    height,
    image,
    canvas,
    context
  }: {
    playerX: number
    playerY: number
    width: number
    height: number
    image: HTMLImageElement
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
  }) {
    this.x = playerX - canvas.width / 2
    this.y = playerY - canvas.height / 2
    this.width = width
    this.height = height
    this.image = image
    this.context = context
  }

  public draw (): void {
    const { image, x, y, width, height } = this

    this.context.drawImage(image, x, y, width, height, 0, 0, width, height)
  }

  public shiftBy (dx: number, dy: number): void {
    this.x += dx
    this.y += dy
  }
}

export default TileMap
