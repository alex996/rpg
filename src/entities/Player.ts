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
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.canvasX = this.getCanvasX()
    this.canvasY = this.getCanvasY()
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

  public get isMoving (): boolean {
    return this.upKey || this.rightKey || this.downKey || this.leftKey
  }

  public move (): void {
    const { dx, dy } = Player
    const { height, width, mapWidth, mapHeight } = this

    if (this.upKey) {
      this.y -= dy

      // Respect top boundary of the map
      if (this.y < height / 2) {
        this.y = height / 2
      }
    }
    if (this.rightKey) {
      this.x += dx

      // Respect right boundary of the map
      if (this.x > mapWidth - width / 2) {
        this.x = mapWidth - width / 2
      }
    }
    if (this.downKey) {
      this.y += dy

      // Respect bottom boundary of the map
      if (this.y > mapHeight - height / 2) {
        this.y = mapHeight - height / 2
      }
    }
    if (this.leftKey) {
      this.x -= dx

      // Respect left boundary of the map
      if (this.x < width / 2) {
        this.x = width / 2
      }
    }

    this.syncCanvasXAndY()
  }

  private syncCanvasXAndY (): void {
    this.canvasX = this.getCanvasX()
    this.canvasY = this.getCanvasY()
  }

  private getCanvasX (): number {
    return Player.getCanvasXOrY(
      this.x,
      this.width,
      this.mapWidth,
      this.canvasWidth
    )
  }

  private getCanvasY (): number {
    return Player.getCanvasXOrY(
      this.y,
      this.height,
      this.mapHeight,
      this.canvasHeight
    )
  }

  // Returns x in [0, canvasWidth - width] or y in [0, canvasHeight - height]
  private static getCanvasXOrY (
    xOrY: number,
    widthOrHeight: number,
    mapWidthOrHeight: number,
    canvasWidthOrHeight: number
  ): number {
    const center = canvasWidthOrHeight / 2

    if (xOrY < center) {
      return xOrY - widthOrHeight / 2
    } else if (xOrY > mapWidthOrHeight - center) {
      return xOrY - (mapWidthOrHeight - canvasWidthOrHeight) - widthOrHeight / 2
    } else {
      return center - widthOrHeight / 2
    }
  }

  public onMapResize (mapWidth: number, mapHeight: number): void {
    this.mapWidth = mapWidth
    this.mapHeight = mapHeight
    // TODO: recalculate x/y, canvasX/Y
  }

  public onCanvasResize (canvasWidth: number, canvasHeight: number): void {
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    // TODO: recalculate x/y, canvasX/Y
  }
}

export default Player
