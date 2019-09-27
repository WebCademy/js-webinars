const COLUMNS_SIZE = 101
const ROWS_SIZE = 101
const FIELD_SIZE = 10
const PADDING = 10
const TRACTORS_NUMBER = 10

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
const map = generatMaze(COLUMNS_SIZE, ROWS_SIZE, TRACTORS_NUMBER)

let startPositon = null
let finishPosition = null

init()
start()

function start () {
	requestAnimationFrame(tick)

	mouseWatcher(canvas, function (mouse) {
		if (mouse.x <= PADDING
			|| mouse.y <= PADDING
			|| mouse.x >= canvas.width - PADDING
			|| mouse.y >= canvas.height - PADDING
		) {
			return
		}

		const coordinats = {
			x: parseInt((mouse.x - PADDING) / FIELD_SIZE),
			y: parseInt((mouse.y - PADDING) / FIELD_SIZE)
		}

		if (getField(coordinats.x, coordinats.y) === 'space') {
			finishPosition = coordinats
		}
	})
}

function tick (timestamp) {
	clearCanvas()
	drawMap()

	if (startPositon && finishPosition) {
		const way = getWay(map, startPositon, finishPosition)
		drawWay(way)
	}

	requestAnimationFrame(tick)
}

function init () {
	canvas.width = PADDING * 2 + COLUMNS_SIZE * FIELD_SIZE
	canvas.height = PADDING * 2 + ROWS_SIZE * FIELD_SIZE

	canvas.addEventListener('click', function (event) {
		if (finishPosition) {
			startPositon = {
				x: finishPosition.x,
				y: finishPosition.y
			}
		}
	})
}

function drawMap () {
	for (let x = 0; x < COLUMNS_SIZE; x++) {
		for (let y = 0; y < ROWS_SIZE; y++) {
			if (getField(x, y) === 'wall') {
				context.fillStyle = 'black'
				context.beginPath()
				context.rect(PADDING + x * FIELD_SIZE, PADDING + y * FIELD_SIZE, FIELD_SIZE, FIELD_SIZE)
				context.fill()
			}
		}
	}
}

function drawWay (way) {
	for (const [x, y] of way) {
		context.fillStyle = 'red'
		context.beginPath()
		context.rect(PADDING + x * FIELD_SIZE, PADDING + y * FIELD_SIZE, FIELD_SIZE, FIELD_SIZE)
		context.fill()
	}
}

function clearCanvas () {
	context.fillStyle = 'black'
	context.beginPath()
	context.rect(0, 0, canvas.width, canvas.height)
	context.fill()

	context.fillStyle = 'white'
	context.beginPath()
	context.rect(PADDING, PADDING, canvas.width - PADDING * 2, canvas.height - PADDING * 2)
	context.fill()
}

function getField (x, y) {
	if (x < 0 || x >= COLUMNS_SIZE || y < 0 || y >= ROWS_SIZE) {
		return null
	}

	return map[y][x]
}

function setField (x, y, value) {
	if (x < 0 || x >= COLUMNS_SIZE || y < 0 || y >= ROWS_SIZE) {
		return null
	}

	map[y][x] = value
}