var level1 = { 
    grid: [
          "                                                                         ◌◌◌◌◌                                                  ₪₪₪₪│┇₪₪₪₪       ♥                                  ",
          "                                                       ♥             ☼         ●                                                  ₪₪│┇₪₪         □       ○○○                        ",
          "                                           ○           □  ╦      ■◙ ■◙         □□                                                   │┇                  ₪ ₾ ₪                       ",
          "     ╦            ╦                        ○              ║ ╦                        ₪ ₼ ₪      ╦     ○○○○                  ╦       ╒╕        ╦         ₪₪₪₪₪      ╦        ╦       ",
          "     ║ ╦        ╦ ║            ╦     ■■■■■ ○             ╦║ ║               ╦        ₪₪₪₪₪      ║                           ║╦                ║                    ║   ╦    ║ ╦     ",
          "    ╦║ ║  ♠     ║ ║            ║           ○       ♠     ║║ ║               ║            ₪₼  ₪  ║                           ║║                ║        ○○○○○○○    ╦║   ║   ╦║ ║     ",
          "    ║║ ║ ◙◙     ║ ║            ║           ○     ╒╕◙     ║║ ║   ◙■ ◙■       ║            ₪₪₪₪₪  ║  ψ             ψ  ♣   ♠   ║║ ○○○○      ψ    ║       ₪     ₾ ₪   ║║   ║   ║║ ║     ",
          "    ║║ ║        ║ ║       ╒╕   ║  ■■       ○     │┇      ║║ ║               ║   ₪  ₼₪           ║  ╒╕ □□□□□╒╕   ♪╒╕ ◙ ■■■   ║║           ╒╕   ║       ₪₪₪₪₪₪₪₪₪   ║║   E   ║║ ║ ╒╕  ",
          "    ║║ ║     ╒╕ ║ ║ ○○○○○ │┇   ║               ╒╕│┇      ║║ ║               ║   ₪₪₪₪₪        ♠  ║  │┇      │┇    │┇         ║║           │┇   ║                   ║║   ║   ║║ ║ │┇  ",
          "    ║║ ║     │┇ ║ ║       │┇   ║               │┇│┇      ║║ ║               ║                □  ║  │┇ ₾    │┇    │┇         ║║           │┇   ║                   ║║   ║   ║║∩║ │┇  ",
          "w   ║║ ║     │┇ ║ ║ ₾w₾w  │┇   ║www₾₾  a     ₼ │┇│┇ ww   ║║ ║ ∩    ₾   ₾    ║                 ww║  │┇ ww ₾ │┇ ww∩│┇  ww I   ║║  ww∩  ∩ww │┇ ww║  a a www          ║ww ∩║   www║ │┇ww",
          "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓░░░░░░░░░░░░░░░░░░░░░▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░",
          "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓░░░░░░░░░░░░░░░░░░░░░▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░"
      ],
    startPosition: {x: 6, y: 11},
    backgroundType: 0,
    terrainType: 0,
    pipeColor: 0,
    liquidType: 0,
    pipes: [       
        {entrance: {x:  50, y: 6, direction: 0}, exit: {x: 2, y: 2, direction: 1, level: "secret1", storeState: "level1"}},
        {entrance: {x: 177, y: 7, direction: 0}, exit: {x: 2, y:-1, direction: 1, level: "level2", storeState: false}},
    ]
  };
  
  var secret1 = {
    grid: [
          "₪│┇₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪ ",
          "₪│┇                ₪ ",
          "₪╒╕                ₪ ",
          "₪    ○ ○ ○ ○ ○     ₪ ",
          "₪   ○ ○ ○ ○ ○  ╒╕  ₪ ",
          "₪              │┇  ₪ ",
          "₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪  ₪ ",
          "₪                  ₪ ",
          "₪                  ₪  ",
          "₪     ○ ○ ○ ○ ○    ₪ ",
          "₪  ╒╕  ○ ○ ○ ○ ○   ₪ ",
          "₪  │┇              ₪ ",
          "₪₪₪│┇₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪ "
    ],
    startPosition: {x: 2, y: 2},
    backgroundType: 4,
    terrainType: 6,
    pipeColor: 0,
    liquidType: 0,
    pipes: [       
        {entrance: {x:  4, y: 10, direction: 0}, exit: {x: 133, y: 3, direction: 1, level: "level1", storeState: "secret1"}},
    ]
  };
  
var level2 = {
   grid: [
         "░    ■■■■■■■■■■■■■   ░░░░░     ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░       ♠  ₼                                          ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░            ░░░░░░░│┇│┇     │┇│┇░░░░░│┇░░░░",
         "░    üüüüüüüüüüüüü   ░░░░░¤   ¤░░                                        ░    ■■■■■■■■■■■■■                           ○○                                                         ░░░░░░░░░░░░░░            ░░░    │┇│┇     │┇│┇     │┇   ░",
         "░                    ░░░░░     ░░                           ○○○○○○○○○    ░                                  ♣        ○  ○       W   ∩                                            ░░░░░░░░░░░░░░            ░░░ ○○ │┇╒╕░░░░░╒╕│┇     │┇  ♠░",
         "░                    ░░░░░     ░░                           ○○○○○○○○○  ψ ░                                  ◙                   WWWWW     ○○○○                                   ░░░░░░░░░░░░░░            ░░░ ○○ │┇         │┇ ○○○ ╒╕  ◙░",
         "░                                     ψ                            ₾ ₾ ╒╕░●                       ♠                                                Ψ                             ░░░░░░░░░░░░░░♥  ○○○○○    ░░░ ○○ │┇         ╒╕ ○○○      ░",
         "░         ψ  ♠                        ╒╕     ░░░░░░░ ░░░░░ ░░░░░░░░░░░ │┇░□        Ψ            ╒╕◙                      ψ             W W   ₾W    ╒╕                            ░░░░░░░░░░░░░░◙  ○○○○○    ░░░∩   │┇            ○○○      ░",
         "░         ╒╕◙◙                        │┇                               ░░░    Ψ    ╒╕           │┇          ☼      ╒╕    ╒╕WWWWWWWWWWWWW WWWWWW    │┇                       ã    ░░░░░░░░░░░░░░   ○○○○○  ╒╕░░░░░  ╒╕            ○○○      ░",
         "░       ψ │┇                          │┇                                      ╒╕   │┇    Ψ    ╒╕│┇        ╒╕◙  ψ   │┇    │┇                      Ψ │┇                     ╒╕◙    ░░░░░░░░░░░░░░   ○○○○○  │┇░░░          ψ       ○○○ ψ    ░",
         "░       ╒╕│┇  ψ                     ╒╕│┇                                      │┇   │┇   ₪╒╕   │┇│┇        │┇   ╒╕  │┇    │┇ ○○○○                 ╒╕│┇                     │┇     ░░░░░░░░░░░░░░ E        │┇░░░          ╒╕          ╒╕  @░",
         "░       │┇│┇  ╒╕          ∩         │┇│┇                                      │┇   │┇    │┇   │┇│┇¤¤ ¤¤ ¤¤│┇   │┇  │┇    │┇ ○○○○                 │┇│┇                E    │┇     ░░░░░░░░░░░░░░ E        │┇░░░  Ψ    ∩  │┇          │┇   ░",
         "░       │┇│┇  │┇         ¤¤ ‚ ¤¤    │┇│┇         ∩  ‚     ‚                 ∩ │┇   │┇    │┇   │┇│┇  ‚  ‚  │┇   │┇  │┇ ‚‚ │┇             ‚        │┇│┇  ¤¤ ‚ ¤¤ ‚ ¤¤  E  ∩ │┇ ₾₾  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ╒╕░░░░╒╕│┇      ₼ Ψ │┇   ░",
         "░░░░░░░░░░░░░░░░░░▓▓▓░░░░░▓▓▓▓▓░░░░░░░░░  ♪░░░░░░░░▓▓▓░░░▓▓▓░░░░░░░░░░░░░░░░░░░░▓▓▓░░▓▓▓▓░░▓▓▓░░░░▓▓▓▓▓▓▓░░░░░░░░░░░░▓▓▓▓░░░░░░░░▓▓▓░░░░▓░░░░░░░░░░░░░░░░▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │┇    │┇│┇  ╒╕░░░░╒╕│┇   ░",
         "░░░░░░░░░░░░░░░░░░▓▓▓░░░░░▓▓▓▓▓░░░░░░░░░   ░░░░░░░░▓▓▓░░░▓▓▓░░░░░░░░░░░░░░░░░░░░▓▓▓░░▓▓▓▓░░▓▓▓░░░░▓▓▓▓▓▓▓░░░░░░░░░░░░▓▓▓▓░░░░░░░░▓▓▓░░░░▓░░░░░░░░░░░░░░░░▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │┇    │┇│┇  │┇    │┇│┇   ░",  
    ],
    startPosition: {x: 2, y: -1},
    terrainType: 6,
    backgroundType: 4,
    pipeColor: 4,
    liquidType: 1,
    pipes: [
        {entrance: {x:  95, y: 7, direction: 0}, exit: {x: 37, y: 8, direction: 0}},
        {entrance: {x:  72, y: 4, direction: 0}, exit: {x: 116, y: 6, direction: 0}},
        {entrance: {x:  79, y: 7, direction: 0}, exit: {x: 211, y: 6, direction: 1}},
        {entrance: {x: 229, y: 3, direction: 1}, exit: {x: 107, y: 7, direction: 0}},
        {entrance: {x:  171, y: 7, direction: 0}, exit: {x: 6, y: -1, direction: 1, level: "level1"}},
        {entrance: {x:  202, y: 6, direction: 0}, exit: {x: 6, y: -1, direction: 1, level: "level1"}}
    ]
};

const AllLevels ={
    level1 : level1,
    secret1: secret1,
    level2 : level2,
};
  
    function parseTerrainWall(c, u, l, r, ul, ur, x, y){
    if (u != c){
        if (l != c) return 0;
        if (r != c) return 5;
        return 1;
      }
      if (l != c) return 6;
      if (r != c) return 7;
      if (ul != c) return 2;
      if (ur != c) return 4;
      return 3;
    }

    function parseDungeonWall(c, u, l, r, ul, ur, x, y){        
          let tile = 1 + (x + y)%2;
          if (tile == 1 && r != "░") return 0;
          if (tile == 2 && l != "░") return 0;
          return tile;
    }    

    const Tile ={
        CobbleStone: 0+16,
        Breakable1:  1+16,
        Breakable2:  2+16,
        Breakable3:  3+16,
        BouncyNote:  4+16,
        GreyBlock:   5+16,
        CollapsibleBlock: 6+16,
        CollapsibleBlockActive: 7+16,
        Spike: 8+16,
        PalmTrunk: 9+16,
        ExitSign: 10+16,
        WoodSpike: 11+16,
        QuestionMark: 12+16,
        UsedQuestionMark: 13+16,
        Wood1: 14+16,
        Metal1: 15+16,
        ExitPole: 16+16,
        WoodPike: 17+16,        
        SpikeDown: 19+16,
        Wood2: 20+16,
        Metal2: 21+16,
        PipeFirst: 30+16,
        PipeLast: 66+16,    
        Goomba: 200,
        Koopa: 201,
        RedKoopa: 202,
        Fish: 203,
        Piranha: 204,
        Coin: 205,
        Mushroom: 206,
        PoisonousMushroom: 207,
        Life: 208,
        Star: 209,        
        OneCoinLeft: 210,
        TenCoinsLeft: 219,
        Weed: 230,
        WeedAndPalmTrumk: 231,
        PalmTree: 232,
        Water: 233,
        Lava: 234,
        Invisible: 254,
        None: 255
    };

    const SolidTiles = [Tile.CobbleStone,Tile.Breakable1,Tile.Breakable2,Tile.Breakable3,Tile.BouncyNote,Tile.GreyBlock,Tile.CollapsibleBlock,Tile.CollapsibleBlockActive,Tile.Spike,Tile.WoodSpike,Tile.QuestionMark,Tile.UsedQuestionMark,Tile.Wood1,Tile.Metal1,Tile.WoodPike,Tile.SpikeDown,Tile.Wood2,Tile.Metal2];
    
    function getId(c, u, l, r, ul, ur, x, y, parseWall, pipeColor, liquidType){
     if (c == "░"){
        return parseWall(c, u, l, r, ul, ur, x, y);     //0-7 is solid terrain
     }
     
     if (c == "▒"){
        return parseWall(c, u, l, r, ul, ur, x, y) + 8; //8-15 is walkthrough terrain
     }

     //Tree
     if (c == "╦") return Tile.PalmTree;
     //Weed
     if (c == "w") {
        if (u == '║')
            return Tile.WeedAndPalmTrumk;
        return Tile.Weed;
     }

     //Water/Lava
     if (c == "▓") return 233+liquidType; //233-234
     
     //Pipe
     let pipeOffset =(pipeColor % 3)*2+Math.floor(pipeColor / 3)*12;
     if (c == "╒") return Tile.PipeFirst+0+pipeOffset;
     if (c == "╕") return Tile.PipeFirst+1+pipeOffset;
     if (c == "│") return Tile.PipeFirst+6+pipeOffset;
     if (c == "┇") return Tile.PipeFirst+7+pipeOffset;

     //Block
     if (c == "₪") return Tile.Wood2;
     if (c == "¤") return Tile.CobbleStone;
     if (c == "E") {
        if (u != "E") return Tile.ExitSign;
        return Tile.ExitPole;
     }
     if (c == "◙") return Tile.QuestionMark;
     if (c == "■") return Tile.Breakable1;
     if (c == "▲") return Tile.Spike;
     if (c == "║") return Tile.PalmTrunk;
     if (c == "♪") return Tile.BouncyNote;
     if (c == "□") return Tile.Invisible;
     

     //Enemies
     if (c == "₾") return Tile.Goomba;
     if (c == "∩") return Tile.Koopa;
     if (c == "₼") return Tile.RedKoopa;
     if (c == "a") return Tile.Fish;
     if (c == "ψ") return Tile.Piranha;
     
     //Collectables
     if (c == "○") return Tile.Coin;
     if (c == "♠") return Tile.Mushroom;
     if (c == "♣") return Tile.PoisonousMushroom;
     if (c == "♥") return Tile.Life;
     if (c == "☼") return Tile.Star;    
     if (c == "●") return Tile.TenCoinsLeft;
     //◌
     return Tile.None;
    }
    
    function getTile(g, y,x){
        if (y >= 0 && x >=0 && y < g.length && x < g[y].length)
            return g[y][x];
        return Tile.None;
    }
    
    function parseLevel(levelData){
        let level = new Array(levelData.grid[0].length);
        let parser = parseTerrainWall;
        if (levelData.terrainType >= 5)
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
               levelData.pipeColor,
               levelData.liquidType
               );
           }
       }
       return {grid: level, terrainType: levelData.terrainType, sky: levelData.sky, backgroundType: levelData.backgroundType, pipes: levelData.pipes, startPosition: levelData.startPosition};
    }