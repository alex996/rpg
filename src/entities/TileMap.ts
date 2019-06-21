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
    // This is where the snapshot of the map will be cropped from
    this.x = playerX - canvasWidth / 2 // [0, width - canvasWidth]
    this.y = playerY - canvasHeight / 2 // [0, height - canvasHeight]
    this.width = width
    this.height = height
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.playerX = playerX
    this.playerY = playerY
    this.image = image
  }

  public draw (context: CanvasRenderingContext2D): void {
    const { image, x, y, width, height } = this

    context.drawImage(image, x, y, width, height, 0, 0, width, height)
  }

  public onPlayerMove (playerX: number, playerY: number): void {
    this.playerX = playerX
    this.playerY = playerY

    this.shift()
  }

  public onCanvasResize (canvasWidth: number, canvasHeight: number): void {
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight

    this.shift()
  }

  private shift (): void {
    const { width, height, playerX, playerY, canvasWidth, canvasHeight } = this

    const x = playerX - canvasWidth / 2
    const y = playerY - canvasHeight / 2

    if (x >= 0 && x <= width - canvasWidth) {
      this.x = playerX - canvasWidth / 2
    }

    if (y >= 0 && y <= height - canvasHeight) {
      this.y = playerY - canvasHeight / 2
    }
  }
}

export default TileMap
