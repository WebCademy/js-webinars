const COLUMNS_SIZE = 201
const ROWS_SIZE = 201
const FIELD_SIZE = 5
const PADDING = 10
const TRACTORS_NUMBER = 1000

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
const map = createMap()

const tractors = []
setField(0, 0, 'space')

init()
start()

function start () {
	requestAnimationFrame(tick)
}

function tick (timestamp) {
	moveTractors()

	clearCanvas()
	drawMap()

	if (!isMaze()) {
		drawTractors()
		requestAnimationFrame(tick)
	}
}

function init () {
	canvas.width = PADDING * 2 + COLUMNS_SIZE * FIELD_SIZE
	canvas.height = PADDING * 2 + ROWS_SIZE * FIELD_SIZE

	for (let i = 0; i < TRACTORS_NUMBER; i++) {
		tractors.push({ x: 0, y: 0 })
	}
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

function drawTractors () {
	for (const tractor of tractors) {
		context.fillStyle = 'red'
		context.beginPath()
		context.rect(PADDING + tractor.x * FIELD_SIZE, PADDING + tractor.y * FIELD_SIZE, FIELD_SIZE, FIELD_SIZE)
		context.fill()		
	}
}

function moveTractors () {
	for (const tractor of tractors) {

		const directs = []

		if (tractor.x > 0) {
			directs.push('left')
		}

		if (tractor.x < COLUMNS_SIZE - 2) {
			directs.push('right')
		}

		if (tractor.y > 0) {
			directs.push('up')
		}

		if (tractor.y < ROWS_SIZE - 2) {
			directs.push('down')
		}

		const direct = getRandomFrom(directs)

		switch (direct) {
			case 'left':
				if (getField(tractor.x - 2, tractor.y) === 'wall') {
					setField(tractor.x - 1, tractor.y, 'space')
					setField(tractor.x - 2, tractor.y, 'space')
				}

				tractor.x -= 2 // tractor.x = tractor.x - 2
				break
			case 'right':
				if (getField(tractor.x + 2, tractor.y) === 'wall') {
					setField(tractor.x + 1, tractor.y, 'space')
					setField(tractor.x + 2, tractor.y, 'space')
				}

				tractor.x += 2 // tractor.x = tractor.x + 2
				break
			case 'up':
				if (getField(tractor.x, tractor.y - 2) === 'wall') {
					setField(tractor.x, tractor.y - 1, 'space')
					setField(tractor.x, tractor.y - 2, 'space')
				}

				tractor.y -= 2 // tractor.y = tractor.y - 2
				break
			case 'down':
				if (getField(tractor.x, tractor.y + 2) === 'wall') {
					setField(tractor.x, tractor.y + 1, 'space')
					setField(tractor.x, tractor.y + 2, 'space')
				}

				tractor.y += 2 // tractor.y = tractor.y + 2
				break
		}
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

function createMap () {
	const map = []

	for (let y = 0; y < ROWS_SIZE; y++) {
		const row = []

		for (let x = 0; x < COLUMNS_SIZE; x++) {
			row.push('wall')
		}

		map.push(row)
	}

	return map
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

function getRandomFrom (array) {
	const index = Math.floor(Math.random() * array.length)
	return array[index]
}

function isEven (n) {
	return n % 2 === 0
}

function isMaze () {
	for (let x = 0; x < COLUMNS_SIZE; x++) {
		for (let y = 0; y < ROWS_SIZE; y++) {
			if (isEven(x) && isEven(y) && getField(x, y) === 'wall') {
				return false
			}
		}
	}

	return true
}