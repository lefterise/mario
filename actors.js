const States = {
	Idle: 0,
	Walking: 1,
	Cowering: 2,
	Spinning: 3,
	Dying: 4,
	Dead: 5,
	Collectable: 6,
	Solid: 7,
	Sprouting: 8,
	EnemyKilling: 9,
	Invulnerable: 10,
	EmergingSubmerging: 11,
	Disabled: 12,
	Collapsible: 13,
}

const CollisionPoints = {	
	BottomLeft: 0,
	BottomRight: 1,
	TopLeft: 2,
	TopRight: 3,
	Bottom:0,
	Left:0,
	Top: 3,
	Right: 3
};

class Moveable{
	constructor(x, y, dx, dy){
		this.x = x;     //in pixels
		this.y = y;     //in pixels
		this.dx = dx;   //in pixels per millisecond
		this.dy = dy;   //in pixels per millisecond
		this.ay = 0.0025;  //in pixels per millisecond per millisecond
		this.dyTerminal = 1.0; //in pixels per millisecond
		this.isTouchingGround = false;
		this.isBumpingCeiling = false;
		this.collisionPoints = []; //The first four must be the corners: bottom-left, bottom-right, top-left, top-right (see CollisionPoints enum)
		this.futureX = x; //in pixels
		this.futureY = y; //in pixels		
		this.behaviours = [];
	}

	getTop(){
		return this.y + this.collisionPoints[CollisionPoints.Top].y;
	}

	getBottom(){
		return this.y + this.collisionPoints[CollisionPoints.Bottom].y;
	}

	getLeft(){
		return this.x + this.collisionPoints[CollisionPoints.Left].x;
	}

	getRight(){
		return this.x + this.collisionPoints[CollisionPoints.Right].x;
	}

	getCenter(){
		return this.x + (this.collisionPoints[CollisionPoints.Left].x + this.collisionPoints[CollisionPoints.Right].x) * 0.5;
	}

	getRelativeLocationTo(other){
		let al = this.x + this.collisionPoints[CollisionPoints.Left].x;
		let ar = this.x + this.collisionPoints[CollisionPoints.Right].x;
		let at = this.y + this.collisionPoints[CollisionPoints.Top].y;
		let ab = this.y + this.collisionPoints[CollisionPoints.Bottom].y;

		let bl = other.x + other.collisionPoints[CollisionPoints.Left].x;
		let br = other.x + other.collisionPoints[CollisionPoints.Right].x;
		let bt = other.y + other.collisionPoints[CollisionPoints.Top].y;
		let bb = other.y + other.collisionPoints[CollisionPoints.Bottom].y;

		return {above: ab < bt, below: at > bb, left: ar < bl, right: al > br };
	}


	getDistanceFromOtherMoveable(other){
		let al = this.futureX + this.collisionPoints[CollisionPoints.Left].x;
		let ar = this.futureX + this.collisionPoints[CollisionPoints.Right].x;
		let at = this.futureY + this.collisionPoints[CollisionPoints.Top].y;
		let ab = this.futureY + this.collisionPoints[CollisionPoints.Bottom].y;

		let bl = other.futureX + other.collisionPoints[CollisionPoints.Left].x;
		let br = other.futureX + other.collisionPoints[CollisionPoints.Right].x;
		let bt = other.futureY + other.collisionPoints[CollisionPoints.Top].y;
		let bb = other.futureY + other.collisionPoints[CollisionPoints.Bottom].y;

		let dx1 = al - br;
		let dx2 = bl - ar;
		let dy1 = at - bb;
		let dy2 = bt - ab;

		return {dx: Math.max(dx1,dx2), dy: Math.max(dy1,dy2)};
	}

	calculateFuturePosition(dt, terrain){
		for (let b of this.behaviours){
			b.computeFuturePosition(this, dt, terrain);
		}
	}
	
	applyPosition(dt, terrain){
		this.x = this.futureX;
		this.y = this.futureY;

		for (let b of this.behaviours){
			b.reactToNewPosition(this, dt, terrain);
		}
	}
}

class Mario extends Moveable{
	constructor(x,y,dx,dy){
		super(x,y,dx,dy);
		this.smallCollisionPoints = [
			{x:-26, y:  0}, 
			{x: 26, y:  0},
			{x:-26, y:-58}, 
			{x: 26, y:-58},   
			{x:-26, y:-25}, 
			{x: 26, y:-25},
		];
		this.bigCollisionPoints = [
			{x:-26, y:  0}, 
			{x: 26, y:  0},
			{x:-26, y:-78}, 
			{x: 26, y:-78},
			{x:-26, y:-39}, 
			{x: 26, y:-39},
		];
		this.collisionPoints = this.smallCollisionPoints;
		this.animation = new AnimationBehavior(0,1,250);
		this.sparkleBehavior = new SpawnsSparkles(-26, -50, 52, 50, 10, 500, 25, false, "#FFFFFF");
		this.maxBehaviourX = new MaximumX(179*60-30);
		this.defaultBehaviours = [
			new RespectsTerrain(), 
			new CanBumpBricksAbove(), 
			new MinimumX(30), 
			this.maxBehaviourX, 
			this.animation, 
			new ActsWhenSteppingOnBrick(Tile.Spike, ()=>this.takeDamage()), 
			new ActsWhenBumpingBrick(Tile.SpikeDown, ()=>{this.takeDamage(); this.dy = 0;}), 
			new ActsWhenSteppingOnBrick(Tile.BouncyNote, (x,y,terrain)=>this.jumpOnNote(x,y,terrain)),			
			new Sparkling(),
			this.sparkleBehavior			
		];
		this.behaviours = this.defaultBehaviours;
		this.facing = 1;
		this.direction = Directions.Idle;
		this.heightForSize = [60, 81, 81];
		this.size = 0;		
		this.height = this.heightForSize[this.size];
		this.clipY = 0;
		this.offY = 0;
		this.isJumpPressed = false;
		this.isRunning = false;
		this.state = States.Walking;
		this.sparkles = [];
		this.activeSparkleEvents = 0;
		this.starIsActive = false;
	}

	reset(x,y, maxX){
		this.x = this.futureX = x;
		this.y = this.futureY = y;
		this.dx = 0.0;
		this.dy = 0.0;
		this.state = States.Walking;
		this.behaviours = this.defaultBehaviours;
		this.maxBehaviourX.maxX = maxX;
	}

	collidesWith(other, otherState){
		this.anchorDy = 0;

		if (otherState == States.Dead || otherState == States.Dying || this.state == States.Dying) return;

		if (otherState == States.Collectable) {
			other.collect(this);
			return;
		}

		let relativeLocation = this.getRelativeLocationTo(other);


		if (otherState == States.Collapsible){
		  if(this.y < other.y + other.collisionPoints[CollisionPoints.Top].y + 14){
			this.futureY = other.futureY + other.collisionPoints[CollisionPoints.Top].y;
			this.isStandingOnSolid = true;
			this.anchorDy = other.dy;
			return;		
		  }
		}

		if (otherState == States.Solid) {
			if (this.dy > 0 && relativeLocation.above){
				let distance = this.getDistanceFromOtherMoveable(other);

				this.dy = 0.0;
				this.y = this.futureY = this.futureY + distance.dy;
				this.isStandingOnSolid = true;
			}

			if (this.dy < 0 && relativeLocation.below){
				this.dy = 0.0;
				this.futureY = this.y;
				this.isBumpingSolid = true;
				other.bump(this);
			}

			if (relativeLocation.left || relativeLocation.right){
				this.dx = 0.0;	
				this.futureX = this.x;
			}
			return;
		}

		if (this.starIsActive){
			if (other.wipe){
				other.wipe();
			}
			return;
		}
		
		if (otherState == States.Disabled){
			return;
		}

		if (otherState == States.EmergingSubmerging){
			this.takeDamage();
			return;
		}
		
		if (relativeLocation.above){
			this.dy = this.isJumpPressed ? -1.1 : -0.7;			
			this.y = this.futureY = other.y + other.collisionPoints[CollisionPoints.Top].y - 1;			
			other.stomp(this);
		}else{
			if (otherState == States.Walking || otherState == States.Spinning){				
                this.takeDamage();
			}

			if (other.touch && this.state != States.Invulnerable){
				other.touch(this);

				this.futureX = this.x;
				this.futureY = this.y;
			}
		}
	}

	exitPipeDownwards(position, terrain){
		this.futureX = this.x = position.x * terrain.tileWidth;
		this.futureY = this.y = position.y * terrain.tileHeight + terrain.tileHeight - this.collisionPoints[CollisionPoints.Top].y;
		this.height = 0;
		this.clipY = 0;
		this.offY = this.maxHeight;

		sound.pipe.play();
		this.behaviours = [new EmergesFromSkyPipe(this.heightForSize[this.size], 20, ()=>{ this.behaviours = this.defaultBehaviours; this.clipY = 0; this.offY = 0; this.height = this.heightForSize[this.size]; this.state = States.Walking;})];		
	}

	exitPipeUpwards(position, terrain){
		this.futureX = this.x = position.x * terrain.tileWidth;
		this.futureY = this.y = position.y * terrain.tileHeight - this.collisionPoints[CollisionPoints.Bottom].y;
		this.height = 0;
		this.clipY = this.maxHeight;
		this.offY = 0;

		sound.pipe.play();
		this.behaviours = [new Emerges(this.heightForSize[this.size], 20, ()=>{ this.behaviours = this.defaultBehaviours;  this.clipY = 0; this.offY = 0; this.height = this.heightForSize[this.size]; this.state = States.Walking;})];		
	}

	enterPipe(terrain, directionDown){
		if (this.state == States.EmergingSubmerging)
			return;

		let pipe = null;
		if (directionDown && (pipe = terrain.isAbovePipeEntrance(this))){
			this.state = States.EmergingSubmerging;
			this.behaviours = [new Submerges(this.heightForSize[this.size], 20, ()=>{ 
				if (pipe.exit.level){
					if (pipe.exit.storeState){
						gGame.saveState(pipe.exit.storeState);
					}
					gGame.loadState(pipe.exit.level);
				}

				if (pipe.exit.direction == 0){
					this.exitPipeUpwards(pipe.exit, terrain);
				}else if (pipe.exit.direction == 1){
					this.exitPipeDownwards(pipe.exit, terrain);					
				}
			})];
			sound.pipe.play();
		}else if (!directionDown && (pipe = terrain.isBelowPipeEntrance(this))){
			this.state = States.EmergingSubmerging;
			this.behaviours = [new GetsSuckedUpThePipe(this.heightForSize[this.size], 20, ()=>{ 
				if (pipe.exit.direction == 0){
					this.exitPipeUpwards(pipe.exit, terrain);
				}else if (pipe.exit.direction == 1){
					this.exitPipeDownwards(pipe.exit, terrain);					
				}
			})];
			sound.pipe.play();
		}		
	}

    takeDamage(){
        if (this.state == States.Invulnerable)
            return;
        
        if (this.size == 0){
            sound.die.play();
            this.state = States.Dying;
            this.behaviours = [new IgnoresTerrain()];
            this.dx =  0.0;
            this.dy = -0.7;
        }else{
            this.shrink();
            sound.powerdown.play();
            this.state = States.Invulnerable;
            this.behaviours.push(new AlarmBehavior(1500, "MakeVulnerable"));		
        }
    }

	jumpOnNote(x,y,terrain){
		if (this.state == States.Dying) return;
		this.dy = -1.20;
		sound.bump.play();

		terrain.bumpBrick([{x:x,y:y}], this);
	}

	jump(){
		if (this.state == States.Dying || this.dy < -1.02) return;
		this.dy = this.isRunning ? -1.02 : -0.9;
		sound.jump.play();
	}

	setJumpPressed(value){
		if (this.state == States.Dying) return;
		this.isJumpPressed = value;
		if (!value && this.dy < -0.7){
			this.dy = -0.7;
		}
	}

	star(){
		this.sparkleBehavior.setEnable(true);
		++this.activeSparkleEvents;
		this.behaviours.push(new AlarmBehavior(12000, "ExpireSparkles"));
		this.behaviours.push(new AlarmBehavior(12000, "ExpireStar"));
		this.starIsActive = true;
	}

	grow(){
		this.size = 1;
		this.height = this.heightForSize[this.size];
		this.collisionPoints = this.bigCollisionPoints;
		this.sparkleBehavior.resize(-26, -78, 52, 78);
		this.sparkleBehavior.setEnable(true);
		++this.activeSparkleEvents;
		this.behaviours.push(new AlarmBehavior(500, "ExpireSparkles"));
	}

	flower(){
		this.size = 2;
		this.height = this.heightForSize[this.size];
		this.collisionPoints = this.bigCollisionPoints;
		this.sparkleBehavior.resize(-26, -78, 52, 78);
		this.sparkleBehavior.setEnable(true);
		++this.activeSparkleEvents;
		this.behaviours.push(new AlarmBehavior(500, "ExpireSparkles"));
	}

	shrink(){
		this.size = 0;
		this.height = this.heightForSize[this.size];
		this.collisionPoints = this.smallCollisionPoints;
		this.sparkleBehavior.resize(-26, -50, 52, 50);
		this.sparkleBehavior.setEnable(true);
		++this.activeSparkleEvents;
		this.behaviours.push(new AlarmBehavior(500, "ExpireSparkles"));
	}

	shoot(enemies){
		if (this.size == 2){
			sound.fireball.play();
			if (this.facing == 1)
				enemies.push(new Fireball(this.x + 20, this.y - 30,  0.5, 0.0));
			else
				enemies.push(new Fireball(this.x - 20, this.y - 30, -0.5, 0.0));
		}
	}

	setDirection(direction, running){
		if (this.state == States.Dying) return;

		if (direction != Directions.Idle){
			this.facing = direction == Directions.Left ? 0 : 1;
		}

		if (direction != this.direction){
			if (direction != Directions.Idle){
				this.animation.reset(0,2,250); //walking
			}else{
				this.animation.reset(0,1,250); //standing
			}
		}

		if (running){
			this.animation.changeSpeed(125);
		}else{
			this.animation.changeSpeed(250);
		}

		this.dx = 0.2 * direction * (running ? 2 : 1);

		this.direction = direction;
		this.isRunning = running;
	}

	alarm(name){
		if (name == "MakeVulnerable"){
			this.state = States.Walking;
		}else if (name == "ExpireSparkles"){
			--this.activeSparkleEvents;
			if (this.activeSparkleEvents == 0){
				this.sparkleBehavior.setEnable(false);
			}
		}else if (name == "ExpireStar"){
			this.starIsActive = false;
		}
	}
}

class Goomba extends Moveable{
	constructor(x,y,dx,dy){		
		super(x,y,dx,dy);
		this.state = States.Walking;
		this.collisionPoints = [
			{x:  4, y:  0}, 
			{x: 56, y:  0},
			{x:  4, y:-41}, 
			{x: 56, y:-41},
		];

		this.behaviours = [new RespectsTerrain(), new ChangesDirectionWhenHittingWalls(), new AnimationBehavior(0,2,300)];		
	}

	collidesWith(other, otherState){
		if (this.state == States.Dead || this.state == States.Dying || otherState == States.Dead || otherState == States.Dying || otherState == States.Collectable) return;
		
		if (otherState == States.Spinning || otherState == States.EnemyKilling){
			this.wipe();
			return;
		}

		let relativeLocation = this.getRelativeLocationTo(other);
		if (relativeLocation.above){
			this.dy = 0;
			this.futureY = this.y;
		}else if (relativeLocation.left || relativeLocation.right){
			this.dx = -this.dx;
			this.futureX = this.x;			
		}
	}

	stomp(mario){
		this.state = States.Dying;
		this.behaviours = [new AlarmBehavior(1000, "CleanupCorpse")];
		this.frame = 2;
		sound.stomp.play();
	}

	wipe(){
		this.state = States.Dying;		
		this.behaviours = [new IgnoresTerrain()];
		this.frame = 3;
		this.dy = -0.5;
		sound.kick.play();
		gGame.enemies.push(new WhiteFlash(this.x + 30, this.y - 21, 0.0, 0.0));
	}

	alarm(name){
		if (name == "CleanupCorpse"){
			this.state = States.Dead;
		}
	}
}

class Spiney extends Goomba {
	constructor(x,y,dx,dy){		
		super(x,y,dx,dy);
	}
}

class Koopa extends Moveable{
	constructor(x,y,dx,dy){
		super(x,y,dx,dy);
		this.collisionPoints = [
			{x: -26, y:  0}, 
			{x:  26, y:  0},
			{x: -26, y:-41}, 
			{x:  26, y:-41},
		];
		this.walk();
	}

	collidesWith(other, otherState){
		if (this.state == States.Dead || this.state == States.Dying || otherState == States.Dead || otherState == States.Dying || otherState == States.Collectable) return;

		if (otherState == States.Spinning || otherState == States.EnemyKilling){
			this.wipe();
		}

		let relativeLocation = this.getRelativeLocationTo(other);
		if ((relativeLocation.left || relativeLocation.right) && this.state != States.Spinning){
			this.dx = -this.dx;
			this.futureX = this.x;			
		}
		if (relativeLocation.above){
			this.dy = 0;
			this.futureY = this.y;
		}
	}

	wipe(){
		this.state = States.Dying;		
		this.behaviours = [new IgnoresTerrain()];
		this.frame = 3;
		this.dy = -0.5;
		sound.kick.play();
		gGame.enemies.push(new WhiteFlash(this.x + 30, this.y - 21, 0.0, 0.0));
	}

	stomp(mario){
		if (this.state == States.Walking){
			this.cower();
		}else if (this.state == States.Cowering){
			this.kick(mario);
		}else if(this.state == States.Spinning){
			this.cower();
		}
	}

	touch(mario){
		if (this.state == States.Cowering){
			this.kick(mario);
		}
	}

	walk(){
		this.state = States.Walking;
		this.behaviours = [new RespectsTerrain(), new ChangesDirectionWhenHittingWalls(), new AnimationBehavior(0,2,300)];
	}

	cower(){
		this.state = States.Cowering;
		this.dx = 0.1 * Math.sign(this.dx);
		this.behaviours = [new AlarmBehavior(3000, "Shake")];
		this.frame = 3;
		sound.stomp.play();
	}

	kick(mario){
		this.behaviours = [new RespectsTerrain(), new ChangesDirectionWhenHittingWalls(), new AnimationBehavior(2,3,75), new CanBumpBricksHorizontaly(), new FlashesWhenHittingWalls(0,-21)];
		this.dx = 0.66 * ((mario.futureX < this.x) ? 1 : -1);
		this.futureX = this.x;
		this.state = States.Spinning;
		sound.kick.play();
	}

	shake(){
		this.behaviours = [new AnimationBehavior(2,3,100), new AlarmBehavior(500, "Emerge")];
	}

	alarm(name){
		if (name == "Shake"){
			this.shake();
		}else if (name == "Emerge"){
			this.walk();
		}
	}
}

class RedKoopa extends Koopa{
	constructor(x,y,dx,dy){
		super(x,y,dx,dy);
	}

	walk(){
		this.state = States.Walking;
		this.behaviours = [new RespectsTerrain(), new ChangesDirectionWhenHittingWalls(), new AvoidsCliffs(), new AnimationBehavior(0,2,300)];
	}
}

class Coin extends Moveable{
	constructor(x,y,dx,dy){
		super(x,y,dx,dy);
		this.collisionPoints = [
		{x: 10, y: 40},	
		{x: 51, y: 40},
		{x: 10, y:  0}, 
		{x: 51, y:  0}			
		];
		this.behaviours = [];
		this.state = States.Collectable;
	}
	
	collect(mario){
		sound.coin.play();
		this.state = States.Dead;
	}

	collidesWith(other, otherState){
		if (this.state == States.Dead || otherState == States.Dead || otherState == States.Dying) return;
	}
}

class PopupCoin extends Moveable{
	constructor(x,y,dx,dy){
		super(x,y,dx,dy);
		this.collisionPoints = [
		{x: 10, y: 40},	
		{x: 51, y: 40},
		{x: 10, y:  0}, 
		{x: 51, y:  0}			
		];
		this.sparkles = [];		
		this.behaviours = [new IgnoresTerrain(), new AlarmBehavior(500, "Disappear"), new SpawnsSparkles(10, 0, 41, 40, 10, 500, 50, true, "#FFFFFF"), new Sparkling()];
		this.state = States.Dying;
	}
	
	alarm(name){
		if (name == "Disappear"){
			this.state = States.Dead;
		}
	}

	collidesWith(other, otherState){
		if (this.state == States.Dead || otherState == States.Dead || otherState == States.Dying) return;
	}
}

class Mushroom extends Moveable{
	constructor(x,y,dx,dy){
		super(x,y,dx,dy);
		this.collisionPoints = [
		{x:  1, y: 40},	
		{x: 59, y: 40},
		{x:  1, y:  0}, 
		{x: 59, y:  0}			
		];				
		this.state = States.Sprouting;		
		this.behaviours = [new AnimationBehavior(0,42,12), new AlarmBehavior(500, "BecomeCollectable")];
	}
	
	becomeCollectable(){
		this.state = States.Collectable;
		this.behaviours = [new RespectsTerrain(), new ChangesDirectionWhenHittingWalls()];
		this.frame = 42;
		this.dy = -0.3;
	}

	collect(mario){		
		sound.powerup.play();
		this.state = States.Dead;
		if (mario.size == 0){
			mario.grow();
		}
	}

	collidesWith(other, otherState){
		if (this.state == States.Dead || otherState == States.Dead || otherState == States.Dying) return;
	}

	alarm(name){
		if (name == "BecomeCollectable"){
			this.becomeCollectable();
		}
	}
}

class PoisonousMushroom extends Mushroom{
	constructor(x,y,dx,dy){
		super(x,y,dx,dy);		
	}		

	collect(mario){		
		this.state = States.Dead;
		mario.takeDamage();
	}
}

class LifeMushroom extends Mushroom{
	constructor(x,y,dx,dy){
		super(x,y,dx,dy);		
	}		

	collect(mario){		
		this.state = States.Dead;
		sound.life.play();
	}
}

class Star extends Moveable{
	constructor(x,y,dx,dy){
		super(x,y,dx,dy);
		this.collisionPoints = [
		{x:  1, y: 40},	
		{x: 59, y: 40},
		{x:  1, y:  0}, 
		{x: 59, y:  0}			
		];				
		this.state = States.Sprouting;
		this.sparkles = [];
		this.behaviours = [new AnimationBehavior(0,42,12), new AlarmBehavior(500, "BecomeCollectable"),new SpawnsSparkles(1, 0, 58, 40, 10, 200, 30, true, "#FFFFFF"), new Sparkling()];
	}
	
	becomeCollectable(){
		this.state = States.Collectable;
		this.behaviours = [new RespectsTerrain(), new BouncesOnTouchGround(-0.8), new ChangesDirectionWhenHittingWalls(), new SpawnsSparkles(1, 0, 58, 40, 10, 1000, 30, true, "#FFFFFF"), new Sparkling()];
		this.frame = 42;
		this.dy = -0.3;
		this.dx = 0.2;
	}

	collect(mario){		
		sound.star.play();
		this.state = States.Dead;
		mario.star();
	}

	collidesWith(other, otherState){
		if (this.state == States.Dead || otherState == States.Dead || otherState == States.Dying) return;
	}

	alarm(name){
		if (name == "BecomeCollectable"){
			this.becomeCollectable();
		}
	}
}

class Flower extends Moveable{
	constructor(x,y,dx,dy){
		super(x,y,dx,dy);
		this.collisionPoints = [
		{x: 0, y: 40},	
		{x: 60, y: 40},
		{x: 0, y:  0}, 
		{x: 60, y:  0}			
		];				
		this.state = States.Sprouting;		
		this.behaviours = [new AnimationBehavior(0,42,12), new AlarmBehavior(500, "BecomeCollectable")];
	}
	
	becomeCollectable(){
		this.state = States.Collectable;
		this.behaviours = [];
		this.frame = 42;
		this.dy = -0.3;
	}

	collect(mario){		
		sound.powerup.play();
		this.state = States.Dead;
		mario.flower();
	}

	collidesWith(other, otherState){
		if (this.state == States.Dead || otherState == States.Dead || otherState == States.Dying) return;
	}

	alarm(name){
		if (name == "BecomeCollectable"){
			this.becomeCollectable();
		}
	}
}

class Brick extends Moveable{
	constructor(x,y,dx,dy){
		super(x,y,dx,dy);
		this.collisionPoints = [
		{x:  0, y: 42},
		{x: 60, y: 42},
		{x:  0, y:  0}, 
		{x: 60, y:  0}			
		];
		this.behaviours = [];
		this.state = States.Solid;
	}
	
	collect(mario){

	}

	bump(mario){
		sound.break.play();
		this.state = States.Dead;
	}

	collidesWith(other, otherState){
		if (this.state == States.Dead || otherState == States.Dead || otherState == States.Dying) return;

		if (otherState == States.Spinning){
			sound.break.play();
			this.state = States.Dead;
		}
	}
}

class BrickParticle extends Moveable{
	constructor(x,y,dx,dy){
		super(x,y,dx,dy);
		this.collisionPoints = [
		{x:  0, y: 18},
		{x: 18, y: 18},
		{x:  0, y:  0}, 
		{x: 18, y:  0}			
		];
		this.behaviours = [new RespectsTerrain(), new HasFriction(0.1), new AlarmBehavior(2000, "Vanish")];
		this.state = States.Dying;
	}
	collidesWith(other, otherState){}

	alarm(name){
		if (name == "Vanish"){
			this.state = States.Dead;
		}
	}
}

class CollapsibleBrick extends Moveable{
	constructor(x,y,dx,dy){
		super(x,y,dx,dy);
		this.collisionPoints = [
		{x:  0, y:   0},
		{x: 59, y:   0},
		{x:  0, y: -42}, 
		{x: 59, y: -42}			
		];
		this.behaviours = [new ChecksForBeingStoodOn(200, ()=>{this.collapse();})];
		this.state = States.Collapsible;
		this.dy = 0;
		this.frame = 0;
	}
	
	collapse(){
		this.ay = 0.0010;
		this.dyTerminal = 0.9;
		this.behaviours = [new IgnoresTerrain()];
	}

	collect(mario){}

	bump(mario){ }

	collidesWith(other, otherState){ }
}

class Fireball extends Moveable{
	constructor(x,y,dx,dy){
		super(x,y,dx,dy);
		this.collisionPoints = [
		{x: -13, y:  10},
		{x:  13, y:  10},
		{x: -13, y: -10}, 
		{x:  13, y: -10}			
		];
		this.behaviours = [new RespectsTerrain(), new BouncesOnTouchGround(-0.45), new ChangesStateWhenHittingWalls(States.Dead)]; 
		this.state = States.EnemyKilling;
	}

	collidesWith(other, otherState){
		if (otherState == States.Walking || otherState == States.Cowering || otherState == States.Spinning || otherState == States.EmergingSubmerging){
			this.state = States.Dead;
		}
	}
}

class Fish extends Moveable{
	constructor(x,y,dx,dy){		
		super(x,y,dx,dy);
		this.state = States.Walking;
		this.collisionPoints = [
			{x:  4, y:  0}, 
			{x: 56, y:  0},
			{x:  4, y:-41}, 
			{x: 56, y:-41},
		];
		this.frame = 0;
		this.behaviours = [new IgnoresTerrain(), new BouncesWhenReachingY(14 * 42, -1.2, 1500)];		
	}

	collidesWith(other, otherState){
		if (this.state == States.Dead || this.state == States.Dying || otherState == States.Dead || otherState == States.Dying || otherState == States.Collectable) return;
		
		if (otherState == States.Spinning || otherState == States.EnemyKilling){
			this.wipe();
			return;
		}
	}

	stomp(mario){
		this.state = States.Dying;
		this.behaviours = [new IgnoresTerrain(), new AlarmBehavior(1000, "CleanupCorpse")];
		this.frame = 2;
		this.dy = -0.0;
		sound.stomp.play();
	}

	wipe(){
		this.state = States.Dying;		
		this.behaviours = [new IgnoresTerrain()];
		this.frame = 3;
		this.dy = -0.5;
		sound.kick.play();
		gGame.enemies.push(new WhiteFlash(this.x + 30, this.y - 21, 0.0, 0.0));
	}

	alarm(name){
		if (name == "CleanupCorpse"){
			this.state = States.Dead;
		}
	}
}

class LavaFlair extends Moveable{
	constructor(x,y,dx,dy){		
		super(x,y,dx,dy);
		this.state = States.Walking;
		this.collisionPoints = [
			{x: -24, y: 20}, 
			{x:  20, y: 20},
			{x: -24, y:-18}, 
			{x:  20, y:-18},
		];
		this.frame = 0;
		this.sparkles = [];
		this.behaviours = [new IgnoresTerrain(), new BouncesWhenReachingY(14 * 42, -1.35, 1500), new AnimationBehavior(0,4,60), new SpawnsSparkles(-20, -20, 40, 40, 8, 500, 10, true, "#FFAA00"), new Sparkling()];		
	}

	collidesWith(other, otherState){}

	stomp(mario){}

	wipe(){}
}

class Piranha extends Moveable{
	constructor(x,y,dx,dy, isSubmergedInitially){
		super(x,y,dx,dy);
		this.collisionPoints = [
		{x:-36, y:   0},	
		{x: 36, y:   0},
		{x:-36, y: -54}, 
		{x: 36, y: -54}			
		];				
		this.state = States.EmergingSubmerging;
		this.emergeSubmergeBehavior = new EmergesSubmerges(51, 40, 2000, 4000);
		this.behaviours = [this.emergeSubmergeBehavior, new AnimationBehavior(2, 2, 200)];

		if (isSubmergedInitially){
			this.state = States.Disabled;
			this.emergeSubmergeBehavior.state = EmergeStates.submerged;
		}
	}


	collidesWith(other, otherState){
		if (this.state == States.Dead || otherState == States.Dead || otherState == States.Dying) return;

		if (otherState == States.Spinning || otherState == States.EnemyKilling){
			this.wipe();			
			return;
		}
	}

	wipe(){
		this.behaviours = [this.emergeSubmergeBehavior, new AlarmBehavior(500, "CleanupCorpse")];
		this.state = States.Dying;
		sound.kick.play();
		gGame.enemies.push(new WhiteFlash(this.x, this.y - 21, 0.0, 0.0));
		this.emergeSubmergeBehavior.state = EmergeStates.submerging;
		this.emergeSubmergeBehavior.t = 0;
		this.emergeSubmergeBehavior.timeToGrowByOnePixel = 5;
	}

	alarm(name){
		if (name == "CleanupCorpse"){
			this.state = States.Dead;
		}
	}

	stomp(mario){}
}


class WhiteFlash extends Moveable{
	constructor(x,y,dx,dy){
		super(x,y,dx,dy);
		this.collisionPoints = [
		{x:  0, y:   0},	
		{x: 72, y:   0},
		{x:  0, y: -54}, 
		{x: 72, y: -54}			
		];				
		this.state = States.Dying;
		this.behaviours = [new AlarmBehavior(100, "CleanupCorpse")];
	}


	collidesWith(other, otherState){ }

	wipe(){ }

	alarm(name){
		if (name == "CleanupCorpse"){
			this.state = States.Dead;
		}
	}

	stomp(mario){}
}
