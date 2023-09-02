class Graphics{
    constructor(ctx){
       this.ctx = ctx;
       this.loadImage("graphics/mario.png",   (img)=>{this.mario = img;});
       this.loadImage("graphics/enemies.png", (img)=>{this.enemies = img;});
       this.loadImage("graphics/levels.png",  (img)=>{this.levels = img;});
       this.loadImage("graphics/terrain.png", (img)=>{this.terrain = img;});
       this.loadImage("graphics/tree.png",    (img)=>{this.tree = img;});
       this.loadImage("graphics/grass.png",   (img)=>{this.grass = img;});
       this.loadImage("graphics/buttons.png", (img)=>{this.buttons = img;});
       this.loadImage("graphics/joystick.png", (img)=>{this.joystick = img;});
    }
    
    loadImage(file, callback){
        let img = new Image();
        img.src = file;
        img.onload = ()=>{callback(img);};
    }
  
    drawMario(x, y, frame, size, direction){
       this.ctx.drawImage(this.mario, frame * 63 + direction * 252, size * 87, 60, 84, x, y, 60, 84); 
    }
    
    drawTile(x,y,id, type){
        this.ctx.drawImage(this.levels, (id % 8) * 60, Math.floor(id / 8) * 42 + 42 * type, 60, 42, x, y, 60, 42);
    }
    
    drawTileOld(x,y,id){
        this.ctx.drawImage(this.terrain, (id % 6) * 60, Math.floor(id / 6) * 42, 60, 42, x, y, 60, 42);
    }
    
    drawBrickParticle(x,y){
      this.ctx.drawImage(this.terrain, 99, 3, 18, 18, x, y, 18, 18);
    }

    drawWater(x,y, frame){
        this.ctx.drawImage(this.terrain, 4 * 60, 12 * 42 + frame, 60, 42 - frame, x, y, 60, 42 - frame);
        this.ctx.drawImage(this.terrain, 4 * 60, 12 * 42, 60, frame, x, y + 42  - frame, 60, frame);
    }
    
    drawTree(x,y, frame){
        this.ctx.drawImage(this.tree, 180,84 * frame, 180, 84, x-60, y-58, 180, 84);
    }
    
    drawWeed(x,y, frame){
        this.ctx.drawImage(this.grass, 180, 42 * frame, 180, 42, x, y-16, 180, 42);
    }
    
    drawCoin(x,y, frame){    
      this.ctx.drawImage(this.enemies, 63 * frame, 579, 60, 40, x, y, 60, 40);
    }
  
    drawMushroom(x,y, frame, type){
      this.ctx.drawImage(this.enemies, type * 63, 531, 60, frame, x, y + 42 - frame, 60, frame);
    }

    drawGoomba(x,y, frame, color){    
      this.ctx.drawImage(this.enemies, 63 * frame + 3 * color,0, 60, 42, x, y-41, 60, 42);
    }
    
    drawSpiney(x,y, frame, direction){    
      this.ctx.drawImage(this.enemies, 63 * (frame + 2 * direction),90, 60, 42, x, y - 14, 60, 42);
    }
    
    drawFish(x,y, frame, direction){    
      this.ctx.drawImage(this.enemies, 63 * (frame + 2 * direction),135, 60, 45, x, y - 14, 60, 45);
    }
    
    drawTurtle(x,y, frame, color, direction){
      if (frame < 2){
        this.ctx.drawImage(this.enemies, 63 * (frame + 2 * direction), 231 + 123 * color, 60, 66, x, y - 65, 60, 66);	//walking
      }else{
        this.ctx.drawImage(this.enemies, 63 * (frame-2), 183 + 120 * color, 60, 42, x, y-41, 60, 42); //cowering
      }
    }
    

    drawButton(x,y, id){
      this.ctx.drawImage(this.buttons, 98 * id, 0, 98, 98, x, y, 98, 98);
    }

    drawJoystick(x,y){
      this.ctx.drawImage(this.joystick, 0, 0, 200, 20, x, y, 200, 20);
    }
    
    createBlueSkyGradient(){
      const grd = this.ctx.createLinearGradient(0, 0, 0, 546);
      grd.addColorStop(0,   "#48ACE8");
      grd.addColorStop(0.75,"#C0E8E8");
      grd.addColorStop(1,   "#C0E8E8");      
      return grd;
    }

    createNightGradient(){
      const grd = this.ctx.createLinearGradient(0, 0, 0, 546);
      grd.addColorStop(0,   "#245674");
      grd.addColorStop(0.75,"#607474");
      grd.addColorStop(1,   "#607474");

      return grd;
    }
  }