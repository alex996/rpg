class Player {
  public x: number
  public y: number
  public canvasX: number
  public canvasY: number
  public width: number
  public height: number
  private image: HTMLImageElement
  private context: CanvasRenderingContext2D

  public constructor ({
    x,
    y,
    width,
    height,
    image,
    canvas,
    context
  }: {
    x: number
    y: number
    width: number
    height: number
    image: HTMLImageElement
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
  }) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
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
}

export default Player
