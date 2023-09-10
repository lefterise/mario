class RespectsTerrain {
	computeFuturePosition(moveable, dt, terrain){

		let tDiagonal = terrain.getMultipointCollisionDistance(moveable.x, moveable.y, moveable.dx, moveable.dy, dt, moveable.collisionPoints);

		let x = moveable.x + moveable.dx * tDiagonal;
		let y = moveable.y + moveable.dy * tDiagonal;
				
		//check if mario can move stricly in dx or dy for the remainder of the distance
		let tHorizontal = terrain.getMultipointCollisionDistance(x, y, moveable.dx, 0.0, dt - tDiagonal, moveable.collisionPoints);	
		
		x = x + moveable.dx * tHorizontal;	

		let tVertical = terrain.getMultipointCollisionDistance(x, y, 0.0, moveable.dy, dt - tDiagonal, moveable.collisionPoints);

		y = y + moveable.dy * tVertical;

		moveable.futureX = x;
		moveable.futureY = y;
	}


	reactToNewPosition(moveable, dt, terrain){
		moveable.isTouchingGround = terrain.getMultipointCollisionDistance(moveable.x, moveable.y, 0.0,  1.0, 2.0, moveable.collisionPoints) <= 1.0 || moveable.isStandingOnSolid;
		moveable.isBumpingCeiling = terrain.getMultipointCollisionDistance(moveable.x, moveable.y, 0.0, -1.0, 2.0, moveable.collisionPoints) <= 1.0 || moveable.isBumpingSolid;
		
		moveable.isStandingOnSolid = false;
		moveable.isBumpingSolid = false;

		if (!moveable.isTouchingGround)
			moveable.dy = Math.min(moveable.dy + moveable.ay * dt, moveable.dyTerminal);
		else if (moveable.dy > 0.0)
			moveable.dy = 0.0;

		if (moveable.isBumpingCeiling && moveable.dy < 0.0){
			moveable.dy = 0.0;			
		}
	}
}

class IgnoresTerrain{
	computeFuturePosition(moveable, dt, terrain){
		moveable.futureX = moveable.x + moveable.dx * dt;
		moveable.futureY = moveable.y + moveable.dy * dt;
	}

	reactToNewPosition(moveable, dt, terrain){		
		moveable.dy = Math.min(moveable.dy + moveable.ay * dt, moveable.dyTerminal);		
	}
}

class ChangesDirectionWhenHittingWalls{
	computeFuturePosition(moveable, dt, terrain){}
	
	reactToNewPosition(moveable, dt, terrain){
		let isHittingLeftWall  = terrain.getMultipointCollisionDistance(moveable.x, moveable.y, -1.0, 0.0, 2.0, moveable.collisionPoints) <= 1.0;
		let isHittingRightWall = terrain.getMultipointCollisionDistance(moveable.x, moveable.y,  1.0, 0.0, 2.0, moveable.collisionPoints) <= 1.0;

		if (isHittingLeftWall && !isHittingRightWall){
			moveable.dx = Math.abs(moveable.dx);
		}
		if (!isHittingLeftWall && isHittingRightWall){
			moveable.dx = -Math.abs(moveable.dx);
		}
	}
}

class FlashesWhenHittingWalls{
	constructor(offsetX, offsetY){
		this.offsetX = offsetX;
		this.offsetY = offsetY;
	}
	computeFuturePosition(moveable, dt, terrain){}
	
	reactToNewPosition(moveable, dt, terrain){
		let isHittingLeftWall  = terrain.getMultipointCollisionDistance(moveable.x, moveable.y, -1.0, 0.0, 2.0, moveable.collisionPoints) <= 1.0;
		let isHittingRightWall = terrain.getMultipointCollisionDistance(moveable.x, moveable.y,  1.0, 0.0, 2.0, moveable.collisionPoints) <= 1.0;

		if (isHittingLeftWall){
			gGame.enemies.push(new WhiteFlash(moveable.x + moveable.collisionPoints[0].x + this.offsetX, moveable.y + moveable.collisionPoints[0].y + this.offsetY, 0.0, 0.0));
		}
		if (isHittingRightWall){
			gGame.enemies.push(new WhiteFlash(moveable.x + moveable.collisionPoints[1].x + this.offsetX, moveable.y + moveable.collisionPoints[1].y + this.offsetY, 0.0, 0.0));
		}
	}
}


class CanBumpBricksAbove{
	computeFuturePosition(moveable, dt, terrain){}
	
	reactToNewPosition(moveable, dt, terrain){
		let bumpedBricks = this.getBumpedBricks(moveable, terrain);
		if (bumpedBricks.length > 0)
			terrain.bumpBrick(bumpedBricks, moveable);
	}

	getBumpedBricks(moveable, terrain){
		let x1 = Math.floor((moveable.x + moveable.collisionPoints[CollisionPoints.TopLeft].x) / terrain.tileWidth);
		let x2 = Math.floor((moveable.x + moveable.collisionPoints[CollisionPoints.TopRight].x) / terrain.tileWidth);
	    let y  = Math.floor((moveable.y + moveable.collisionPoints[CollisionPoints.TopRight].y - 2.0) / terrain.tileHeight);

		let bumpedBricks = [];
		if (terrain.isBumpable(x1, y)){
			bumpedBricks.push({x:x1, y:y});
		}
		
		if (x1 != x2 && terrain.isBumpable(x2, y)){
			bumpedBricks.push({x:x2, y:y});
		}

		return bumpedBricks;
	}
}

class CanBumpBricksHorizontaly{
	computeFuturePosition(moveable, dt, terrain){}
	
	reactToNewPosition(moveable, dt, terrain){
		let bumpedBricks = this.getBumpedBricks(moveable, terrain);
		if (bumpedBricks.length > 0)
			terrain.bumpBrick(bumpedBricks, moveable);
	}

	getBumpedBricks(moveable, terrain){
		let x1 = Math.floor((moveable.x + moveable.collisionPoints[CollisionPoints.TopLeft].x - 2.0) / terrain.tileWidth);
		let x2 = Math.floor((moveable.x + moveable.collisionPoints[CollisionPoints.TopRight].x + 2.0) / terrain.tileWidth);
	    let y  = Math.floor((moveable.y + moveable.collisionPoints[CollisionPoints.TopRight].y) / terrain.tileHeight);

		let bumpedBricks = [];
		if (terrain.isBumpable(x1, y)){
			bumpedBricks.push({x:x1, y:y});
		}
		
		if (x1 != x2 && terrain.isBumpable(x2, y)){
			bumpedBricks.push({x:x2, y:y});
		}

		return bumpedBricks;
	}
}

class AvoidsCliffs{
	computeFuturePosition(moveable, dt, terrain){}
	
	reactToNewPosition(moveable, dt, terrain){
		let isLeftFootOnAir  = terrain.getPointCollisionDistance(moveable.x + moveable.collisionPoints[0].x, moveable.y + moveable.collisionPoints[0].y, 0.0, 1.0, 2.0, false) > 1.0;
		let isRightFootOnAir = terrain.getPointCollisionDistance(moveable.x + moveable.collisionPoints[1].x, moveable.y + moveable.collisionPoints[1].y, 0.0, 1.0, 2.0, false) > 1.0;

		if (moveable.isTouchingGround && isLeftFootOnAir){
			moveable.dx = Math.abs(moveable.dx);
		}

		if (moveable.isTouchingGround && isRightFootOnAir){
			moveable.dx = -Math.abs(moveable.dx);
		}
	}
}

class AnimationBehavior{
	constructor(startFrame, numFrames, frameDuration){
		this.animation = new Animation(numFrames, frameDuration);
		this.startFrame = startFrame;
	}

	changeSpeed(frameDuration){
		this.animation.transitionTime = frameDuration;
	}

	reset(startFrame, numFrames, frameDuration){
		this.animation.transitionTime = frameDuration;
		this.startFrame = startFrame;
		this.animation.frame = 0;
		this.animation.frames = numFrames;
	}

	computeFuturePosition(moveable, dt, terrain){
		this.animation.update(dt);
		moveable.frame = this.animation.frame + this.startFrame;
	}
	
	reactToNewPosition(moveable, dt, terrain){}
}

class AlarmBehavior{
	constructor(delay, name){
		this.delay = delay;
		this.name = name;
		this.timeElapsed = 0;
	}

	computeFuturePosition(moveable, dt, terrain){		
		this.timeElapsed += dt;
		if (this.timeElapsed > this.delay){
			//Remove the alarm behavior
			const behaviorIndex = moveable.behaviours.indexOf(this);
			if (behaviorIndex == -1) debugger;
			moveable.behaviours.splice(behaviorIndex, 1);

			moveable.alarm(this.name);
		}
	}
	
	reactToNewPosition(moveable, dt, terrain){}
}

class MinimumX{
	constructor(x){
		this.minX = x;
	}
	computeFuturePosition(moveable, dt, terrain){		
		if (moveable.futureX < this.minX) moveable.futureX = this.minX;
	}
	
	reactToNewPosition(moveable, dt, terrain){}
}

class MaximumX{
	constructor(x){
		this.maxX = x;
	}
	computeFuturePosition(moveable, dt, terrain){		
		if (moveable.futureX > this.maxX) moveable.futureX = this.maxX;
	}
	
	reactToNewPosition(moveable, dt, terrain){}
}

class HasFriction{
	computeFuturePosition(moveable, dt, terrain){}
	
	reactToNewPosition(moveable, dt, terrain){
		moveable.isTouchingGround = terrain.getMultipointCollisionDistance(moveable.x, moveable.y, 0.0,  1.0, 2.0, moveable.collisionPoints) <= 1.0 || moveable.isStandingOnSolid;

		if (Math.abs(moveable.dx) > 0.001 && moveable.isTouchingGround){
			moveable.dx = moveable.dx * 0.97;
		}
	}
}

class BouncesOnTouchGround{
	constructor(bounceSpeed){
		this.bounceSpeed = bounceSpeed;
	}

	computeFuturePosition(moveable, dt, terrain){}
	
	reactToNewPosition(moveable, dt, terrain){
		moveable.isTouchingGround = terrain.getMultipointCollisionDistance(moveable.x, moveable.y, 0.0,  1.0, 2.0, moveable.collisionPoints) <= 1.0 || moveable.isStandingOnSolid;
		if (moveable.isTouchingGround){
			moveable.dy = this.bounceSpeed;
		}
	}
}

class ChangesStateWhenHittingWalls{
	constructor(state){
		this.state = state;
	}

	computeFuturePosition(moveable, dt, terrain){}
	
	reactToNewPosition(moveable, dt, terrain){
		let isHittingLeftWall  = terrain.getMultipointCollisionDistance(moveable.x, moveable.y, -1.0, 0.0, 2.0, moveable.collisionPoints) <= 1.0;
		let isHittingRightWall = terrain.getMultipointCollisionDistance(moveable.x, moveable.y,  1.0, 0.0, 2.0, moveable.collisionPoints) <= 1.0;

		if (isHittingLeftWall || isHittingRightWall){
			moveable.state = this.state;
		}
	}
}

class ActsWhenSteppingOnBrick{
    constructor(brick, action){
        this.brick = brick;
        this.action = action;
    }
	computeFuturePosition(moveable, dt, terrain){}
	
	reactToNewPosition(moveable, dt, terrain){
        let x = Math.floor((moveable.x + (moveable.collisionPoints[CollisionPoints.BottomLeft].x + moveable.collisionPoints[CollisionPoints.BottomRight].x) * 0.5) / terrain.tileWidth);
	    let y = Math.floor((moveable.y + moveable.collisionPoints[CollisionPoints.BottomRight].y + 2.0) / terrain.tileHeight);

        if (terrain.inBounds(x,y) && terrain.tiles[x][y] == this.brick){
            this.action(x,y,terrain);
        }
	}
}

class BouncesWhenReachingY{
	constructor(y, bounceSpeed, delay){
		this.y = y;
		this.bounceSpeed = bounceSpeed;
		this.delay = delay;
		this.waiting = false;
		this.timeElapsed = 0;
	}

	computeFuturePosition(moveable, dt, terrain){}
	
	reactToNewPosition(moveable, dt, terrain){		
		if (moveable.y > this.y){
			moveable.y = this.y;
			if (!this.waiting){
				this.waiting = true;
				this.timeElapsed = 0;
			}
			
		}
		if (this.waiting){
			this.timeElapsed += dt;
			if (this.timeElapsed >= this.delay){
				moveable.dy = this.bounceSpeed;
				this.waiting = false;
			}
		}
	}
}

const EmergeStates = {
	emerging: 0,
	emerged: 1,
	submerging: 2,
	submerged: 3
};

class EmergesSubmerges{
	constructor(maxHeight, timeToGrowByOnePixel, timeToStayEmerged, timeToStaySubmerged){
		this.maxHeight = maxHeight; 
		this.height = 0;
		this.timeToGrowByOnePixel = timeToGrowByOnePixel;
		this.t = 0;
		this.state = EmergeStates.emerging;
		this.timeToStayEmerged = timeToStayEmerged;
		this.timeToStaySubmerged = timeToStaySubmerged;
	}

	computeFuturePosition(moveable, dt, terrain){
		this.t = this.t + dt;

		if (this.state == EmergeStates.emerging){			
			let pixelsToGrow = Math.floor(this.t / this.timeToGrowByOnePixel);
			this.height = this.height + pixelsToGrow;
			this.t = this.t - pixelsToGrow * this.timeToGrowByOnePixel;
			
			if (this.height >= this.maxHeight){
				this.height = this.maxHeight;
				this.state = EmergeStates.emerged;
				this.t = 0;
			}
		}else if (this.state == EmergeStates.emerged){
			if (this.t >= this.timeToStayEmerged){
				this.state = EmergeStates.submerging;
				this.t = 0;
			}
		}else if (this.state == EmergeStates.submerging){
			let pixelsToShrink = Math.floor(this.t / this.timeToGrowByOnePixel);
			this.height = this.height - pixelsToShrink;
			this.t = this.t - pixelsToShrink * this.timeToGrowByOnePixel;
			
			if (this.height <= 0){
				this.height = 0;
				this.state = EmergeStates.submerged;
				this.t = 0;
				moveable.state = States.Disabled;
			}
		}else if (this.state == EmergeStates.submerged){
			if (this.t >= this.timeToStaySubmerged){
				this.state = EmergeStates.emerging;
				this.t = 0;
				moveable.state = States.EmergingSubmerging;
			}
		}

		moveable.height = this.height;

		moveable.collisionPoints[2].y = -this.height;
		moveable.collisionPoints[3].y = -this.height;
	}
	
	reactToNewPosition(moveable, dt, terrain){}
}

class SpawnsSparkles{
	constructor(offsetX, offsetY, width, height, maxSize, duration, sparkleSpawnInterval, enabled){
		this.resize(offsetX, offsetY, width, height);
		this.reconfigure(maxSize, duration, sparkleSpawnInterval);
		this.setEnable(enabled);
	}

	setEnable(enabled){
		this.enabled = enabled;
	}

	resize(offsetX, offsetY, width, height){
		this.offsetX = offsetX;
		this.offsetY = offsetY;
		this.width = width;
		this.height = height;
	}

	reconfigure(maxSize, duration, sparkleSpawnInterval){		
		this.maxSize = maxSize;
		this.duration= duration;
		this.t = 0;
		this.sparkleSpawnInterval = sparkleSpawnInterval;
	}


	computeFuturePosition(moveable, dt, terrain){
		if (!this.enabled)
			return;

		this.t += dt;		
		let sparklesToAdd = Math.floor(this.t / this.sparkleSpawnInterval);		
		this.t = this.t - sparklesToAdd * this.sparkleSpawnInterval;

		for (let i=0; i < sparklesToAdd; ++i){
			moveable.sparkles.push({x: moveable.x + this.offsetX + Math.random() * this.width, y: moveable.y + this.offsetY + Math.random() * this.height, size: this.maxSize, spikes: 4, t: 0, maxSize: this.maxSize, duration: this.duration});
		}
	}
	reactToNewPosition(moveable, dt, terrain){}
}

class Sparkling{
	computeFuturePosition(moveable, dt, terrain){		
		for (let s of moveable.sparkles){
			s.size = Math.random() * s.maxSize * (s.duration - s.t)/s.duration;
			s.t = s.t + dt;
		}

		moveable.sparkles = moveable.sparkles.filter(s => s.t < s.duration);
	}
	reactToNewPosition(moveable, dt, terrain){}
}


class Submerges{
	constructor(maxHeight, timeToGrowByOnePixel, completionCallback){		
		this.height = maxHeight;
		this.timeToGrowByOnePixel = timeToGrowByOnePixel;
		this.t = 0;
		this.completionCallback = completionCallback;
		this.maxHeight = maxHeight;
	}

	computeFuturePosition(moveable, dt, terrain){
		this.t = this.t + dt;

		let pixelsToShrink = Math.floor(this.t / this.timeToGrowByOnePixel);
		this.height = this.height - pixelsToShrink;
		this.t = this.t - pixelsToShrink * this.timeToGrowByOnePixel;
		
		if (this.height <= 0){
			this.height = 0;
			this.t = 0;
			this.completionCallback();
		}else {		
			moveable.height = this.height;
			moveable.clipY =  this.maxHeight - this.height;
			moveable.offY = 0;
		}
	}
	
	reactToNewPosition(moveable, dt, terrain){}
}

class Emerges{
	constructor(maxHeight, timeToGrowByOnePixel, completionCallback){		
		this.height = 0;
		this.timeToGrowByOnePixel = timeToGrowByOnePixel;
		this.t = 0;
		this.completionCallback = completionCallback;
		this.maxHeight = maxHeight;
	}

	computeFuturePosition(moveable, dt, terrain){
		this.t = this.t + dt;

		let pixelsToGrow = Math.floor(this.t / this.timeToGrowByOnePixel);
		this.height = this.height + pixelsToGrow;
		this.t = this.t - pixelsToGrow * this.timeToGrowByOnePixel;
		
		if (this.height >= this.maxHeight){
			this.height = this.maxHeight;
			this.t = 0;
			this.completionCallback();
		}else {		
			moveable.height = this.height;
			moveable.clipY = this.maxHeight - this.height;
			moveable.offY = 0;
		}
	}
	
	reactToNewPosition(moveable, dt, terrain){}
}


class GetsSuckedUpThePipe{
	constructor(maxHeight, timeToGrowByOnePixel, completionCallback){		
		this.height = maxHeight;
		this.maxHeight = maxHeight;
		this.timeToGrowByOnePixel = timeToGrowByOnePixel;
		this.t = 0;
		this.completionCallback = completionCallback;
	}

	computeFuturePosition(moveable, dt, terrain){
		this.t = this.t + dt;

		let pixelsToShrink = Math.floor(this.t / this.timeToGrowByOnePixel);
		this.height = this.height - pixelsToShrink;
		this.t = this.t - pixelsToShrink * this.timeToGrowByOnePixel;
		
		if (this.height <= 0){
			this.height = 0;
			this.t = 0;
			this.completionCallback();
		}else{		
			moveable.height = this.height;
			moveable.clipY = 0;
			moveable.offY = this.maxHeight - this.height;
		}
	}
	
	reactToNewPosition(moveable, dt, terrain){}
}

class EmergesFromSkyPipe{
	constructor(maxHeight, timeToGrowByOnePixel, completionCallback){		
		this.height = 0;
		this.timeToGrowByOnePixel = timeToGrowByOnePixel;
		this.t = 0;
		this.completionCallback = completionCallback;
		this.maxHeight = maxHeight;		
	}

	computeFuturePosition(moveable, dt, terrain){
		this.t = this.t + dt;

		let pixelsToGrow = Math.floor(this.t / this.timeToGrowByOnePixel);
		this.height = this.height + pixelsToGrow;
		this.t = this.t - pixelsToGrow * this.timeToGrowByOnePixel;
		
		if (this.height >= this.maxHeight){
			this.height = this.maxHeight;
			this.t = 0;
			this.completionCallback();
		}else {		
			moveable.height = this.height;
			moveable.clipY = 0;
			moveable.offY = this.maxHeight - this.height;
		}
	}
	
	reactToNewPosition(moveable, dt, terrain){}
}