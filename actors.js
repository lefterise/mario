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
	Invulnerable: 10
}

const CollisionPoints = {
	BottomLeft: 0,
	BottomRight: 1,
	TopLeft: 2,
	TopRight: 3
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


	getRelativeLocationTo(other){
		let al = this.x + this.collisionPoints[CollisionPoints.BottomLeft].x;
		let ar = this.x + this.collisionPoints[CollisionPoints.TopRight].x;
		let at = this.y + this.collisionPoints[CollisionPoints.TopRight].y;
		let ab = this.y + this.collisionPoints[CollisionPoints.BottomLeft].y;

		let bl = other.x + other.collisionPoints[CollisionPoints.BottomLeft].x;
		let br = other.x + other.collisionPoints[CollisionPoints.TopRight].x;
		let bt = other.y + other.collisionPoints[CollisionPoints.TopRight].y;
		let bb = other.y + other.collisionPoints[CollisionPoints.BottomLeft].y;

		return {above: ab < bt, below: at > bb, left: ar < bl, right: al > br };
	}


	getDistanceFromOtherMoveable(other){
		let al = this.futureX + this.collisionPoints[CollisionPoints.BottomLeft].x;
		let ar = this.futureX + this.collisionPoints[CollisionPoints.TopRight].x;
		let at = this.futureY + this.collisionPoints[CollisionPoints.TopRight].y;
		let ab = this.futureY + this.collisionPoints[CollisionPoints.BottomLeft].y;

		let bl = other.futureX + other.collisionPoints[CollisionPoints.BottomLeft].x;
		let br = other.futureX + other.collisionPoints[CollisionPoints.TopRight].x;
		let bt = other.futureY + other.collisionPoints[CollisionPoints.TopRight].y;
		let bb = other.futureY + other.collisionPoints[CollisionPoints.BottomLeft].y;

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
			{x:-26, y:-50}, 
			{x: 26, y:-50},
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
		this.behaviours = [new RespectsTerrain(), new CanBumpBricksAbove(), new MinimumX(30), new MaximumX(179*60-30), this.animation, new ActsWhenSteppingOnBrick(16, ()=>this.takeDamage()), new ActsWhenSteppingOnBrick(12, (x,y,terrain)=>this.jumpOnNote(x,y,terrain))];
		this.facing = 1;
		this.direction = Directions.Idle;
		this.size = 0;
		this.isJumpPressed = false;
		this.isRunning = false;
		this.state = States.Walking;
	}

	collidesWith(other, otherState){
		if (otherState == States.Dead || otherState == States.Dying || this.state == States.Dying) return;

		if (otherState == States.Collectable) {
			other.collect(this);
			return;
		}

		let relativeLocation = this.getRelativeLocationTo(other);

		if (otherState == States.Solid) {
			if (this.dy > 0 && relativeLocation.above){
				this.dy = 0.0;
				this.futureY = this.y;
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
		
		if (relativeLocation.above){
			this.dy = this.isJumpPressed ? -1.1 : -0.7;
			this.futureY = this.futureY - 3;
			other.stomp(this);
		}else{
			if (otherState == States.Walking || otherState == States.Spinning){				
                this.takeDamage();
			}

			if (other.touch){
				other.touch(this);
				this.futureX = this.x;
				this.futureY = this.y;
			}
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
            this.behaviours = [new RespectsTerrain(), new CanBumpBricksAbove(), new MinimumX(30), new MaximumX(179*60-30), this.animation, new ActsWhenSteppingOnBrick(16, ()=>this.takeDamage()), new ActsWhenSteppingOnBrick(12, (x,y,terrain)=>this.jumpOnNote(x,y,terrain)), new AlarmBehavior(1500, "MakeVulnerable")];
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

	grow(){
		this.size = 1;
		this.collisionPoints = this.bigCollisionPoints; //This may be an issue because new collision points may fall inside a block
	}

	flower(){
		this.size = 2;
		this.collisionPoints = this.bigCollisionPoints;
	}

	shrink(){
		this.size = 0;
		this.collisionPoints = this.smallCollisionPoints;
	}

	shoot(enemies){
		if (this.size == 2){
			sound.fireball.play();
			if (this.facing == 1)
				enemies.push(new Fireball(this.x + 20, this.y - 30,  0.5, -0.45));
			else
				enemies.push(new Fireball(this.x - 20, this.y - 30, -0.5, -0.45));
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
	}

	alarm(name){
		if (name == "CleanupCorpse"){
			this.state = States.Dead;
		}
	}
}

class Koopa extends Moveable{
	constructor(x,y,dx,dy){
		super(x,y,dx,dy);
		this.collisionPoints = [
			{x:  4, y:  0}, 
			{x: 56, y:  0},
			{x:  4, y:-41}, 
			{x: 56, y:-41},
		];
		this.walk();
	}

	collidesWith(other, otherState){
		if (this.state == States.Dead || otherState == States.Dead || otherState == States.Dying || otherState == States.Collectable) return;

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
		this.behaviours = [new RespectsTerrain(), new ChangesDirectionWhenHittingWalls(), new AnimationBehavior(2,3,75), new CanBumpBricksHorizontaly()];
		this.dx = 0.5 * ((mario.futureX < this.x) ? 1 : -1);
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
		this.behaviours = [new IgnoresTerrain(), new AlarmBehavior(500, "Disappear")];
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
		if (otherState == States.Walking || otherState == States.Cowering || otherState == States.Spinning){
			this.state = States.Dead;
		}
	}
}