var level1 = { 
    grid: [
          "                                                                         ◌◌◌◌◌                                                  ▒▒▒▒│┇▒▒▒▒       ♥                                  ",
          "                                                       ♥             ☼         ●                                                  ▒▒│┇▒▒         □       ○○○                        ",
          "                                           ○           □  ╦      ■◙ ■◙         □□                                                   │┇                  ▒ ₾ ▒                       ",
          "     ╦            ╦                        ○              ║ ╦                        ▒ ₼ ▒      ╦     ○○○○                  ╦       ╒╕        ╦         ▒▒▒▒▒      ╦        ╦       ",
          "     ║ ╦        ╦ ║            ╦     ■■■■■ ○             ╦║ ║               ╦        ▒▒▒▒▒      ║                           ║╦                ║                    ║   ╦    ║ ╦     ",
          "    ╦║ ║  ♠     ║ ║            ║           ○       ♠     ║║ ║               ║            ▒₼  ▒  ║                           ║║                ║        ○○○○○○○    ╦║   ║   ╦║ ║     ",
          "    ║║ ║ ◙◙     ║ ║            ║           ○     ╒╕◙     ║║ ║   ◙■ ◙■       ║            ▒▒▒▒▒  ║  ψ             ψ  ♣   ♠   ║║ ○○○○      ψ    ║       ▒     ₾ ▒   ║║   ║   ║║ ║     ",
          "    ║║ ║        ║ ║       ╒╕   ║  ■■       ○     │┇      ║║ ║               ║   ▒  ₼▒           ║  ╒╕ □□□□□╒╕   ♪╒╕ ◙ ■■■   ║║           ╒╕   ║       ▒▒▒▒▒▒▒▒▒   ║║   E   ║║ ║ ╒╕  ",
          "    ║║ ║     ╒╕ ║ ║ ○○○○○ │┇   ║               ╒╕│┇      ║║ ║               ║   ▒▒▒▒▒        ♠  ║  │┇      │┇    │┇         ║║           │┇   ║                   ║║   ║   ║║ ║ │┇  ",
          "    ║║ ║     │┇ ║ ║       │┇   ║               │┇│┇      ║║ ║               ║                □  ║  │┇ ₾    │┇    │┇         ║║           │┇   ║                   ║║   ║   ║║∩║ │┇  ",
          "w   ║║ ║     │┇ ║ ║ ₾w₾w  │┇   ║www₾₾  a     ₼ │┇│┇ ww   ║║ ║ ∩    ₾   ₾    ║                 ww║  │┇ ww ₾ │┇ ww∩│┇  ww I   ║║  ww∩  ∩ww │┇ ww║  a a www          ║ww ∩║   www║ │┇ww",
          "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓░░░░░░░░░░░░░░░░░░░░░▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░",
          "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓░░░░░░░░░░░░░░░░░░░░░▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░"
      ],
    sky: "BlueSkyGradient",
    terrainType: 0,
    pipeColor: 0
  };
      
  var secret1 = {
    grid: [
          "▒│┇▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ",
          "▒│┇                ▒ ",
          "▒╒╕                ▒ ",
          "▒    ○ ○ ○ ○ ○     ▒ ",
          "▒   ○ ○ ○ ○ ○  ╒╕  ▒ ",
          "▒              │┇  ▒ ",
          "▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒  ▒ ",
          "▒                  ▒ ",
          "▒                  ▒  ",
          "▒     ○ ○ ○ ○ ○    ▒ ",
          "▒  ╒╕  ○ ○ ○ ○ ○   ▒ ",
          "▒  │┇              ▒ ",
          "▒▒▒│┇▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ "
    ],
    sky: "bricksWithWindows",
    terrainType: 4
  };
  
var level2 = {
   grid: [
         "░    ■■■■■■■■■■■■■   ░░░░░     ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░       ♠  ₼                                          ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░            ░­­░░░░░░│┇│┇     │┇│┇░░░░░│┇░░░░",
         "░    üüüüüüüüüüüüü   ░░░░░₪   ₪░░                                        ░    ■■■■■■■■■■■■■                           ○○                                                         ░░░░░░░░░░░░░░            ░░░    │┇│┇     │┇│┇     │┇   ░",
         "░                    ░░░░░     ░░                           ○○○○○○○○○    ░                                  ♣        ○  ○       W   ∩                                            ░░░░░░░░░░░░░░            ░░░ ○○ │┇╒╕░░░░░╒╕│┇     │┇  ♠░",
         "░                    ░░░░░     ░░                           ○○○○○○○○○  ψ ░                                  ◙                   WWWWW     ○○○○                                   ░░░░░░░░░░░░░░            ░░░ ○○ │┇         │┇ ○○○ ╒╕  ◙░",
         "░                                     ψ                            ₾ ₾ ╒╕░●                       ♠                                                Ψ                             ░░░░░░░░░░░░░░♥  ○○○○○    ░░░ ○○ │┇         ╒╕ ○○○      ░",
         "░         ψ  ♠                        ╒╕     ░░░░░░░ ░░░░░ ░░░░░░░░░░░ │┇░□        Ψ            ╒╕◙                      ψ             W W   ₾W    ╒╕                            ░░░░░░░░░░░░░░◙  ○○○○○  çç░░░∩   │┇            ○○○      ░",
         "░         ╒╕◙◙                        │┇                               ░░░    Ψ    ╒╕         ♠♠│┇          ♠      ╒╕    ╒╕WWWWWWWWWWWWW WWWWWW    │┇                     ççã    ░░░░░░░░░░░░░░   ○○○○○  ╒╕░░░░░  ╒╕            ○○○      ░",
         "░       ψ │┇                          │┇                                      ╒╕   │┇    Ψ    ╒╕│┇        ╒╕◙  ψ   │┇    │┇                      Ψ │┇                     ╒╕◙    ░░░░░░░░░░░░░░   ○○○○○  │┇░░░          ψ       ○○○ ψ    ░",
         "░       ╒╕│┇  ψ                     ╒╕│┇                                      │┇   │┇   W╒╕   │┇│┇        │┇   ╒╕  │┇    │┇ ○○○○                 ╒╕│┇                     │┇     ░░░░░░░░░░░░░░ þ        │┇░░░          ╒╕          ╒╕  @░",
         "░       │┇│┇  ╒╕          ∩         │┇│┇                                      │┇   │┇    │┇   │┇│┇₪₪ ₪₪ ₪₪│┇   │┇  │┇    │┇ ○○○○                 │┇│┇                þ    │┇     ░░░░░░░░░░░░░░ þ        │┇░░░  Ψ    ∩  │┇          │┇   ░",
         "░       │┇│┇  │┇         ₪₪ ‚ ₪₪    │┇│┇         ∩  ‚     ‚                 ∩ │┇   │┇    │┇   │┇│┇  ‚  ‚  │┇   │┇  │┇ ‚‚ │┇             ‚        │┇│┇  ₪₪ ‚ ₪₪ ‚ ₪₪  þ  ∩ │┇ ₾₾  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ╒╕░░░░╒╕│┇      ₼ Ψ │┇   ░",
         "░░░░░░░░░░░░░░░░░░▓▓▓░░░░░▓▓▓▓▓░░░░░░░░░  ♪░░░░░░░░▓▓▓░░░▓▓▓░░░░░░░░░░░░░░░░░░░░▓▓▓░░▓▓▓▓░░▓▓▓░░░░▓▓▓▓▓▓▓░░░░░░░░░░░░▓▓▓▓░░░░░░░░▓▓▓░░░░▓░░░░░░░░░░░░░░░░▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │┇    │┇│┇  ╒╕░░░░╒╕│┇   ░",
         "░░░░░░░░░░░░░░░░░░▓▓▓░░░░░▓▓▓▓▓░░░░░░░░░   ░░░░░░░░▓▓▓░░░▓▓▓░░░░░░░░░░░░░░░░░░░░▓▓▓░░▓▓▓▓░░▓▓▓░░░░▓▓▓▓▓▓▓░░░░░░░░░░░░▓▓▓▓░░░░░░░░▓▓▓░░░░▓░░░░░░░░░░░░░░░░▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │┇    │┇│┇  │┇    │┇│┇   ░",  
    ],
    terrainType: 5,
    sky: "bricksWithWindows",
    pipeColor: 4
}
  
    function parseTerrainWall(c, u, l, r, ul, ur, x, y){
    if (u != "░"){
        if (l != "░") return 0;
        if (r != "░") return 5;
        return 1;
      }
      if (l != "░") return 6;
      if (r != "░") return 7;
      if (ul != "░") return 2;
      if (ur != "░") return 4;
      return 3;
    }

    function parseDungeonWall(c, u, l, r, ul, ur, x, y){        
          let tile = 1 + (x + y)%2;
          if (tile == 1 && r != "░") return 0;
          if (tile == 2 && l != "░") return 0;
          return tile;
    }
    
    
    function getId(c, u, l, r, ul, ur, x, y, parseWall, pipeColor){
     if (c == "░"){
        return parseWall(c, u, l, r, ul, ur, x, y);
     }

     let pipeOffset =(pipeColor % 3)*2+Math.floor(pipeColor / 3)*12;
     if (c == "╦") return 100+8;
     if (c == "║") return 9+8;
     if (c == "▓") return 22+8;
     
     if (c == "╒") return 30+8+pipeOffset;
     if (c == "╕") return 31+8+pipeOffset;
     if (c == "│") return 36+8+pipeOffset;
     if (c == "┇") return 37+8+pipeOffset;

     if (c == "▒") return 59+8-39;
     if (c == "E") return 10+8;
     if (c == "◙") return 12+8;
     if (c == "■") return 1+8;
     if (c == "▲") return 8+8;
     if (c == "♪") return 4+8;

     if (c == "○") return 101+8;
     if (c == "w") {
        if (u == '│')
            return 106+8;
        return 102+8;
     }
     if (c == "₾") return 103+8;
     if (c == "∩") return 104+8;
     if (c == "₼") return 105+8;
     if (c == "♠") return 107+8;
     if (c == "♣") return 108+8;
     if (c == "♥") return 109+8;
     if (c == "☼") return 110+8;
     if (c == "a") return 111+8;
     if (c == "ψ") return 112+8;
     
     if (c == "●") return 253; //253-249 reserved for multicoin brick
     if (c == "□") return 254;
     
     
     return 255;
    }
    
    function getTile(g, y,x){
        if (y >= 0 && x >=0 && y < g.length && x < g[y].length)
            return g[y][x];
        return 255;
    }
    
    function parseLevel(levelData){
        let level = new Array(levelData.grid[0].length);
        let parser = parseTerrainWall;
        if (levelData.terrainType >= 4)
            parser = parseDungeonWall;

        //this will convert the level walls to draw the grass and corners 
        //as well as filp from row major to column major so that data on a screen will be more compact;
        for (let x=0; x<levelData.grid[0].length;++x){
            level[x] = new Array(levelData.grid.length);
            for (let y=0; y<13;++y){	   
               level[x][y] = getId(
               getTile(levelData.grid, y,x),
               getTile(levelData.grid, y-1,x),
               getTile(levelData.grid, y,x-1),
               getTile(levelData.grid, y,x+1),
               getTile(levelData.grid, y-1,x-1),
               getTile(levelData.grid, y-1,x+1),
               x,
               y,
               parser,
               levelData.pipeColor
               );
           }
       }
       return {grid: level, terrainType: levelData.terrainType, sky: levelData.sky};
    }