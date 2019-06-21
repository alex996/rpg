class Player {
  public x: number
  public y: number

  public width: number
  public height: number

  private mapWidth: number
  private mapHeight: number

  private canvasX: number
  private canvasY: number
  private canvasWidth: number
  private canvasHeight: number

  private image: HTMLImageElement
  private spriteWidth: number
  private spriteHeight: number

  public upKey = false
  public rightKey = false
  public downKey = false
  public leftKey = false

  private static dx = 5
  private static dy = 5

  public constructor ({
    x,
    y,
    width,
    height,
    mapWidth,
    mapHeight,
    canvasWidth,
    canvasHeight,
    image
  }: {
    x: number
    y: number
    width: number
    height: number
    mapWidth: number
    mapHeight: number
    canvasWidth: number
    canvasHeight: number
    image: HTMLImageElement
  }) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.mapWidth = mapWidth
    this.mapHeight = mapHeight
    // The player is always drawn in the center of the canvas. Its x and y
    // do change, but in the canvas, it stays in the same spot regardless.
    this.canvasX = (canvasWidth - width) / 2
    this.canvasY = (canvasHeight - height) / 2
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.image = image
    this.spriteWidth = image.width / 3
    this.spriteHeight = image.height / 4
  }

  public draw (context: CanvasRenderingContext2D): void {
    const {
      width,
      height,
      image,
      spriteWidth,
      spriteHeight,
      canvasX,
      canvasY
    } = this

    context.drawImage(
      image,
      image.width / 3, // offset by 33.3%
      image.height / 2, // offset by 50%
      spriteWidth,
      spriteHeight,
      canvasX,
      canvasY,
      width,
      height
    )
  }

  public move (): void {
    const { dx, dy } = Player
    const {
      height,
      width,
      mapWidth,
      mapHeight,
      canvasWidth,
      canvasHeight,
      shouldMoveCanvasX,
      shouldMoveCanvasY
    } = this

    if (this.upKey) {
      this.y -= dy

      // Respect top boundary of the map
      if (this.y < height / 2) {
        this.y = height / 2
      }

      if (shouldMoveCanvasY) {
        this.canvasY -= dy

        if (this.canvasY < 0) {
          this.canvasY = 0
        }
      }
    }
    if (this.rightKey) {
      this.x += dx

      // Respect right boundary of the map
      if (this.x > mapWidth - width / 2) {
        this.x = mapWidth - width / 2
      }

      if (shouldMoveCanvasX) {
        this.canvasX += dx

        if (this.canvasX > canvasWidth - width) {
          this.canvasX = canvasWidth - width
        }
      }
    }
    if (this.downKey) {
      this.y += dy

      // Respect bottom boundary of the map
      if (this.y > mapHeight - height / 2) {
        this.y = mapHeight - height / 2
      }

      if (shouldMoveCanvasY) {
        this.canvasY += dy

        if (this.canvasY > canvasHeight - height) {
          this.canvasY = canvasHeight - height
        }
      }
    }
    if (this.leftKey) {
      this.x -= dx

      // Respect left boundary of the map
      if (this.x < width / 2) {
        this.x = width / 2
      }

      if (shouldMoveCanvasX) {
        this.canvasX -= dx

        if (this.canvasX < 0) {
          this.canvasX = 0
        }
      }
    }
  }

  public get isMoving (): boolean {
    return this.upKey || this.rightKey || this.downKey || this.leftKey
  }

  private get shouldMoveCanvasX (): boolean {
    const { x, canvasWidth, mapWidth } = this
    return x < canvasWidth / 2 || x > mapWidth - canvasWidth / 2
  }

  private get shouldMoveCanvasY (): boolean {
    const { y, canvasHeight, mapHeight } = this
    return y < canvasHeight / 2 || y > mapHeight - canvasHeight / 2
  }

  public onMapResize (mapWidth: number, mapHeight: number): void {
    this.mapWidth = mapWidth
    this.mapHeight = mapHeight
  }

  public onCanvasResize (canvasWidth: number, canvasHeight: number): void {
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    // FIXME: calculate same as in move
    this.canvasX = (canvasWidth - this.width) / 2
    this.canvasY = (canvasHeight - this.height) / 2
  }
}

export default Player
