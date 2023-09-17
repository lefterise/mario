class Graphics{
    constructor(ctx){
       this.ctx = ctx;
       this.loadImage("graphics/mario.png",   (img)=>{this.mario = img;});
       this.loadImage("graphics/enemies.png", (img)=>{this.enemies = img;});
       this.loadImage("graphics/levels.png",  (img)=>{this.levels = img;});
       this.loadImage("graphics/terrain.png", (img)=>{this.terrain = img;});
       this.loadImage("graphics/tree.png",    (img)=>{this.tree = img;});
       this.loadImage("graphics/grass.png",   (img)=>{this.grass = img;});
       this.loadImage("graphics/bush.png",   (img)=>{this.bush = img;});
       this.loadImage("graphics/buttons.png", (img)=>{this.buttons = img;});
       this.loadImage("graphics/joystick.png", (img)=>{this.joystick = img;});       
       
       this.background = [
        this.createSkyGradient("#48ACE8", "#C0E8E8"), 
        this.createSkyGradient("#3071C3", "#6DAEFF"), 
        this.createSkyGradient("#A2C3FF", "#DFFFFF"), 
        this.createSkyGradient("#3071C3", "#6DAEFF"),
        null,
        null,
        null
      ];
       this.loadImage("graphics/brickPattern.png", (img)=>{this.background[4] = this.ctx.createPattern(img, "repeat"); });
       this.loadImage("graphics/prisonPattern.png", (img)=>{this.background[5] = this.ctx.createPattern(img, "repeat"); });
       this.loadImage("graphics/prisonPattern2.png", (img)=>{this.background[6] = this.ctx.createPattern(img, "repeat"); });

       this.tilesWithTerrainBackground = {8: 6, 9: 7, 10:0, 11:5};
    }
    
    loadImage(file, callback){
        let img = new Image();
        img.src = file;
        img.onload = ()=>{callback(img);};
    }
  
    drawMario(x, y, frame, size, direction, height, clipY, offY){
      this.ctx.drawImage(this.mario, 
        frame * 63 + direction * 252, size * 87 + 84 - height-clipY, 
        60, height, 
        x, y - height-offY+1,
        60, height); 
    }
    
    drawTile(x,y,id, type){
       if (id >= 8){
          this.ctx.drawImage(this.levels, 3 * 60, 42 * type, 60, 42, x, y, 60, 42); //Draw land
          this.ctx.drawImage(this.levels, this.tilesWithTerrainBackground[id] * 60, 42 * type, 60, 42, x, y, 60, 42);
          return;
       }

        this.ctx.drawImage(this.levels, id * 60, 42 * type, 60, 42, x, y, 60, 42);
    }
    
    drawTileOld(x,y,id){
        this.ctx.drawImage(this.terrain, (id % 6) * 60, Math.floor(id / 6) * 42, 60, 42, x, y, 60, 42);
    }
    
    drawBrickParticle(x,y){
      this.ctx.drawImage(this.terrain, 99, 3, 18, 18, x, y, 18, 18);
    }

    drawWater(x,y, frame, type, lavaFrame){
      if (type < 2){
        this.ctx.drawImage(this.terrain, (4+type) * 60, 3 * 42 + frame, 60, 42 - frame, x, y, 60, 42 - frame);
        this.ctx.drawImage(this.terrain, (4+type) * 60, 3 * 42, 60, frame, x, y + 42  - frame, 60, frame);
      }else if (type == 2){
        this.ctx.drawImage(this.terrain, (lavaFrame % 5) * 60, 4 * 42, 60, 42, x, y, 60, 42);
      }else if (type == 3){
        this.ctx.drawImage(this.terrain, 5 * 60, 4 * 42, 60, 42, x, y, 60, 42);
      }
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
      this.ctx.drawImage(this.enemies, 63 * (frame + 2 * direction),135, 60, 45, x, y-41, 60, 45);
    }
    
    drawTurtle(x,y, frame, color, direction){
      if (frame < 2){
        this.ctx.drawImage(this.enemies, 63 * (frame + 2 * direction), 231 + 123 * color, 60, 66, x - 30, y - 65, 60, 66);	//walking
      }else{
        this.ctx.drawImage(this.enemies, 63 * (frame-2), 183 + 120 * color, 60, 42, x - 30, y-41, 60, 42); //cowering
      }
    }

    drawPiranha(x,y, frame, type){
      this.ctx.drawImage(this.enemies, type * 75, 429, 72, frame, x-36, y - frame+1, 72, frame);
    }
    
    drawFireball(x, y, frame){
      this.ctx.drawImage(this.enemies, 39 * frame, 621, 27, 21, x - 13, y - 10, 27, 21);
    }

    drawWhiteFlash(x,y){
       this.ctx.drawImage(this.enemies, 315, 486, 60, 42, x - 30, y - 21, 60, 42);
    }

    drawLavaFlair(x,y, frame){
      this.ctx.drawImage(this.enemies, 64 * frame, 489, 62, 39, x - 32, y - 20, 62, 39);
    }

    drawButton(x,y, id){
      this.ctx.drawImage(this.buttons, 98 * id, 0, 98, 98, x, y, 98, 98);
    }

    drawJoystick(x,y){
      this.ctx.drawImage(this.joystick, 0, 0, 200, 70, x, y, 200, 70);
    }
    
    createSkyGradient(top, bottom){
      const grd = this.ctx.createLinearGradient(0, 0, 0, 546);
      grd.addColorStop(0.00,    top);
      grd.addColorStop(0.75, bottom);
      grd.addColorStop(1.00, bottom);      
      return grd;
    }

    drawStar(x, y, r, spikes) {
      this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.save();
          this.ctx.beginPath();
          this.ctx.moveTo(r, 0);
          for (let i = 0; i < spikes * 2 - 1; i++) {
            this.ctx.rotate(Math.PI / spikes);
            if (i % 2 === 0) {
              this.ctx.lineTo((r / 0.525731) * 0.200811, 0);
            } else {
              this.ctx.lineTo(r, 0);
            }
          }
          this.ctx.closePath();
          this.ctx.fill();
        this.ctx.restore();
      this.ctx.restore();
    }
  }