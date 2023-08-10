const Directions = {
	Idle: 0,
	Left: -1,
	Right: 1
}

//https://www.toptal.com/developers/keycode
class Keyboard{
	constructor(){
		this.direction = Directions.Idle;
	
		document.addEventListener('keydown', (ev) => {
			if (ev.code == "ArrowLeft"){
				this.direction =  Directions.Left;
			}
			if (ev.code == "ArrowRight"){
				this.direction = Directions.Right;
			}
			
			if (ev.code == "Space"){
				this.jump = true;
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

			if (this.jump && ev.code == "Space"){
				this.jump = false;
			}

			ev.preventDefault();
			return false;
		}, false);
	}
	
	getDirection(){
		return this.direction;
	}

	wantJump(){
		return this.jump;
	}
}