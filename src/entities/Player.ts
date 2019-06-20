class Player {
  public x: number
  public y: number
  public canvasX: number
  public canvasY: number
  public width: number
  public height: number
  private mapWidth: number
  private mapHeight: number
  private image: HTMLImageElement
  private context: CanvasRenderingContext2D
  public upKey = false
  public rightKey = false
  public downKey = false
  public leftKey = false

  private static dx = 10
  private static dy = 10

  public constructor ({
    x,
    y,
    width,
    height,
    mapWidth,
    mapHeight,
    image,
    canvas,
    context
  }: {
    x: number
    y: number
    width: number
    height: number
    mapWidth: number
    mapHeight: number
    image: HTMLImageElement
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
  }) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.mapWidth = mapWidth
    this.mapHeight = mapHeight
    // The player is always drawn in the center of the canvas. Its x and y
    // do change, but in the canvas, it stays in the same spot regardless.
    this.canvasX = (canvas.width - width) / 2
    this.canvasY = (canvas.height - height) / 2
    this.image = image
    this.context = context
  }

  public draw (): void {
    const { width, height, image, canvasX, canvasY } = this

    this.context.drawImage(
      image,
      image.width / 3, // offset by 33.3%
      image.height / 2, // offset by 50%
      width,
      height,
      canvasX,
      canvasY,
      width,
      height
    )
  }

  public move (): void {
    const { dx, dy } = Player

    if (this.upKey) {
      this.y -= dy
      // Respect top boundary of the map
      if (this.y < this.height / 2) {
        this.y = this.height / 2
      }
    }
    if (this.rightKey) {
      this.x += dx
      // Respect right boundary of the map
      if (this.x > this.mapWidth - this.width / 2) {
        this.x = this.mapWidth - this.width / 2
      }
    }
    if (this.downKey) {
      this.y += dy
      // Respect bottom boundary of the map
      if (this.y > this.mapHeight - this.height / 2) {
        this.y = this.mapHeight - this.height / 2
      }
    }
    if (this.leftKey) {
      this.x -= dx
      // Respect left boundary of the map
      if (this.x < this.width / 2) {
        this.x = this.width / 2
      }
    }
  }

  public get isMoving (): boolean {
    return this.upKey || this.rightKey || this.downKey || this.leftKey
  }

  // public get isWithinBoundaries (): boolean {
  //   return (
  //     rect1.x < rect2.x + rect2.width &&
  //     rect1.x + rect1.width > rect2.x &&
  //     rect1.y < rect2.y + rect2.height &&
  //     rect1.y + rect1.height > rect2.y
  //   )
  // }
}

export default Player
