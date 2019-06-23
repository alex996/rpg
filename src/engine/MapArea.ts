import { Tilemap } from '.'

class MapArea {
  public width: number
  public height: number

  private tilemap: Tilemap
  private spritesheet: HTMLImageElement

  private bottom?: HTMLImageElement
  private top?: HTMLImageElement

  private static TILE_SIZE = 64

  public constructor ({
    tilemap,
    spritesheet
  }: {
    tilemap: Tilemap
    spritesheet: HTMLImageElement
  }) {
    this.tilemap = tilemap
    this.spritesheet = spritesheet
    this.width = this.tilemap.columns * MapArea.TILE_SIZE
    this.height = this.tilemap.rows * MapArea.TILE_SIZE
  }

  public generate (): void {
    this.generateBottom()
    this.generateTop()
  }

  private generateBottom (): void {
    this.bottom = this.generateLayer(this.tilemap.visualGrid.bottom)
  }

  private generateTop (): void {
    this.top = this.generateLayer(this.tilemap.visualGrid.top, true)
  }

  private generateLayer (grid: [number], transparent = false): HTMLImageElement {
    const { width, height, spritesheet, tilemap } = this

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    context.imageSmoothingEnabled = false // retain pixel sharpness

    const { columns, rows, tileSize } = tilemap
    const columnsInAtlas = spritesheet.width / tileSize
    const { TILE_SIZE } = MapArea

    for (let column = 0; column < columns; column++) {
      for (let row = 0; row < rows; row++) {
        const tileIndex = grid[tilemap.getTileIndex(column, row)]

        if (tileIndex < 0) {
          continue
        }

        const sx = (tileIndex % columnsInAtlas) * tileSize
        const sy = Math.floor(tileIndex / columnsInAtlas) * tileSize

        const dx = column * TILE_SIZE
        const dy = row * TILE_SIZE

        context.drawImage(
          spritesheet,
          sx,
          sy,
          tileSize,
          tileSize,
          dx,
          dy,
          TILE_SIZE,
          TILE_SIZE
        )
      }
    }

    // Save the generated map as this image texture
    const image = new Image()
    image.src = canvas.toDataURL(transparent ? 'image/png' : 'image/jpeg')
    return image
  }

  public drawTop (
    context: CanvasRenderingContext2D,
    cameraX: number,
    cameraY: number
  ): void {
    this.draw(this.top as HTMLImageElement, context, cameraX, cameraY)
  }

  public drawBottom (
    context: CanvasRenderingContext2D,
    cameraX: number,
    cameraY: number
  ): void {
    this.draw(this.bottom as HTMLImageElement, context, cameraX, cameraY)
  }

  private draw (
    image: HTMLImageElement,
    context: CanvasRenderingContext2D,
    cameraX: number,
    cameraY: number
  ): void {
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

export default MapArea
