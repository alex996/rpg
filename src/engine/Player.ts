import { Controls } from '.'

class Player {
  public x: number
  public y: number

  private dx: number
  private dy: number

  private width: number
  private height: number

  public constructor ({
    x,
    y,
    dx,
    dy,
    width,
    height
  }: {
    x: number
    y: number
    dx?: number
    dy?: number
    width: number
    height: number
  }) {
    // Player position in the map, not canvas
    this.x = x
    this.y = y
    // Move speed in px per second
    this.dx = dx || 200
    this.dy = dy || 200
    this.width = width
    this.height = height
  }

  public update (
    controls: Controls,
    secondsPassed: number, // time between frames in seconds
    mapWidth: number,
    mapHeight: number
  ): void {
    // Move the player when keys are pressed
    if (controls.upKey) {
      this.y -= this.dy * secondsPassed
    }
    if (controls.rightKey) {
      this.x += this.dx * secondsPassed
    }
    if (controls.downKey) {
      this.y += this.dx * secondsPassed
    }
    if (controls.leftKey) {
      this.x -= this.dx * secondsPassed
    }

    // Don't let the player leave map boundaries
    if (this.x - this.width / 2 < 0) {
      this.x = this.width / 2
    }
    if (this.y - this.height / 2 < 0) {
      this.y = this.height / 2
    }
    if (this.x + this.width / 2 > mapWidth) {
      this.x = mapWidth - this.width / 2
    }
    if (this.y + this.height / 2 > mapHeight) {
      this.y = mapHeight - this.height / 2
    }
  }

  public draw (
    context: CanvasRenderingContext2D,
    cameraX: number,
    cameraY: number
  ): void {
    context.save()
    context.fillStyle = '#000'
    context.fillRect(
      // Convert player's map position to canvas position
      this.x - this.width / 2 - cameraX,
      this.y - this.height / 2 - cameraY,
      this.width,
      this.height
    )
    context.restore()
  }
}

export default Player
