const factory = function(_) {

	const waves = []
	let bg
	
	const count = 10
	const spacing = 20
	const offsetX = 42
	const offsetY = 22

	function Wave(py, dx, dy) {
		this.pos = _.createVector(0, py)
		this.delta = _.createVector(dx, dy)
	
		this.size = _.createVector(50, 150)
		this.yoff = 0
	
		this.render = function() {
			_.beginShape()
	
			const xStart = -this.size.x * this.size.x
			const xEnd = _.width + this.size.x * this.size.x
			
			let xoff = 0
	
			for (let x = xStart; x <= xEnd; x += this.size.x) {
	
				const n = _.noise(xoff, this.yoff)

				const dx = _.map(n, 
											0, 1, 
											-this.delta.x, this.delta.x)

				const ysize = this.size.y + this.delta.y

				const y = _.map(n, 
											0, 1,
											-ysize, ysize)
	
				_.curveVertex(x + dx, y + this.pos.y)
	
				xoff += 0.037 //0.04
			}
	
			this.yoff += 0.00112 //0.0014
	
			_.endShape()
		}
	}

	_.preload = function() {
		bg = _.loadImage('bg.png')
	}

	_.setup = function() {
		const cnv = _.createCanvas(_.windowWidth, _.windowHeight)
		cnv.parent('bg-container')
	
		let top = (_.height / 2) - (spacing * count) / 2
	
		for (let i = 0; i < count; i += 1) {
			waves[i] = new Wave(top + spacing * i, 
													offsetX * i, 
													offsetY * i)
		}
	}

	_.draw = function() {
		// console.log(_.frameRate())
		_.image(bg, 
						0, 0, _.width, _.height, 
						0, 0, _.width, _.height)

		_.noFill()
		_.stroke('#e60870')	
		_.strokeWeight(1.5)
		
		for (let wave of waves) {
			wave.render()
		}
	}

	_.windowResized = function() {
		_.resizeCanvas(_.windowWidth, _.windowHeight)		
	}

}

new p5(factory)