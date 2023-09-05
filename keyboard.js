const Directions = {
	Idle: 0,
	Left: -1,
	Right: 1
}

//https://www.toptal.com/developers/keycode
class Keyboard{
	constructor(canvas){
		this.direction = Directions.Idle;
		this.jump = false;
		this.run = false;
		this.fire = false;
		this.debug = 0;
		this.pan = Directions.Idle;
		this.wantDown = false;
		this.wantUp = false;

		document.addEventListener('keydown', (ev) => {
			if (ev.code == "ArrowLeft"){
				this.direction =  Directions.Left;
			}
			if (ev.code == "ArrowRight"){
				this.direction = Directions.Right;
			}
			
			if (ev.code == "ArrowUp"){
				this.wantUp = true;
			}

			if (ev.code == "ArrowDown"){
				this.wantDown = true;
			}

			if (ev.code == "ShiftLeft"){
				this.pan = Directions.Left;
			}

			if (ev.code == "ShiftRight"){
				this.pan = Directions.Right;
			}

			if (ev.code == "AltLeft"){
				this.jump = true;
			}
			
			if (ev.code == "ControlLeft"){
				this.run = true;
			}

			if (ev.code == "Space"){
				this.fire = true;
			}

			if (ev.code == "KeyD"){
				this.debug++;
			}

			if (ev.code == "KeyF" && canvas.requestFullscreen && ! canvas.fullscreenElement){
                canvas.requestFullscreen();
            }

			ev.preventDefault();    
			return false;
		}, false);
		
		document.addEventListener('keyup', (ev) => {
			if (this.direction == Directions.Left && ev.code == "ArrowLeft"){
				this.direction =  Directions.Idle;
			}

			if (this.direction == Directions.Right && ev.code == "ArrowRight"){
				this.direction = Directions.Idle;
			}
			
			if (ev.code == "ArrowUp"){
				this.wantUp = false;
			}
			
			if (ev.code == "ArrowDown"){
				this.wantDown = false;
			}

			if (this.pan == Directions.Left && ev.code == "ShiftLeft"){
				this.pan = Directions.Idle;
			}

			if (this.pan == Directions.Right && ev.code == "ShiftRight"){
				this.pan = Directions.Idle;
			}

			if (this.jump && ev.code == "AltLeft"){
				this.jump = false;
			}

			if (this.run && ev.code == "ControlLeft"){
				this.run = false;
			}

			ev.preventDefault();
			return false;
		}, false);
	}

	draw(gfx){}
}