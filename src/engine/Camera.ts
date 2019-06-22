import { Player } from '.'
import { Rectangle } from '../shapes'

class Camera {
  public x: number
  public y: number

  private xDeadZone: number
  private yDeadZone: number

  private view: Rectangle
  private map: Rectangle

  private player?: Player

  public constructor ({
    x,
    y,
    canvasWidth,
    canvasHeight,
    mapWidth,
    mapHeight
  }: {
    x: number
    y: number
    canvasWidth: number
    canvasHeight: number
    mapWidth: number
    mapHeight: number
  }) {
    // Left-top coordinates of the camera in the map
    this.x = x || 0
    this.y = y || 0
    // Distance from player to border before camera starts to move
    this.xDeadZone = 0 // min distance to horizontal borders
    this.yDeadZone = 0 // min distance to vertical borders
    // Rectangle that represents the viewport
    this.view = new Rectangle({
      left: this.x,
      top: this.y,
      width: canvasWidth,
      height: canvasHeight
    })
    // Rectangle that represents the map's boundary
    this.map = new Rectangle({
      left: 0,
      top: 0,
      width: mapWidth,
      height: mapHeight
    })
  }

  public update (): void {
    // Keep following the player
    if (this.player) {
      // Move the camera on horizontal axis based on player X coord
      if (this.player.x - this.x + this.xDeadZone > this.view.width) {
        this.x = this.player.x - (this.view.width - this.xDeadZone)
      } else if (this.player.x - this.xDeadZone < this.x) {
        this.x = this.player.x - this.xDeadZone
      }
      // Move the camera on vertical axis based on player Y coord
      if (this.player.y - this.y + this.yDeadZone > this.view.height) {
        this.y = this.player.y - (this.view.height - this.yDeadZone)
      } else if (this.player.y - this.yDeadZone < this.y) {
        this.y = this.player.y - this.yDeadZone
      }
    }

    // Update viewport
    this.view.update(this.x, this.y)

    // Don't let camera leave the map boundary
    if (!this.view.within(this.map)) {
      if (this.view.left < this.map.left) {
        this.x = this.map.left
      }
      if (this.view.top < this.map.top) {
        this.y = this.map.top
      }
      if (this.view.right > this.map.right) {
        this.x = this.map.right - this.view.width
      }
      if (this.view.bottom > this.map.bottom) {
        this.y = this.map.bottom - this.view.height
      }
    }

    // Prevent the camera from jerking when map is smaller than canvas
    this.x = Math.max(this.x, 0)
    this.y = Math.max(this.y, 0)
  }

  // The player is always in the middle except when near the borders
  public follow (player: Player, xDeadZone: number, yDeadZone: number): void {
    this.player = player
    this.xDeadZone = xDeadZone
    this.yDeadZone = yDeadZone
  }
}

export default Camera
