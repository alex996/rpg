import './index.scss'

const canvas = document.getElementById('canvas') as HTMLCanvasElement

const context = canvas.getContext('2d') as CanvasRenderingContext2D

context.fillStyle = '#000'

context.fillRect(0, 0, 30, 30)
