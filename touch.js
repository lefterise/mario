class Joystick {
    constructor() {
        this.y1 = 400;
        this.y2 = 546;
        this.yDefault = 473;
        this.areas = [
            {x1:  50,  x2:  90, direction: Directions.Left,  run: true },
            {x1:  90,  x2: 130, direction: Directions.Left,  run: false},
            {x1: 130,  x2: 170, direction: Directions.Idle,  run: false},
            {x1: 170,  x2: 210, direction: Directions.Right, run: false},
            {x1: 210,  x2: 250, direction: Directions.Right, run: true }
        ];
        this.y = this.yDefault;
        this.x = (this.areas[2].x1 + this.areas[2].x2)*0.5;
        this.id = null;
    }

    touchDown(pt, id){        
        if (pt.y >= this.y1 && pt.y <= this.y2){
            let state = this.getState(pt);
            if (state){
                this.id = id;
                this.x = pt.x;
                this.y = this.yDefault;
                if (state.direction == Directions.Idle){
                    this.y = this.clamp(pt.y, this.yDefault-30, this.yDefault+30);
                    this.x = (this.areas[2].x1 + this.areas[2].x2)*0.5;

                    if (this.y < this.yDefault - 20) state.wantUp = true;
                    if (this.y > this.yDefault + 20) state.wantDown = true;                    
                }
            }
            return state;
        }else{
            return null;
        }
    }

    clamp(v,min,max){
        if (v < min) return min;
        if (v > max) return max;
        return v;
    }

    touchMove(pt, id){
        if (id == this.id){
            let state = this.getState(pt);
            if (state){
                this.x = pt.x;
                this.y = this.yDefault;
                if (pt.x > this.areas[4].x2){
                    this.x = this.areas[4].x2;                    
                }
                if (state.direction == Directions.Idle){
                    this.y = this.clamp(pt.y, this.yDefault-30, this.yDefault+30);

                    if (this.y < this.yDefault - 20) state.wantUp = true;
                    if (this.y > this.yDefault + 20) state.wantDown = true;
                    
                    if (Math.abs(this.y - this.yDefault) > 11){ //Snap x to middle if in idle position and y goes outside the horizontal bar
                        this.x = (this.areas[2].x1 + this.areas[2].x2)*0.5;
                    }
                }
                return state;
            }else if (pt.x > this.areas[4].x2){
                this.x = this.areas[4].x2;
                this.y = this.yDefault;
                return {direction: Directions.Right, run: true, wantUp: false, wantDown: false};
            }else if (pt.x < this.areas[0].x1){
                this.x = this.areas[0].x1;
                this.y = this.yDefault;
                return {direction: Directions.Left, run: true, wantUp: false, wantDown: false};
            }
        }
        return null;
    }

    touchUp(id){                
        if (id == this.id){
            this.id = null;
            this.x = (this.areas[2].x1 + this.areas[2].x2)*0.5;
            this.y = this.yDefault;
            return {direction: Directions.Idle, run: false, wantUp: false, wantDown: false};
        }
    }

    getState(pt){
        for (let a of this.areas){
            if (pt.x >= a.x1 && pt.x < a.x2 ){
                return {direction: a.direction, run: a.run, wantUp: false, wantDown: false};
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
        this.jumpTouchIdentifier =-1;       
        this.jumpButton  = {x: 1040, y:430, w: 98, h: 98};
        this.shootButton = {x: 1040, y:320, w: 98, h: 98};
        this.fire = false;
        this.fireTouchIdentifier =-1;
        this.joystick = new Joystick();
        this.touchPosition ={ x:0, y:0};
        this.wantDown = false;
		this.wantUp = false;

		canvas.addEventListener('touchstart', (e)=>{
            
            if (canvas.requestFullscreen && document.fullscreenElement != canvas){                
                canvas.requestFullscreen();
                screen.orientation.lock("landscape");
            }
                        
			for (let touchobj of e.changedTouches){                
                
                let pt = this.mapToGameCoordinates(canvas, touchobj);
                this.touchPosition = pt;

                let state = this.joystick.touchDown(pt, touchobj.identifier);
                if (state){
                    this.direction = state.direction;
                    this.run = state.run;
                    this.wantDown = state.wantDown;
                    this.wantUp = state.wantUp;
                }

                if (this.overlaps(pt, this.jumpButton)){
                    this.jump = true;
                    this.jumpTouchIdentifier = touchobj.identifier;
                }

                if (this.overlaps(pt, this.shootButton)){
                    this.fire = true;
                    this.fireTouchIdentifier = touchobj.identifier;
                } 
            }
			e.preventDefault();
		}, false);
		
		canvas.addEventListener('touchmove', (e)=>{
			if (e.buttons == 0) return;
			for (let touchobj of e.changedTouches){                 
                let pt = this.mapToGameCoordinates(canvas, touchobj);

                this.touchPosition = pt;

                let state = this.joystick.touchMove(pt, touchobj.identifier);
                if (state){
                    this.direction = state.direction;
                    this.run = state.run;
                    this.wantDown = state.wantDown;
                    this.wantUp = state.wantUp;
                }
            }
			e.preventDefault();
		}, false);
		
		canvas.addEventListener('touchend', (e)=>{            
			for (let touchobj of e.changedTouches){                
                
                let state = this.joystick.touchUp(touchobj.identifier);
                if (state){
                    this.direction = state.direction;
                    this.run = state.run;
                    this.wantDown = state.wantDown;
                    this.wantUp = state.wantUp;
                }          

                if (touchobj.identifier == this.jumpTouchIdentifier){
                    this.jump = false;
                }

                if (touchobj.identifier == this.fireTouchIdentifier){
                    this.fire = false;
                }
            }
			e.preventDefault();
		}, false);
	}
    
    mapToGameCoordinates(canvas, touchobj){
        if (document.fullscreenElement == canvas){           
            if (canvas.clientWidth / canvas.width < canvas.clientHeight/canvas.height){
                //width fits, height is adjusted.
                let width = canvas.clientWidth;
                let height = canvas.height * canvas.clientWidth / canvas.width;
                let left = 0;
                let top = (canvas.clientHeight - height) / 2;

                return {x: (touchobj.clientX - left) / width * canvas.width, y: (touchobj.clientY - top) / height * canvas.height};
            }else {
                //height fits, width is adjusted
                let width = canvas.width * canvas.clientHeight / canvas.height;
                let height = canvas.clientHeight;
                let left = (canvas.clientWidth - width) / 2;
                let top = 0;

                return {x: (touchobj.clientX - left) / width * canvas.width, y: (touchobj.clientY - top) / height * canvas.height};
            }
        } else {
            return {x: touchobj.clientX / canvas.clientWidth * canvas.width, y: touchobj.clientY / canvas.clientHeight * canvas.height};
        }
    }

    overlaps(p, button){
        let cx = button.x + button.w * 0.5;
        let cy = button.y + button.h * 0.5;
        let r  = button.w * 0.5 + 12;
        return (p.x - cx) * (p.x - cx) + (p.y - cy) * (p.y - cy) < r * r;
    }

    draw(gfx){        
        gfx.drawJoystick(50,  this.joystick.yDefault-35);
        gfx.drawButton(this.joystick.x-49,  this.joystick.y-49, 0);
		gfx.drawButton(this.jumpButton.x,  this.jumpButton.y, 2);
        
        gfx.drawButton(this.shootButton.x,  this.shootButton.y, 3);

        gfx.ctx.fillStyle = "black";
        gfx.ctx.fillRect(this.touchPosition.x - 2, this.touchPosition.y - 2, 4, 4);        
    }
}