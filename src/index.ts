import './index.scss'

window.addEventListener('load', (): void => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement

  canvas.width = canvas.clientWidth
  canvas.height = canvas.clientHeight

  const context = canvas.getContext('2d') as CanvasRenderingContext2D

  context.fillStyle = '#000'

  context.fillRect(0, 0, 30, 30)
})
