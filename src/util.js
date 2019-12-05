import { http } from './setting.json'
import io from 'socket.io-client'
import 'canvg'
export function formatNumber (num) {
  let s = String(num)
  const reg = /(^[+-]?\d+)(\d{3})/
  while (reg.test(s)) {
    s = s.replace(reg, '$1,$2')
  }
  return s
}

export function readCsv (csv, delimiter = '\t') {
  const attributes = {}
  const rows = csv.split('\n').map(line => {
    line = line.trim()
    if (line.startsWith('#')) {
      const comments = line.slice(1).split(':')
      if (comments.length > 1 && comments[0].trim() !== '') {
        attributes[comments[0].trim()] = comments[1].trim()
      }
      return []
    }
    return line.split(delimiter).filter(x => x !== '').map(x => x.trim())
  }).filter(row => row.length > 0)
  return {
    attributes, rows
  }
}

const aElement = document.createElement('a')
aElement.style.display = 'none'
document.body.appendChild(aElement)
export function downloadText (text, fileName) {
  return downloadDataUrl(window.URL.createObjectURL(new Blob([text], {
    type: 'application/text'
  })), fileName)
}

export function downloadSvg (svg, fileName) {
  const rect = svg.getBoundingClientRect()
  const canvas = document.getElementById('canvasSvg')
  const ctx = canvas.getContext('2d')
  canvas.width = rect.width
  canvas.height = rect.height
  ctx.drawSvg(svg.outerHTML, 0, 0, rect.width, rect.height)
}

export function downloadDataUrl (url, fileName) {
  aElement.download = fileName
  aElement.href = url
  aElement.click()
}

export const downloadUrl = downloadDataUrl

class WSocket {
  sessId
  socket
  resultFn
  constructor () {
    this.sessId = ''
    this.resultFn = () => {}
    this.socket = io(process.env.NODE_ENV === 'production' ? http.production.baseURL : http.dev.baseURL)
    this.generate()
    this.socket.on('regenerate', () => this.generate())
    this.socket.on('result', (...args) => this.resultFn(...args))
  }
  once (name, eventListener) {
    this.socket.once(name, eventListener)
  }
  on (name, eventListener) {
    this.socket.on(name, eventListener)
  }
  off (name) {
    this.socket.off(name)
  }
  emit (...args) {
    this.socket.emit(...args)
  }
  generate () {
    this.sessId = Math.random()
    this.socket.emit('setup', { sessId: this.sessId })
  }
}

export const wSocket = new WSocket()

const initialize = window.initialize
export const DisplayModule = {
  init (options) {
    return initialize(options)
  }
}

export function decodeBfs (path) {
  const iters = []
  path.split('\n').forEach(function (line) {
    let d = line.split(' ')
    if (d.length < 2) return
    let iter = parseInt(d[0])
    let from = parseInt(d[1])
    while (iter >= iters.length) iters.push({})
    iters[iter][from] = []
    for (let i = 2; i < d.length; i++) {
      if (!d[i]) continue
      iters[iter][from].push(parseInt(d[i]))
    }
  })
  return iters
}
