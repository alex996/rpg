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
      }
      if (key === 'ArrowRight' || key === 'd') {
        this.rightKey = true
      }
      if (key === 'ArrowDown' || key === 's') {
        this.downKey = true
      }
      if (key === 'ArrowLeft' || key === 'a') {
        this.leftKey = true
      }
    })

    document.addEventListener('keyup', (e: KeyboardEvent): void => {
      const { key } = e

      if (key === 'ArrowUp' || key === 'w') {
        this.upKey = false
      }
      if (key === 'ArrowRight' || key === 'd') {
        this.rightKey = false
      }
      if (key === 'ArrowDown' || key === 's') {
        this.downKey = false
      }
      if (key === 'ArrowLeft' || key === 'a') {
        this.leftKey = false
      }
    })
  }
}

export default Controls
