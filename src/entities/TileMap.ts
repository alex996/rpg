class TileMap {
  public x: number
  public y: number

  public width: number
  public height: number

  private canvasWidth: number
  private canvasHeight: number

  private playerX: number
  private playerY: number

  private image: HTMLImageElement

  public constructor ({
    width,
    height,
    canvasWidth,
    canvasHeight,
    playerX,
    playerY,
    image
  }: {
    width: number
    height: number
    canvasWidth: number
    canvasHeight: number
    playerX: number
    playerY: number
    image: HTMLImageElement
  }) {
    this.width = width
    this.height = height
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.playerX = playerX
    this.playerY = playerY
    this.image = image
    this.x = this.getX()
    this.y = this.getY()
  }

  public draw (context: CanvasRenderingContext2D): void {
    const { image, x, y, width, height } = this

    context.drawImage(image, x, y, width, height, 0, 0, width, height)
  }

  public onPlayerMove (playerX: number, playerY: number): void {
    this.playerX = playerX
    this.playerY = playerY

    this.syncXAndY()
  }

  public onCanvasResize (canvasWidth: number, canvasHeight: number): void {
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight

    this.syncXAndY()
  }

  private syncXAndY (): void {
    this.x = this.getX()
    this.y = this.getY()
  }

  private getX (): number {
    return TileMap.getXOrY(this.width, this.playerX, this.canvasWidth)
  }

  private getY (): number {
    return TileMap.getXOrY(this.height, this.playerY, this.canvasHeight)
  }

  // Returns x in [0, width - canvasWidth] or y in [0, height - canvasHeight]
  private static getXOrY (
    widthOrHeight: number,
    playerXorY: number,
    canvasWidthOrHeight: number
  ): number {
    const min = 0
    const max = widthOrHeight - canvasWidthOrHeight
    const xOrY = playerXorY - canvasWidthOrHeight / 2

    if (xOrY < min) {
      return min
    } else if (xOrY > max) {
      return max
    } else {
      return xOrY
    }
  }
}

export default TileMap
