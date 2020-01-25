(() => {
  let canvas
  let ctx

  function initialize() {
    canvas = document.body.querySelector('#canvas')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    ctx = canvas.getContext('2d')
  }

  function render() {
    // ctx.shadowBlur = 5
    // ctx.shadowColor = '#666'
    // ctx.shadowOffsetX = 5
    // ctx.shadowOffsetY = 5

    // ctx.globalAlpha = 0.5

    drawRect(0, 0, canvas.width, canvas.height)
    drawLine(20, 20, 200, 200, '#f00')

    let points = [
      100, 100,
      300, 100,
      100, 300,
      300, 300
    ]
    drawPolygon(points, '#190')

    const POINT_COUNT = 5
    let randomPoints = []
    for (let i = 0; i < POINT_COUNT; ++i) {
      randomPoints.push(generateRandomInt(300), generateRandomInt(300))
    }
    drawPolygon(randomPoints, '#00f')

    drawCircle(400, 400, 50, '#fff')

    let startRadian = Math.random() * Math.PI * 2
    let endRadian = Math.random() * Math.PI * 2
    drawFan(500, 400, 50, startRadian, endRadian, '#109')

    drawQuadraticBezier(400, 100, 500, 100, 450, 0, '#0f0')
    drawCubicBezier(550, 100, 650, 100, 530, 0, 670, 0, '#0f0')

    let img = new Image()
    img.addEventListener('load', () => {
      ctx.drawImage(img, 400, 100, 250, 211)
      ctx.drawImage(img, 280, 70, 190, 170, 50, 320, 190, 170)
    })
    img.src = './machine_motion_capture.png'

    ctx.font = 'bold 30px cursive'
    ctx.textBaseline = 'alphabetic'
    ctx.textAlign = 'start'
    drawText('グラフィックスプログラミング', 100, 100, '#f0a', 150)

    let linearGradient = ctx.createLinearGradient(50, 500, 350, 700)
    linearGradient.addColorStop(0.0, '#f00')
    linearGradient.addColorStop(0.5, '#ff0')
    linearGradient.addColorStop(1.0, '#00f')
    ctx.fillStyle = linearGradient
    ctx.fillRect(50, 500, 300, 200)

    let radialGradient = ctx.createRadialGradient(500, 600, 20, 500, 600, 100)
    radialGradient.addColorStop(0.0, '#060')
    radialGradient.addColorStop(0.5, '#ff0')
    radialGradient.addColorStop(1.0, '#f0f')
    ctx.fillStyle = radialGradient
    ctx.beginPath()
    ctx.arc(500, 600, 100, 0.0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()

  }

  function drawRect(x, y, width, height, color) {
    if (color != null) ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
  }

  function drawLine(x1, y1, x2, y2, color, width = 1) {
    if (color != null) ctx.strokeStyle = color

    ctx.lineWidth = width
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.closePath()
    ctx.stroke()
  }

  function drawPolygon(points, color) {
    if (!Array.isArray(points) || points.length < 6) return
    if (color != null) ctx.fillStyle = color

    ctx.beginPath()
    ctx.moveTo(points[0], points[1])

    for (let i = 2; i < points.length; i += 2) {
      ctx.lineTo(points[i], points[i + 1])
    }

    ctx.closePath()
    ctx.fill()
  }

  function generateRandomInt(range) {
    let random = Math.random()
    return Math.floor(random * range)
  }

  function drawCircle(x, y, radius, color) {
    if (color != null) ctx.fillStyle = color

    ctx.beginPath()
    ctx.arc(x, y, radius, 0.0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
  }

  function drawFan(x, y, radius, startRadian, endRadian, color) {
    if (color != null) ctx.fillStyle = color

    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.arc(x, y, radius, startRadian, endRadian)
    ctx.closePath()
    ctx.fill()
  }

  function drawQuadraticBezier(x1, y1, x2, y2, cx, cy, color, width = 1) {
    if (color != null) ctx.fillStyle = color

    ctx.lineWidth = width
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.quadraticCurveTo(cx, cy, x2, y2)
    ctx.closePath()
    ctx.stroke()
  }

  function drawCubicBezier(x1, y1, x2, y2, cx1, cy1, cx2, cy2, color, width = 1) {
    if (color != null) ctx.fillStyle = color

    ctx.lineWidth = width
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x2, y2)
    ctx.closePath()
    ctx.stroke()
  }

  function drawText(text, x, y, color, width) {
    if (color != null) ctx.fillStyle = color
    ctx.fillText(text, x, y, width)
  }

  window.addEventListener('load', () => {
    initialize()
    render()
  })
})()
