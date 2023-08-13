class Touch{	
	constructor(canvas){
		this.direction = Directions.Idle;
		this.jump = false;
		this.run = false;
		this.debug = 0;
		this.pan = Directions.Idle;

        this.leftButton = {x: 30, y:440, w: 98, h: 98}
        this.rightButton = {x: 130, y:440, w: 98, h: 98}
        this.jumpButton = {x: 1080, y:440, w: 98, h: 98}

		canvas.addEventListener('touchstart', (e)=>{
            
            if (canvas.requestFullscreen && ! canvas.fullscreenElement){
                canvas.requestFullscreen();
            }

			var touchobj = e.changedTouches[0];
			var rect = canvas.getBoundingClientRect();
			
            let x = (touchobj.clientX - rect.left) * canvas.width / canvas.clientWidth;
			let y = (touchobj.clientY - rect.top) * canvas.height / canvas.clientHeight;
			
            if (x > 30 && y > 440 && x < 30 + 98 && y < 440 +98){
                this.direction = Directions.Left;
            }

            if (this.overlaps(x, y, this.leftButton)){
                this.direction = Directions.Left;
            } else if (this.overlaps(x, y, this.rightButton)){
                this.direction = Directions.Right;
            } else {
                this.direction = Directions.Idle;    
            }

            if (this.overlaps(x, y, this.jumpButton)){
                this.jump = true;
            } 
			
			this.touchActive = {x: x, y: y};
			
			e.preventDefault();
		}, false);
		
		canvas.addEventListener('touchmove', (e)=>{
			if (e.buttons == 0) return;
			var touchobj = e.changedTouches[0];
			var rect = canvas.getBoundingClientRect();
			
			let x = (touchobj.clientX - rect.left) * canvas.width / canvas.clientWidth;
			let y = (touchobj.clientY - rect.top) * canvas.height / canvas.clientHeight;
				
            if (this.overlaps(x, y, this.leftButton)){
                this.direction = Directions.Left;
            }else if (this.overlaps(x, y, this.rightButton)){
                this.direction = Directions.Right;
            } else {
                this.direction = Directions.Idle;
            }

			e.preventDefault();
		}, false);
		
		canvas.addEventListener('touchend', (e)=>{
			var touchobj = e.changedTouches[0];
			var rect = canvas.getBoundingClientRect();
			
			let x = (touchobj.clientX - rect.left) * canvas.width / canvas.clientWidth;
			let y = (touchobj.clientY - rect.top) * canvas.height / canvas.clientHeight;
			
			this.direction = Directions.Idle;			            
            this.jump = false;

			e.preventDefault();
		}, false);
	}
    
    overlaps(x,y, button){
        return x > button.x && y > button.y && x < button.x + button.w && y < button.y + button.h;
    }

    draw(gfx){
		gfx.drawButton(this.leftButton.x, this.leftButton.y,0);
		gfx.drawButton(this.rightButton.x, this.rightButton.y,1);
		gfx.drawButton(this.jumpButton.x, this.jumpButton.y,2);
    }
}