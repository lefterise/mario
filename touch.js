class Joystick {
    constructor() {
        this.y1 = 400;
        this.y2 = 546;
        this.areas = [
            {x1: 0,   x2: 75,  direction: Directions.Left, run: true},
            {x1: 75,  x2: 150, direction: Directions.Left, run: false},
            {x1: 150, x2: 225, direction: Directions.Idle, run: false},
            {x1: 225, x2: 300, direction: Directions.Right, run: false},
            {x1: 300, x2: 375, direction: Directions.Right, run: true}
        ];
        this.y = this.y1;
        this.x = this.areas[2].x1 + 49;
        this.id = null;
    }

    touchDown(pt, id){
        this.id = id;
        let state = this.getState(pt);
        if (state)
            this.x = pt.x;
        return state;
    }

    touchMove(pt, id){
        if (id == this.id){            
            let state = this.getState(pt);
            if (state){
                this.x = pt.x;
                return state;
            }else if (pt.x > this.areas[4].x1){
                this.x = this.areas[4].x1 + 49;
                return {direction: Directions.Right, run: true};
            }else if (pt.x < this.areas[0].x1){
                this.x = this.areas[0].x1 + 49;
                return {direction: Directions.Left, run: true};
            }
        }
        return null;
    }

    touchUp(id){                
        if (id == this.id){
            this.id = null;
            this.x = this.areas[2].x1 + 49;
            return {direction: Directions.Idle, run: false};
        }
    }

    getState(pt){        
        if (pt.y >= this.y1 && pt.y <= this.y2){
            for (let a of this.areas){
                if (pt.x >= a.x1 && pt.x < a.x2 ){
                    return {direction: a.direction, run: a.run};
                }
            }
        }
        return null;
    }
}

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
        this.jumpButton  = {x: 1040, y:440, w: 98, h: 98};

        this.joystick = new Joystick();

		canvas.addEventListener('touchstart', (e)=>{
            
            if (canvas.requestFullscreen && !canvas.fullscreenElement){
                screen.orientation.lock("landscape");
                canvas.requestFullscreen();                
            }
            
            let rect = canvas.getBoundingClientRect();
			for (let touchobj of e.changedTouches){
                let x = (touchobj.clientX - rect.left);
                let y = (touchobj.clientY - rect.top);

                let pt = this.fullScreenToCanvas(canvas, x,y);
                
                let state = this.joystick.touchDown(pt, touchobj.identifier);
                if (state){
                    this.direction = state.direction;
                    this.run = state.run;
                }

                /*
                if (this.overlaps(pt, this.leftButton)){
                    this.direction = Directions.Left;
                    this.directionTouchIdentifier = touchobj.identifier;
                    navigator.vibrate(100);
                } else if (this.overlaps(pt, this.rightButton)){
                    this.direction = Directions.Right;
                    this.directionTouchIdentifier = touchobj.identifier;
                    navigator.vibrate(100);
                } */

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
                
                
                    let state = this.joystick.touchMove(pt, touchobj.identifier);
                    if (state){
                        this.direction = state.direction;
                        this.run = state.run;
                    }

                    //if (this.directionTouchIdentifier == touchobj.identifier){
                    /*
                    if (this.overlaps(pt, this.leftButton)){
                        this.direction = Directions.Left;
                    }else if (this.overlaps(pt, this.rightButton)){
                        this.direction = Directions.Right;
                    }
                    else {
                        this.direction = Directions.Idle;
                    }*/
                //}
            }
			e.preventDefault();
		}, false);
		
		canvas.addEventListener('touchend', (e)=>{
            var rect = canvas.getBoundingClientRect();
			for (let touchobj of e.changedTouches){                
                let x = (touchobj.clientX - rect.left);
                let y = (touchobj.clientY - rect.top);
                
                let state = this.joystick.touchUp(touchobj.identifier);
                if (state){
                    this.direction = state.direction;
                    this.run = state.run;
                }
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
        gfx.drawButton(this.joystick.x - 49,  this.joystick.y, 0);

        gfx.drawButton(this.joystick.areas[0].x1,  this.joystick.y, 0);
        gfx.drawButton(this.joystick.areas[1].x1,  this.joystick.y, 0);
        gfx.drawButton(this.joystick.areas[2].x1,  this.joystick.y, 0);
        gfx.drawButton(this.joystick.areas[3].x1,  this.joystick.y, 0);
        gfx.drawButton(this.joystick.areas[4].x1,  this.joystick.y, 0);

		//gfx.drawButton(this.leftButton.x,  this.leftButton.y, 0);
		//gfx.drawButton(this.rightButton.x, this.rightButton.y,1);
		gfx.drawButton(this.jumpButton.x,  this.jumpButton.y, 2);
    }
}