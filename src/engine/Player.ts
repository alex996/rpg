import { Controls, MapArea, Camera } from '.'

class Player {
  public x: number
  public y: number

  private dx: number
  private dy: number

  private width: number
  private height: number

  private static ACCELERATION = 50
  private static DECELERATION = 25
  private static MAX_VELOCITY = 200

  public constructor ({
    x,
    y,
    width,
    height
  }: {
    x: number
    y: number
    width: number
    height: number
  }) {
    // Player position in the map, not canvas
    // minus the half of player width/height
    this.x = x
    this.y = y
    // Move speed in px per second
    this.dx = 0
    this.dy = 0
    this.width = width
    this.height = height
  }

  public update (
    controls: Controls,
    map: MapArea,
    dt: number // time between frames in seconds
  ): void {
    // Move the player when keys are pressed
    this.accelerate(controls)

    // Resolve any collision
    this.collide(map, dt)

    this.x += this.dx * dt
    this.y += this.dy * dt

    // Don't let the player leave map boundaries
    this.enclose(map)
  }

  private accelerate (controls: Controls): void {
    const { ACCELERATION, DECELERATION, MAX_VELOCITY } = Player

    if (controls.upKey) {
      this.dy -= ACCELERATION // speed up until max

      // reset if went over max
      if (this.dy < -MAX_VELOCITY) {
        this.dy = -MAX_VELOCITY
      }
    } else if (this.dy < 0) {
      this.dy += DECELERATION // slow down until still

      // reset if went over 0
      if (this.dy > 0) {
        this.dy = 0
      }
    }

    if (controls.rightKey) {
      this.dx += ACCELERATION

      if (this.dx > MAX_VELOCITY) {
        this.dx = MAX_VELOCITY
      }
    } else if (this.dx > 0) {
      this.dx -= DECELERATION

      if (this.dx < 0) {
        this.dx = 0
      }
    }

    if (controls.downKey) {
      this.dy += ACCELERATION

      if (this.dy > MAX_VELOCITY) {
        this.dy = MAX_VELOCITY
      }
    } else if (this.dy > 0) {
      this.dy -= DECELERATION

      if (this.dy < 0) {
        this.dy = 0
      }
    }

    if (controls.leftKey) {
      this.dx -= ACCELERATION

      if (this.dx < -MAX_VELOCITY) {
        this.dx = -MAX_VELOCITY
      }
    } else if (this.dx < 0) {
      this.dx += DECELERATION

      if (this.dx > 0) {
        this.dx = 0
      }
    }
  }

  private collide (map: MapArea, dt: number): void {
    const { dx, dy, width, height } = this
    // Top-left corner of the rendered rectangle
    const x = this.x - width / 2
    const y = this.y - height / 2

    if (dx !== 0) {
      const minRow = map.getRowAt(y)
      const maxRow = map.getRowAt(y + height) // y + height = bottom
      let minColumn = 0
      let maxColumn = 0

      if (dx < 0) {
        minColumn = map.getColumnAt(x + dx * dt)
        maxColumn = map.getColumnAt(x)
      } else {
        minColumn = map.getColumnAt(x + width)
        maxColumn = map.getColumnAt(x + width + dx * dt)
      }

      for (let row = minRow; row <= maxRow; row++) {
        for (let column = minColumn; column <= maxColumn; column++) {
          if (map.isSolidTile(column, row)) {
            this.x =
              this.dx < 0
                ? map.getXOf(column + 1)
                : map.getXOf(column) - width - 0.5

            this.x += width / 2 // reset back to center

            this.dx = 0

            // break out of the nested loops
            column = maxColumn + 1
            row = maxRow + 1
          }
        }
      }
    }

    if (dy !== 0) {
      const minColumn = map.getColumnAt(x)
      const maxColumn = map.getColumnAt(x + width)
      let minRow = 0
      let maxRow = 0

      if (dy < 0) {
        minRow = map.getRowAt(y + dy * dt)
        maxRow = map.getRowAt(y)
      } else {
        minRow = map.getRowAt(y + height)
        maxRow = map.getRowAt(y + height + dy * dt)
      }

      for (let row = minRow; row <= maxRow; row++) {
        for (let column = minColumn; column <= maxColumn; column++) {
          if (map.isSolidTile(column, row)) {
            this.y =
              dy < 0 ? map.getYOf(row + 1) : map.getYOf(row) - height - 0.5

            this.y += height / 2 // reset back to center

            this.dy = 0

            // break out of the nested loops
            column = maxColumn + 1
            row = maxRow + 1
          }
        }
      }
    }
  }

  private enclose (map: MapArea): void {
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
