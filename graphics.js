class Graphics{
    constructor(ctx){
       this.ctx = ctx;
       this.loadImage("mario.png",   (img)=>{this.mario = img;});
       this.loadImage("enemies.png", (img)=>{this.enemies = img;});
       this.loadImage("levels.png", (img)=>{this.levels = img;});
       this.loadImage("terrain.png", (img)=>{this.terrain = img;});
       this.loadImage("tree.png",    (img)=>{this.tree = img;});
       this.loadImage("grass.png",    (img)=>{this.grass = img;});
    }
    
    loadImage(file, callback){
        let img = new Image();
        img.src = file;
        img.onload = ()=>{callback(img);};
    }
  
    drawMario(x, y, frame, size, direction){
       this.ctx.drawImage(this.mario, frame * 63 + direction * 252, size * 88, 60, 84, x, y, 60, 84); 
    }
    
    drawTile(x,y,id, type){
        this.ctx.drawImage(this.levels, (id % 8) * 60, Math.floor(id / 8) * 42 + 42 * type, 60, 42, x, y, 60, 42);
    }
    
    drawTileOld(x,y,id){
        this.ctx.drawImage(this.terrain, (id % 6) * 60, Math.floor(id / 6) * 42, 60, 42, x, y, 60, 42);
    }
    
    drawWater(x,y, frame){
        this.ctx.drawImage(this.terrain, 4 * 60, 12 * 42 + frame, 60, 42 - frame, x, y, 60, 42 - frame);
        this.ctx.drawImage(this.terrain, 4 * 60, 12 * 42, 60, frame, x, y + 42  - frame, 60, frame);
    }
    
    drawTree(x,y, frame){
        this.ctx.drawImage(this.tree, 180,84 * (frame % 3), 180, 84, x-60, y-58, 180, 84);
    }
    
    drawWeed(x,y, frame){
        this.ctx.drawImage(this.grass, 180, 42 * (frame % 3), 180, 42, x, y-16, 180, 42);
    }
    
    drawCoin(x,y, frame){    
      this.ctx.drawImage(this.enemies, 63 * frame, 579, 60, 40, x, y, 60, 40);
    }
  
    drawGoomba(x,y, frame, color){    
      this.ctx.drawImage(this.enemies, 63 * (frame % 2 + 3 * color),0, 60, 42, x, y, 60, 42);
    }
    
    drawSpiney(x,y, frame, direction){    
      this.ctx.drawImage(this.enemies, 63 * (frame % 2 + 2 * direction),90, 60, 42, x, y - 14, 60, 42);
    }
    
    drawFish(x,y, frame, direction){    
      this.ctx.drawImage(this.enemies, 63 * (frame % 2 + 2 * direction),135, 60, 45, x, y - 14, 60, 45);
    }
    
    drawTurtle(x,y, frame, color, direction){
      this.ctx.drawImage(this.enemies, 63 * (frame % 2 + 2 * direction), 231 + 123 * color, 60, 66, x, y, 60, 66);	
    }
    
    drawShell(x,y, frame, color){
      this.ctx.drawImage(this.enemies, 63 * (frame % 3), 183 + 120 * color, 60, 42, x, y - 16, 60, 42);
    }
    
    createBlueSkyGradient(){
      const grd = this.ctx.createLinearGradient(0, 0, 0, 546);
      grd.addColorStop(0,   "#48ACE8");
      grd.addColorStop(0.75,"#C0E8E8");
      grd.addColorStop(1,   "#C0E8E8");
      return grd;
    }
  }