class Touch{	
	constructor(canvas){
		this.direction = Directions.Idle;
		this.jump = false;
		this.run = false;
		this.debug = 0;
		this.pan = Directions.Idle;

        this.directionTouchIdentifier =-1;
        this.jumpTouchIdentifier =-1;

        this.leftButton  = {x:   30, y:440, w: 98, h: 98};
        this.rightButton = {x:  130, y:440, w: 98, h: 98};
        this.jumpButton  = {x: 1080, y:440, w: 98, h: 98};

		canvas.addEventListener('touchstart', (e)=>{
            
            if (canvas.requestFullscreen && ! canvas.fullscreenElement){
                canvas.requestFullscreen();
            }
            
            let rect = canvas.getBoundingClientRect();
			for (let touchobj of e.changedTouches){
                let x = (touchobj.clientX - rect.left);
                let y = (touchobj.clientY - rect.top);

                let pt = this.fullScreenToCanvas(canvas, x,y);
                
                if (this.overlaps(pt, this.leftButton)){
                    this.direction = Directions.Left;
                    this.directionTouchIdentifier = touchobj.identifier;
                } else if (this.overlaps(pt, this.rightButton)){
                    this.direction = Directions.Right;
                    this.directionTouchIdentifier = touchobj.identifier;
                } 

                if (this.overlaps(pt, this.jumpButton)){
                    this.jump = true;
                    this.jumpTouchIdentifier = touchobj.identifier;
                } 
            }
			e.preventDefault();
		}, false);
		
		canvas.addEventListener('touchmove', (e)=>{
			if (e.buttons == 0) return;
            var rect = canvas.getBoundingClientRect();
			for (let touchobj of e.changedTouches){                 
                let x = (touchobj.clientX - rect.left);
                let y = (touchobj.clientY - rect.top);

                let pt = this.fullScreenToCanvas(canvas, x,y);
                
                if (this.directionTouchIdentifier == touchobj.identifier){
                    if (this.overlaps(pt, this.leftButton)){
                        this.direction = Directions.Left;
                    }else if (this.overlaps(pt, this.rightButton)){
                        this.direction = Directions.Right;
                    } else {
                        this.direction = Directions.Idle;
                    }
                }
            }
			e.preventDefault();
		}, false);
		
		canvas.addEventListener('touchend', (e)=>{
            var rect = canvas.getBoundingClientRect();
			for (let touchobj of e.changedTouches){                
                let x = (touchobj.clientX - rect.left);
                let y = (touchobj.clientY - rect.top);
                
                //let pt = this.fullScreenToCanvas(canvas, x,y);
                
                if (this.directionTouchIdentifier == touchobj.identifier){
                    this.direction = Directions.Idle;
                }

                if (this.jumpTouchIdentifier == touchobj.identifier){
                    this.jump = false;
                }
            }
			e.preventDefault();
		}, false);
	}
    
    fullScreenToCanvas(canvas, x, y){
        if (screen.width / canvas.width < screen.height/canvas.height){
            //width fits, height is adjusted.
            let width = screen.width;
            let height = canvas.height * screen.width / canvas.width;
            let left = 0;
            let top = (screen.height - height) / 2;

            return {x: (x - left) / width * canvas.width, y: (y - top) / height * canvas.height};
        }else {
            //height fits, width is adjusted
            let width = canvas.width * screen.height / canvas.height;
            let height = screen.height;
            let left = (screen.width - width) / 2;
            let top = 0;

            return {x: (x - left) / width * canvas.width, y: (y - top) / height * canvas.height};
        }

    }


    overlaps(pt, button){
        return pt.x > button.x && pt.y > button.y && pt.x < button.x + button.w && pt.y < button.y + button.h;
    }

    draw(gfx){
		gfx.drawButton(this.leftButton.x,  this.leftButton.y, 0);
		gfx.drawButton(this.rightButton.x, this.rightButton.y,1);
		gfx.drawButton(this.jumpButton.x,  this.jumpButton.y, 2);
    }
}