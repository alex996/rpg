class TileMap {
  public width: number
  public height: number

  private image?: HTMLImageElement

  private static TILE_SIZE = 64

  public constructor ({ width, height }: { width: number; height: number }) {
    this.width = width
    this.height = height
  }

  public generate (): void {
    const canvas = document.createElement('canvas')
    canvas.width = this.width
    canvas.height = this.height
    const context = canvas.getContext('2d') as CanvasRenderingContext2D

    const { TILE_SIZE } = TileMap
    const rows = this.width / TILE_SIZE
    const columns = this.height / TILE_SIZE

    let color = 'green'
    context.save()
    context.fillStyle = color
    for (let x = 0, i = 0; i < rows; x += TILE_SIZE, i++) {
      context.beginPath()
      for (let y = 0, j = 0; j < columns; y += TILE_SIZE, j++) {
        context.rect(x, y, TILE_SIZE - 4, TILE_SIZE - 4)
      }
      color = color === 'green' ? 'darkgreen' : 'green'
      context.fillStyle = color
      context.fill()
      context.closePath()
    }
    context.restore()

    // Save the generated map as this image texture
    this.image = new Image()
    this.image.src = canvas.toDataURL('image/jpeg')
  }

  public draw (
    context: CanvasRenderingContext2D,
    cameraX: number,
    cameraY: number
  ): void {
    const image = this.image as HTMLImageElement

    // Offset from (0, 0) in the map to crop from (same as camera.x/y)
    const sx = cameraX
    const sy = cameraY
    // Dimensions of the cropped image (same as canvas.width/height)
    let sWidth = context.canvas.width
    let sHeight = context.canvas.height

    // If cropped image is smaller than canvas, change crop dimensions
    if (image.width - sx < sWidth) {
      sWidth = image.width - sx
    }
    if (image.height - sy < sHeight) {
      sHeight = image.height - sy
    }

    // Always crop from top-left corner
    const dx = 0
    const dy = 0
    // Match destination with source, so as not to scale the image
    const dWidth = sWidth
    const dHeight = sHeight

    context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
  }
}

export default TileMap
