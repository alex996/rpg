import { Controls, MapArea, Camera } from '.'

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
    // minus the half of player width/height
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
    map: MapArea,
    secondsPassed: number // time between frames in seconds
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
    if (this.x + this.width / 2 > map.width) {
      this.x = map.width - this.width / 2
    }
    if (this.y + this.height / 2 > map.height) {
      this.y = map.height - this.height / 2
    }
  }

  public draw (context: CanvasRenderingContext2D, camera: Camera): void {
    context.save()
    context.fillStyle = '#000'
    context.fillRect(
      // Convert player's map position to canvas position
      this.x - this.width / 2 - camera.x,
      this.y - this.height / 2 - camera.y,
      this.width,
      this.height
    )
    context.restore()
  }
}

export default Player
