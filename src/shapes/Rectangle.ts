class Rectangle {
  public left: number
  public top: number
  public right: number
  public bottom: number

  public width: number
  public height: number

  public constructor ({
    left,
    top,
    width,
    height
  }: {
    left: number
    top: number
    width: number
    height: number
  }) {
    this.left = left
    this.top = top
    this.width = width
    this.height = height
    this.right = this.left + this.width
    this.bottom = this.top + this.height
  }

  public update (left: number, top: number): void {
    this.left = left
    this.top = top
    this.right = this.left + this.width
    this.bottom = this.top + this.height
  }

  public within (rect: Rectangle): boolean {
    return (
      rect.left <= this.left &&
      rect.right >= this.right &&
      rect.top <= this.top &&
      rect.bottom >= this.bottom
    )
  }

  public overlaps (rect: Rectangle): boolean {
    return (
      this.left < rect.right && // overlaps at this left side
      rect.left < this.right && // overlaps at this right side
      this.top < rect.bottom && // overlaps at this top side
      rect.top < this.bottom // overlaps at this bottom side
    )
  }
}

export default Rectangle
