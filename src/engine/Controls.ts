class Controls {
  public upKey = false

  public rightKey = false

  public downKey = false

  public leftKey = false

  public activate (): void {
    document.addEventListener('keydown', (e: KeyboardEvent): void => {
      const { key } = e

      if (key === 'ArrowUp' || key === 'w') {
        this.upKey = true
      } else if (key === 'ArrowRight' || key === 'd') {
        this.rightKey = true
      } else if (key === 'ArrowDown' || key === 's') {
        this.downKey = true
      } else if (key === 'ArrowLeft' || key === 'a') {
        this.leftKey = true
      }
    })

    document.addEventListener('keyup', (e: KeyboardEvent): void => {
      const { key } = e

      if (key === 'ArrowUp' || key === 'w') {
        this.upKey = false
      } else if (key === 'ArrowRight' || key === 'd') {
        this.rightKey = false
      } else if (key === 'ArrowDown' || key === 's') {
        this.downKey = false
      } else if (key === 'ArrowLeft' || key === 'a') {
        this.leftKey = false
      }
    })
  }
}

export default Controls
