const Directions = {
	Idle: 0,
	Left: -1,
	Right: 1
}
//https://www.toptal.com/developers/keycode
const KeyMapping=[
{ //default
	left: "ArrowLeft",
	right: "ArrowRight",
	up: "ArrowUp",
	down: "ArrowDown",
	panLeft: "ShiftLeft",
	panRight: "ShiftRight",
	jump: "AltLeft",
	run: "ControlLeft",
	shoot: "Space"	
},
{ //unix
	left: "ArrowLeft",
	right: "ArrowRight",
	up: "ArrowUp",
	down: "ArrowDown",
	panLeft: "ShiftLeft",
	panRight: "ShiftRight",
	jump: "KeyZ",
	run: "KeyX",
	shoot: "Space"	
}
];

class Keyboard{
	constructor(canvas, mappingId){
		this.direction = Directions.Idle;
		this.jump = false;
		this.run = false;
		this.fire = false;
		this.debug = 0;
		this.pan = Directions.Idle;
		this.wantDown = false;
		this.wantUp = false;
		let keys = KeyMapping[mappingId];
		
		document.addEventListener('keydown', (ev) => {
			if (ev.code == keys.left){
				this.direction =  Directions.Left;
			}
			if (ev.code == keys.right){
				this.direction = Directions.Right;
			}
			
			if (ev.code == keys.up){
				this.wantUp = true;
			}

			if (ev.code == keys.down){
				this.wantDown = true;
			}

			if (ev.code == keys.panLeft){
				this.pan = Directions.Left;
			}

			if (ev.code == keys.panRight){
				this.pan = Directions.Right;
			}

			if (ev.code == keys.jump){
				this.jump = true;
			}
			
			if (ev.code == keys.run){
				this.run = true;
			}

			if (ev.code == keys.shoot){
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
			if (this.direction == Directions.Left && ev.code == keys.left){
				this.direction =  Directions.Idle;
			}

			if (this.direction == Directions.Right && ev.code == keys.right){
				this.direction = Directions.Idle;
			}
			
			if (ev.code == keys.up){
				this.wantUp = false;
			}
			
			if (ev.code == keys.down){
				this.wantDown = false;
			}

			if (this.pan == Directions.Left && ev.code == keys.panLeft){
				this.pan = Directions.Idle;
			}

			if (this.pan == Directions.Right && ev.code == keys.panRight){
				this.pan = Directions.Idle;
			}

			if (this.jump && ev.code == keys.jump){
				this.jump = false;
			}

			if (this.run && ev.code == keys.run){
				this.run = false;
			}

			ev.preventDefault();
			return false;
		}, false);
	}

	draw(gfx){}
}